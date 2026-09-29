import os
import secrets
import httpx
import logging

logging.basicConfig(level=logging.INFO)

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
    title="API Gateway Pasteleria",
)


security = HTTPBearer(
    auto_error=False
)

VAULT_ADDR = os.getenv( # Esta seguro con una politica SELINUX
    "VAULT_ADDR", "http://localhost:8200"
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
        f"{VAULT_ADDR}" #HTTP://localhost:8200"
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

    valid = secrets.compare_digest(
        recieved_token,
        expected_token
    )

    if not valid:
        raise HTTPException(
            status_code=401,
            detail="Token de autorizacion invalido"
        )

    return{
        "client_id": "pasteleria-app", #aqui se colocan los servicios de autentificacion e identificacion del usuario
        "backend_secret": vault_secrets["backend_shared_secret"]
    }


BACKEND_URL = "http://localhost:9000"
BACKEND_URL2 = "http://localhost:9100"


@app.get("/gateway-health")
def gateway_health():
    return {
        "status": "OK",
        "service": "Gateway Pasteleria"
    }


async def enviar_backend(
        backend_url,
        path,
        request,
        auth
):

    target_url = f"{backend_url}/{path}"

    body = await request.body()

    gateway_headers = {
        "X-Gateway-Secret":
        auth["backend_secret"], #gateway-api-secret-456

        "X-Authenticated-client":
        auth["client_id"], #student-client es reemplazado por un Autenticador
    }

    content_type = request.headers.get("content-type")

    if content_type:
        gateway_headers["Content-Type"] = content_type

    try:
        async with httpx.AsyncClient(timeout = 10.0) as client:
            upstream = await client.request(
                method = request.method, # GET, PUT, POST, PATCH, DELETE
                url = target_url,
                params=request.query_params, #http://localhost:9000/products?var=3&var2=6"
                content=body,
                headers=gateway_headers
            )

    except httpx.RequestError:
        #error de series 500, ya que fue el backend que se cayo
        raise HTTPException(status_code=502,detail="Backend no disponible, womp womp")

    response_headers = {}

    if "content-type" in upstream.headers:
        response_headers["content-type"] = upstream.headers["content-type"]

    return Response(
        content=upstream.content,
        status_code=upstream.status_code,
        headers=response_headers
    )


@app.api_route(
    "/api/pasteles/{path:path}", #product health orders
    methods=["GET","POST","PUT","PATCH","DELETE"]
)
async def pasteles(
    path: str,
    request: Request,
    auth=Depends(autenticate_client)
):

    logging.info(
        f"Cliente {auth['client_id']} accediendo a pasteles/{path}"
    )

    return await enviar_backend(
        BACKEND_URL,
        path,
        request,
        auth
    )


@app.api_route(
    "/api/refrescos/{path:path}", #product health orders
    methods=["GET","POST","PUT","PATCH","DELETE"]
)
async def refrescos(
    path: str,
    request: Request,
    auth=Depends(autenticate_client)
):

    logging.info(
        f"Cliente {auth['client_id']} accediendo a refrescos/{path}"
    )

    return await enviar_backend(
        BACKEND_URL2,
        path,
        request,
        auth
    )


@app.get("/api/catalog")
async def catalog(
    auth=Depends(autenticate_client)
):

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:

            pasteles = await client.get(
                f"{BACKEND_URL}/products"
            )

            refrescos = await client.get(
                f"{BACKEND_URL2}/products"
            )

    except httpx.RequestError:
        raise HTTPException(
            status_code=502,
            detail="Backend no disponible"
        )

    if pasteles.status_code != 200:
        raise HTTPException(
            status_code=502,
            detail="No fue posible obtener los productos de pasteles"
        )

    if refrescos.status_code != 200:
        raise HTTPException(
            status_code=502,
            detail="No fue posible obtener los productos de refrescos"
        )

    pasteles_data = pasteles.json()["products"]
    refrescos_data = refrescos.json()["products"]

    return {
        "products": pasteles_data + refrescos_data,
        "total_products": len(pasteles_data) + len(refrescos_data)
    }


@app.get("/api/stats")
async def stats(
    auth=Depends(autenticate_client)
):

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:

            pasteles = await client.get(
                f"{BACKEND_URL}/stats"
            )

            refrescos = await client.get(
                f"{BACKEND_URL2}/stats"
            )

    except httpx.RequestError:
        raise HTTPException(
            status_code=502,
            detail="Backend no disponible"
        )

    if pasteles.status_code != 200:
        raise HTTPException(
            status_code=502,
            detail="No fue posible obtener las estadisticas de pasteles"
        )

    if refrescos.status_code != 200:
        raise HTTPException(
            status_code=502,
            detail="No fue posible obtener las estadisticas de refrescos"
        )

    pasteles_data = pasteles.json()
    refrescos_data = refrescos.json()

    return {
        "total_products":
            pasteles_data["total_products"] +
            refrescos_data["total_products"],

        "total_orders":
            pasteles_data["total_orders"] +
            refrescos_data["total_orders"],

        "paid_orders":
            pasteles_data["paid_orders"] +
            refrescos_data["paid_orders"],

        "pending_orders":
            pasteles_data["pending_orders"] +
            refrescos_data["pending_orders"],

        "pasteles": pasteles_data,
        "refrescos": refrescos_data
    }


@app.get("/api/promotions")
async def promotions(
    auth=Depends(autenticate_client)
):

    return {
        "promotions": [
            {
                "id": 1,
                "name": "Combo Dulce",
                "description": "Pastel + Coca Cola",
                "discount": 10
            },
            {
                "id": 2,
                "name": "Combo Refrescante",
                "description": "Torta + Sprite",
                "discount": 10
            },
            {
                "id": 3,
                "name": "Promo Familiar",
                "description": "Panqueque + Fanta",
                "discount": 15
            }
        ]
    }


@app.get("/api/info")
async def info(
    auth=Depends(autenticate_client)
):

    return {
        "service": "API Gateway Pasteleria",
        "microservices": [
            "Backend API Pasteles",
            "Backend API Refrescos"
        ],
        "functions": [
            "Enrutamiento",
            "Catalogo unificado",
            "Estadisticas",
            "Promociones"
        ]
    }

# con todo este codigo, ahora ya esta enrutando