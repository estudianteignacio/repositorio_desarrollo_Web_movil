from fastapi import FastAPI

app = FastAPI(
    title="Backend API Refrescos",
    description="API ubicada en localhost enrutada por API gateway",
)

@app.get("/health")
def health():
    return {
        "status": "OK",
        "service": "Backend Refrescos"
    }

@app.get("/products")
def products():
    return {
        "products": [
            {"id": 1, "name": "Coca Cola", "price": 20.0},
            {"id": 2, "name": "Sprite", "price": 18.0},
            {"id": 3, "name": "Fanta", "price": 18.0}
        ]
    }

@app.get("/orders")
def orders():
    return {
        "orders": [
            {"id": 1, "status": "paid"},
            {"id": 2, "status": "pending"}
        ]
    }