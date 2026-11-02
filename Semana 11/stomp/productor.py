# Texto Libre
# python productor.py --formato texto --mensaje "Hola Mundo Stomp"
# Texto Ancho de fijo
# python productor.py --formato fijo --id 123 --cliente "Ernesto Vivanco" --monto 123.45
# XML
# python productor.py --formato xml --id 123 --cliente "Ernesto Vivanco"
# JSON
# python productor.py --formato json --id 123 --cliente "Ernesto Vivanco"

import stomp
import argparse
import json
from decimal import Decimal, InvalidOperation
import xml.etree.ElementTree as ET

DESTINO = "/queue/pedidos"

def construir_mensaje(formato: str, pedido: dict, texto: str) -> tuple[str, str]:
    if formato == "texto":
        return texto, "text/plain; charset=utf-8"

    if formato == "fijo":
        # Contrato Fixed 36 chars: ID[6], CLIENTE[20], MONTO[10]
        identificador = str(pedido["id"])
        cliente = str(pedido["cliente"])
        monto = Decimal(pedido["monto"])
        monto_campo = f"{monto:010.2f}" #entre 010 con 2 decimales

        if not (identificador.isascii() and identificador.isdigit() and len(identificador) <= 6):
            raise ValueError("En formato fijo, --id debe tener hasta 6 digitos ASCII")

        if len(cliente) > 20 or any(ord(c) > 127 for c in cliente):
            raise ValueError("En formato fijo, --cliente admite hasta 20 caracteres ASCII")

        if monto < 0 or len(monto_campo) != 10:
            raise ValueError("En formato fijo, --monto debe estar entre 0 y 99999999.99")

        return f"{identificador.zfill(6)}{cliente:<20}{monto_campo}", "text/plain; charset=utf-8"

    if formato == "json":
        return json.dumps(pedido, ensure_ascii=False), "application/json; charset=utf-8"

    if formato == "xml":
        raiz = ET.Element("pedido")
        for clave, valor in pedido.items():
            ET.SubElement(raiz, clave).text = str(valor)
        return ET.tostring(raiz, encoding="unicode"), "application/xml; charset=utf-8"

    raise ValueError(f"Formato desconocido: {formato}")

def main():
    parser = argparse.ArgumentParser(description="Productor STOMP")
    parser.add_argument("--formato", choices=["texto", "fijo", "xml", "json"], required=True)
    parser.add_argument("--mensaje", default="Hola desde el productor STOMP")
    parser.add_argument("--id", default="123")
    parser.add_argument("--cliente", default="Edward Norton")
    parser.add_argument("--producto", default="Torta Chocolate")
    parser.add_argument("--cantidad", default="1")
    parser.add_argument("--monto", default="123.45")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", default=61613)
    parser.add_argument("--usuario", default="demo")
    parser.add_argument("--clave", default="demo123")
    args = parser.parse_args()

    try:
        monto = Decimal(args.monto)
        if not monto.is_finite():
            raise ValueError("El monto debe ser numero finito")
    except InvalidOperation as exc:
        parser.error(f"Monto no valido: {args.monto}")
    if monto <= 0:
        parser.error("El monto debe ser mayor que 0")
    if not args.cliente.strip():
        parser.error("Debe ingresar el nombre del cliente")
    if not args.producto.strip():
        parser.error("Debe ingresar un producto")
    if not args.id.isdigit():
        parser.error("El ID del pedido debe ser numerico")
    try:
        cantidad = int(args.cantidad)
        if cantidad <= 0:
            parser.error("La cantidad debe ser mayor que 0")
    except ValueError:
        parser.error("La cantidad debe ser un numero entero")
    pedido = {"id": args.id, "cliente": args.cliente,"producto": args.producto,
    "cantidad": cantidad, "monto": str(monto)}

    try:
        cuerpo, mime = construir_mensaje(args.formato, pedido, args.mensaje)
    except ValueError as exc:
        parser.error(str(exc))

    # Enviar mensaje al broker STOMP
    try:
        conexion = stomp.Connection12([(args.host, args.port)], vhost="/")
        conexion.connect(args.usuario, args.clave, wait=True)
        conexion.send(
            destination=DESTINO,
            body=cuerpo,
            headers={
                "content-type": mime,
                "x-formato": args.formato,
                "persistent": "true",
            }
        )
        print("\n=== PEDIDO ENVIADO A LA PASTELERÍA ===")
        print(f"Destino: {DESTINO}")
        print(f"Formato: {args.formato}")
        print(f"Cliente: {args.cliente}")
        print(f"Producto: {args.producto}")
        print(f"Cantidad: {cantidad}")
        print(f"Total: ${monto}")
        print("======================================")
    finally:
        if conexion.is_connected():
            conexion.disconnect()


if __name__ == "__main__":
    main()