from fastapi import Depends, FastAPI, Header

app = FastAPI(
    title="Backend API Pasteles",
    description="API ubicada en localhost enrutada por API gateway",
)

@app.get("/health")
def health():
    return {
        "status": "OK",
        "service": "Backend API Pasteles"
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
            {"id": 1, "name": "Pastel", "price": 50.0, "category": "pasteles"},
            {"id": 2, "name": "Torta", "price": 50.0, "category": "pasteles"},
            {"id": 3, "name": "Panqueque", "price": 40.0, "category": "pasteles"}
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
            {"id": 2, "status": "pending"},
            {"id": 3, "status": "paid"}
        ]
    }

@app.get("/stats")
def stats():
    return {
        "service": "pasteles",
        "total_products": 3,
        "total_orders": 3,
        "paid_orders": 2,
        "pending_orders": 1
    }

@app.get("/info")
def info():
    return {
        "service": "Backend API Pasteles",
        "category": "Pasteleria"
    }