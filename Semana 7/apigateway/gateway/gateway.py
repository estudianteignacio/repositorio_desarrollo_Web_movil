from fastapi import FastAPI
import httpx

app = FastAPI(
    title="Local API Gateway",
)

BACKEND_URL = "http://localhost:9000"
BACKEND_URL2 = "http://localhost:9100"

#http://localhost:8000/api/pasteles
@app.get("/api/pasteles")
async def products():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{BACKEND_URL}/products"
        )
    return response.json()


#http://localhost:8000/api/refrescos
@app.get("/api/refrescos")
async def beverages():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{BACKEND_URL2}/products"
        )
    return response.json()


#http://localhost:8000/api/refrescos
@app.get("/api/orders")
async def orders():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{BACKEND_URL}/orders"
        )
    return response.json()


@app.get("/api/ordersrefrescos")
async def orders_refrescos():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{BACKEND_URL2}/orders"
        )
    return response.json()


@app.get("/health")
async def health():

    resultado = {}

    async with httpx.AsyncClient() as client:

        try:
            await client.get(f"{BACKEND_URL}/health")
            resultado["pasteles"] = "OK"
        except:
            resultado["pasteles"] = "DOWN"

        try:
            await client.get(f"{BACKEND_URL2}/health")
            resultado["refrescos"] = "OK"
        except:
            resultado["refrescos"] = "DOWN"

    return resultado


@app.get("/api/catalogo")
async def catalogo():

    async with httpx.AsyncClient() as client:

        pasteles = await client.get(
            f"{BACKEND_URL}/products"
        )

        refrescos = await client.get(
            f"{BACKEND_URL2}/products"
        )

    return {
        "pasteles": pasteles.json()["products"],
        "refrescos": refrescos.json()["products"]
    }