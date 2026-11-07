import os
import secrets
from fastapi import Depends, FastAPI, Header, HTTPException

app = FastAPI(
    title="Backend API Galletas",
    description="API ubicada en localhost enrutada por API gateway",
)

BACKEND_SHARED_SECRET = os.getenv("BACKEND_SHARED_SECRET", "gateway-api-secret-456")

def verify_gateway(x_gateway_secret: str = Header(default="")):
    if not secrets.compare_digest(x_gateway_secret, BACKEND_SHARED_SECRET):
        raise HTTPException(
            status_code=403,
            detail="Acceso denegado: Gateway no autorizado"
        )


@app.get("/health")
def health():
    return {
        "status": "OK",
        "service": "Backend API Galletas"
    }


@app.get(
        "/products",
        dependencies=[Depends(verify_gateway)]
        )
def products(
    x_authenticated_client: str | None = Header(
        default=None
    ),
    x_authenticated_user: str | None = Header(
            default=None
    ),
    x_authenticated_roles: str | None = Header(
            default=None
    ),
):
    return {

        "identity": {
            "client_id": x_authenticated_client,
            "username": x_authenticated_user,
            "roles": x_authenticated_roles
        },

        "products": [
            {"id": 1, "name": "Alfajores de Maicena", "price": 1200.0, "category": "galletas"},
            {"id": 2, "name": "Galletas de Avena", "price": 1500.0, "category": "galletas"},
            {"id": 3, "name": "Brownie Artesanal", "price": 2000.0, "category": "galletas"}
        ]
    }


@app.get(
        "/orders",
        dependencies=[Depends(verify_gateway)]
        )
def orders(
    x_authenticated_client: str | None = Header(
        default=None
    ),
    x_authenticated_user: str | None = Header(
            default=None
    ),
    x_authenticated_roles: str | None = Header(
            default=None
    ),
):
    return {
        
            "identity": {
                "client_id": x_authenticated_client,
                "username": x_authenticated_user,
                "roles": x_authenticated_roles
            },
    
            "orders": [
                {"id": 1, "status": "paid"},
                {"id": 2, "status": "pending"}
            ]
        }

@app.get("/stats")
def stats():
    return {
        "service": "galletas",
        "total_products": 3,
        "total_orders": 2,
        "paid_orders": 1,
        "pending_orders": 1
    }


@app.get("/info")
def info():
    return {
        "service": "Backend API Galletas",
        "category": "Galletas"
    }