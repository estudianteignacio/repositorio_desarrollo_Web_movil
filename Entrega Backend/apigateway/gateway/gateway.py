import os
import secrets
import httpx
import logging

logging.basicConfig(level=logging.INFO)

from fastapi import (
    FastAPI,
    Header,
    HTTPException,
    Depends,
    Request,
    Response
)

from fastapi.security import(
    HTTPBearer,
    HTTPAuthorizationCredentials
)

app = FastAPI(
    title="API Gateway Pasteleria",
)

security = HTTPBearer(
    auto_error=False
)

AUTH_SERVICE_URL = os.getenv(
    "AUTH_SERVICE_URL",
    "http://127.0.0.1:8001"
)

VAULT_ADDR = os.getenv(
    "VAULT_ADDR", "http://localhost:8200"
)

VAULT_TOKEN = os.getenv(
    "VAULT_TOKEN"
)

if not VAULT_TOKEN:
    raise RuntimeError(
        "VAULT_TOKEN no esta configurado"
    )

async def get_gateway_secrets():
    url = (
        f"{VAULT_ADDR}"
        "/v1/secret/data/gateway"
    )

    headers = {
        "X-Vault-Token": VAULT_TOKEN
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
    return vault_response["data"]["data"]


async def autenticate_client(
        credentials: HTTPAuthorizationCredentials = Depends(security),
):
    if credentials is None:
        raise HTTPException(
            status_code=401,
            detail="No se proporciono un token de autorizacion, Bearer token requerido"
        )

    gateway_secrets = (
        await get_gateway_secrets()
    )

    introspection_secret = (
        gateway_secrets["auth_introspection_secret"]
    )
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            response = await client.post(
                f"{AUTH_SERVICE_URL}/introspect",
                json={"token": credentials.credentials},
                headers={
                    "X-Gateway-Auth-Secret": introspection_secret
                }
            )

    except httpx.RequestError:
        raise HTTPException(
            status_code=503,
            detail="Servicio de autenticacion no disponible"
        )

    if response.status_code != 200:
        raise HTTPException(
            status_code=502,
            detail="Error consultando Authentication Service"
        )

    identity = response.json()

    if not identity.get(
        "active",
        False
    ):
        raise HTTPException(
            status_code=401,
            detail="Token invalido o expirado"
        )
    return {
        "user_id" : identity["user_id"],
        "username" : identity["username"],
        "roles" : identity["roles"],
        "backend_secret" : gateway_secrets["backend_shared_secret"]
    }
        

BACKEND_URL = "http://localhost:9000"
BACKEND_URL2 = "http://localhost:9100"
BACKEND_URL3 = "http://localhost:9200"


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
        auth["backend_secret"],

        "X-Authenticated-Client":
        "pasteleria-app",
        "X-Authenticated-User":
        auth["username"],
        "X-Authenticated-Roles":
        ",".join(auth["roles"])
    }

    content_type = request.headers.get("content-type")

    if content_type:
        gateway_headers["Content-Type"] = content_type

    try:
        async with httpx.AsyncClient(timeout = 10.0) as client:
            upstream = await client.request(
                method = request.method,
                url = target_url,
                params=request.query_params,
                content=body,
                headers=gateway_headers
            )

    except httpx.RequestError:
        raise HTTPException(status_code=502, detail="Backend no disponible, womp womp")

    response_headers = {}

    if "content-type" in upstream.headers:
        response_headers["content-type"] = upstream.headers["content-type"]

    return Response(
        content=upstream.content,
        status_code=upstream.status_code,
        headers=response_headers
    )


@app.api_route(
    "/api/pasteles/{path:path}",
    methods=["GET","POST","PUT","PATCH","DELETE"]
)
async def pasteles(
    path: str,
    request: Request,
    auth=Depends(autenticate_client)
):
    logging.info(
        f"Usuario {auth['username']} accediendo a pasteles/{path}"
    )

    return await enviar_backend(
        BACKEND_URL,
        path,
        request,
        auth
    )


@app.api_route(
    "/api/refrescos/{path:path}",
    methods=["GET","POST","PUT","PATCH","DELETE"]
)
async def refrescos(
    path: str,
    request: Request,
    auth=Depends(autenticate_client)
):
    logging.info(
        f"Usuario {auth['username']} accediendo a refrescos/{path}"
    )

    return await enviar_backend(
        BACKEND_URL2,
        path,
        request,
        auth
    )


@app.api_route(
    "/api/galletas/{path:path}",
    methods=["GET","POST","PUT","PATCH","DELETE"]
)
async def galletas(
    path: str,
    request: Request,
    auth=Depends(autenticate_client)
):
    logging.info(
        f"Usuario {auth['username']} accediendo a galletas/{path}"
    )

    return await enviar_backend(
        BACKEND_URL3,
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
                f"{BACKEND_URL}/products",
                headers={"X-Gateway-Secret": auth["backend_secret"]}
            )
            refrescos = await client.get(
                f"{BACKEND_URL2}/products",
                headers={"X-Gateway-Secret": auth["backend_secret"]}
            )
            galletas = await client.get(
                f"{BACKEND_URL3}/products",
                headers={"X-Gateway-Secret": auth["backend_secret"]}
            )

    except httpx.RequestError:
        raise HTTPException(
            status_code=502,
            detail="Backends no disponibles"
        )

    p_data = pasteles.json().get("products", [])
    r_data = refrescos.json().get("products", [])
    g_data = galletas.json().get("products", [])

    return {
        "products": p_data + r_data + g_data,
        "total_products": len(p_data) + len(r_data) + len(g_data)
    }