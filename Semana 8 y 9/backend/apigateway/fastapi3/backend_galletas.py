from fastapi import Depends, FastAPI, Header

app = FastAPI(
    title="Backend API Refrescos",
    description="API ubicada en localhost enrutada por API gateway",
)


@app.get("/health")
def health():
    return {
        "status": "OK",
        "service": "Backend API Refrescos"
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
            {"id": 1, "name": "Coca Cola", "price": 20.0, "category": "refrescos"},
            {"id": 2, "name": "Sprite", "price": 18.0, "category": "refrescos"},
            {"id": 3, "name": "Fanta", "price": 18.0, "category": "refrescos"}
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
        "service": "refrescos",
        "total_products": 3,
        "total_orders": 2,
        "paid_orders": 1,
        "pending_orders": 1
    }


@app.get("/info")
def info():
    return {
        "service": "Backend API Refrescos",
        "category": "Bebidas"
    }