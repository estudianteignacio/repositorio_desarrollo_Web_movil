import os
import secrets
import httpx

#vault server - backend

from fastapi import (
    FastAPI,
    Header,
    HTTPException,
    Depends,
    Request,
    Response
)


from fastapi.security import(
    HTTPBearer, #forma de validar el token de autorizacion
    HTTPAuthorizationCredentials #forma de obtener el token de autorizacion
)

app = FastAPI(
    title="Local API Gateway",
)

security = HTTPBearer(
    auto_error=False
)

VAULT_ADRR = os.getenv( # Esta seguro con una politica SELINUX
    "VAULT_ADDR", "HTTP://localhost:8200"
)

VAULT_TOKEN = os.getenv(
    "VAULT_TOKEN" #dev-only-token"
)

if not VAULT_TOKEN:
    raise RuntimeError( #RUNTIMEERROR cierra el api gateway, HTTPException no cierra el api gateway
        "VAULT_TOKEN no esta configurado"
    )

async def get_gateway_secrets():
    url = (
        f"{VAULT_ADRR}" #HTTP://localhost:8200"
        "/v1/secret/data/gateway"
    )
    headers = {
        "X-Vault-Token": VAULT_TOKEN #dev-only-token"
    }

    async with httpx.AsyncClient(timeout=5.0) as client:
        response = await client.get(
            url=url,
            headers=headers
        )
    if response.status_code != 200:
        raise HTTPException(
            status_code=500,
            detail=f"No fue posible acceder a Vault: {response}"
        )
    vault_response = response.json()
    return vault_response["data"]["data"] #así se extrae la respuesta del administrador de sevretos"

async def autenticate_client( #para que cada vez que alguien llame al gateway, se valide que sea alguien que pueda entrar, que tenga el token/credencial
        credentials: HTTPAuthorizationCredentials = Depends(security), #la forma en la que busque la credencial es que se convierta en un bearertoken
        
):
    if credentials is None:
        raise HTTPException(
            status_code=401,
            detail="No se proporciono un token de autorizacion, Bearer token requerido"
        )
    vault_secrets = (
        await get_gateway_secrets() #obtendria client_token y backend_shared_secret
    )
    expected_token = vault_secrets.get("client_token")
    recieved_token = credentials.credentials
    valid = secrets.compare_digest(recieved_token, expected_token)
    if not valid:
        raise HTTPException(
            status_code=401,
            detail="Token de autorizacion invalido"
        )
    return{
        "client_id": "student-client", #aqui se colocan los servicios de autentificacion e identificacion del usuario
        "backend_secret": vault_secrets["backend_shared_secret"]
    }



BACKEND_URL = "http://localhost:9000"
BACKEND_URL2 = "http://localhost:9100"


@app.api_route(
    "/api/{path:path}", #product health orders
    methods=["GET","POST","PUT","PATCH","DELETE"]
)

async def proxy(
    path: str,
    request: Request,
    auth = Depends(autenticate_client)

):
    target_url = (
        f"{BACKEND_URL}/{path}" # Call http://localhost:8000/api/products -> http://localhost:9000/products
    )
    body = await request.body()
    gateway_headers = {
        "X-Gateway-Secret":
        auth["backend_secret"], #gateway-api-secret-456
        "X-Authenticated-client":
        auth["client-id"], #student-client es reemplazado por un Autenticador
    }
    content_type = request.headers.get("content-type")
    if content_type:
        gateway_headers["content_type"] = content_type

    try:
        async with httpx.AsyncClient(timeout = 10.0) as client:
            upstream = await client.request(
                method = request.method, # GET, POST, PUT, PATCH, DELETE
                url = target_url, #http://localhost:9000/products
                params=request.query_params, #http://localhost:9000/products?var=3&var2=6"
                content=body,
                headers=gateway_headers
            )
    except httpx.RequestError:
        #error de series 500, ya que fue el backend que se cayo
        raise HTTPException(status_code=502,detail="Backend no disponible, womp womp")

    response_headers = {}
    if "content_type" in upstream.headers:
        response_headers["content_type"] = upstream.headers["content_type"]
    return Response(
        content=upstream.content,
        status_code=upstream.status_code,
        headers=response_headers
    )
    # con todo este codigo, ahora ya esta enrutando
