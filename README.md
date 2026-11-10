Version 7.1.0

Actualmente el proyecto cuenta con un **Frontend** responsivo que simula las funciones de una página web para una empresa de pastelería, además de carpetas de práctica entre semanas basadas en los temas vistos en clases.

El Frontend actual incluye la capacidad de simular la modificación de cantidades en un carrito de compras, búsqueda de productos, inicio de sesión, gestión de detalles en la cuenta del usuario, y cuenta con una presentación visual ya finalizada.

Arquitectura de Backend Incorporada:

A nivel de servidor, el sistema ya cuenta con un **Backend funcional basado en microservicios independientes** (desarrollados con Node.js, Express y MongoDB), estructurados de la siguiente manera:
API Gateway (Puerto 8090): Punto de entrada único que centraliza el enrutamiento y aplica políticas de seguridad *Service-to-Service* inyectando un secreto corporativo (`x-gateway-secret`).
Clients Service (Puerto 8001): Gestiona el registro, autenticación y perfiles de usuarios.
Inventory Service (Puerto 8002): Administra el catálogo de productos y existencias de la pastelería.
Orders Service (Puerto 8003): Gestiona el ciclo de vida de los pedidos y transacciones.
Nota de integración: El backend es completamente funcional y operativo de forma independiente (verificado mediante pruebas de integración y persistencia en base de datos), encontrándose en fase de preparación para su conexión directa con las vistas del Frontend.

Cuenta con una página principal donde puedes dirigirte a las distintas áreas con un carrusel de imágenes y un botón que te lleva a productos. La sección de productos cuenta con los distintos tipos y una barra de búsqueda; al presionar cada producto puedes ver sus detalles. También incluye inicio de sesión para clientes frecuentes, un carrito que calcula el total de las tortas y visualiza métodos de pago y direcciones, y una sección con la descripción de la empresa.

Francisca Veliz
Ignacio Figueroa
Usuario "BerryMaddy" también es Ignacio Figueroa, un tema que no he podido arreglar en Visual Studio Code me registra como 2 usuarios.