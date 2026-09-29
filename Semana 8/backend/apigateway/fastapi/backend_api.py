from fastapi import FastAPI

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

@app.get("/products")
def products():
    return {
        "products": [
            {"id": 1, "name": "Pastel", "price": 50.0, "category": "pasteles"},
            {"id": 2, "name": "Torta", "price": 50.0, "category": "pasteles"},
            {"id": 3, "name": "Panqueque", "price": 40.0, "category": "pasteles"}
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