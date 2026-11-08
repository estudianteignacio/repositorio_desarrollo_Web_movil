from fastapi import FastAPI

app = FastAPI(
    title="Backend API Pasteles",
    description="API ubicada en localhost enrutada por API gateway",

    
)

@app.get("/health")
def health():
    return {
        "status": "OK",
        "service": "Backend API"
    }

@app.get("/products")
def products():
    return {
        "products": [
            {"id": 1, "name": "Pastel", "price": 50.0},
            {"id": 2, "name": "Torta", "price": 50.0},
            {"id": 3, "name": "Panqueque", "price": 40.0}
        ]
    }

@app.get("/orders")
def orders():
    return {
        "orders": [
            {"id": 1, "status": "paid"},
            {"id": 2, "status": "pending"},
            {"id": 3, "status": "paid"}
        ]
    }

@app.get("/stats")
def stats():
    return {
        "total_products": 3,
        "total_orders": 3,
        "paid_orders": 2
    }