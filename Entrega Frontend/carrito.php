<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carrito de Compras - PASTELERÍA DULCE TENTACIÓN</title>
    <link rel="shortcut icon" href="img/faviconpasteleria.ico" type="image/x-icon" />
    <!-- Bootstrap 5.3 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Pacifico&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    
    <style>
        :root {
            --pink-1: #FBB8C5; 
            --pink-2: #F897AA; 
            --pink-3: #F57A92; 
            --pink-4: #F1607D; 
            --pink-5: #EC4868;
            --yellow-1: #FFE2BA; 
            --yellow-2: #FFD59B; 
            --yellow-3: #FFC97F; 
            --yellow-4: #FFBE66; 
            --yellow-5: #FEB44E;
            --purple-1: #D4B1ED; 
            --purple-2: #BD8DDE; 
            --purple-3: #A76DCE; 
            --purple-4: #9152BC; 
            --purple-5: #7D3BAA;
        }

        body { 
            font-family: 'Montserrat', sans-serif; 
            background-color: #FFF9FA; 
            color: #333333; 
        }

        .brand-title { 
            font-family: 'Pacifico', cursive; 
            color: var(--pink-5); 
            font-size: 1.8rem; 
            line-height: 1.1; 
        }

        .brand-subtitle { 
            font-size: 0.82rem; 
            color: var(--purple-5); 
            font-weight: 600; 
        }

        .header-border {   
            border-bottom: 3px solid var(--purple-1); 
        }

        .nav-btn { 
            background-color: var(--yellow-1); 
            color: var(--purple-5) !important;
            border: 2px solid var(--yellow-4);
            border-radius: 12px; 
            font-weight: 700; 
            padding: 6px 16px;
            transition: all 0.2s ease; 
        }
        <!-- turur -->
        .nav-btn:hover { 
            background-color: var(--yellow-3); 
            color: var(--purple-5); 
            transform: translateY(-2px); 
        }

        .top-icon-btn { 
            border: 2px solid var(--purple-3); 
            border-radius: 10px; 
            padding: 8px 12px; color: var(--purple-5); 
            background-color: #FFFFFF; 
            position: relative; text-decoration: none; 
            transition: background-color 0.2s; 
        }

        .top-icon-btn:hover { 
            background-color: var(--pink-1); 
            color: var(--purple-5); 
        }

        .badge-notification { position: absolute; 
            top: -6px; right: -6px; 
            background-color: var(--pink-5); 
            color: white; 
            border-radius: 50%; 
            padding: 2px 6px; 
            font-size: 0.7rem; 
            font-weight: bold; 
        }

        .page-title { 
            font-family: 'Pacifico', cursive;
            color: var(--purple-5); 
            font-size: 2.2rem; 
        }

        .cart-card,.summary-card {
            border: 3px solid var(--purple-2);
            border-radius: 16px;
            background-color: white;
            padding: 1.5rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            transition: .2s;
        }
        .cart-card:hover,.summary-card:hover{
            box-shadow: 0 8px 18px rgba(0,0,0,.12);
        }

        .cart-item { 
            border-bottom: 2px dashed var(--pink-2);
            padding-bottom: 1rem; margin-bottom: 1rem; 
        }

        .cart-item:last-child { 
            border-bottom: none; 
            margin-bottom: 0; 
            padding-bottom: 0; 
        }

        .cart-item-title { 
            font-weight: 700; 
            color: var(--purple-5); 
        }

        .btn-custom { 
            background-color: var(--pink-4); 
            color: white; font-weight: 700; 
            border-radius: 10px; 
            border: none; padding: 10px 20px; 
            transition: all 0.2s; 
        }

        .btn-custom:hover { 
            background-color: var(--pink-5); 
            color: white; 
        }

        footer { 
            background-color: var(--purple-5); 
            color: white; border-top: 5px solid var(--yellow-4); 
            margin-top: 3rem; padding: 2rem 0; 
        }

    </style>

</head>

<body>

    <header class="bg-white header-border sticky-top py-2">
        <div class="container-fluid px-4">
            <div class="row align-items-center gy-2">
                
                <!-- HEADER IZQUIERDA - LOGO -->
                <div class="col-lg-4 col-md-5 col-12">
                    <a class="text-decoration-none">
                        <h1 class="brand-title mb-0">Pastelería Dulce Tentación</h1>
                        <span class="brand-subtitle">TORTAS PERSONALIZADAS Y PASTELES</span>
                    </a>
                </div>
                
                <!-- HEADER DERECHA - BOTONES DE NAVEGACION -->
                <div class="col-lg-8 col-md-7 col-12">
                    <div class="d-flex flex-wrap align-items-center justify-content-md-end justify-content-between gap-2">
                        
                        <!-- Botones de Navegación arriba a la derecha-->
                        <a href="index.php" class="btn nav-btn">Inicio</a>
                        
                        <div class="dropdown">
                            <button class="btn nav-btn dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                Productos
                            </button>
                            <ul class="dropdown-menu border-2" style="border-color: var(--purple-2);">
                                <li><a class="dropdown-item fw-semibold" href="productos.php">Tortas Personalizadas</a></li>
                                <li><a class="dropdown-item fw-semibold" href="productos.php">Tortas Frías</a></li>
                                <li><a class="dropdown-item fw-semibold" href="productos.php">Cheesecakes</a></li>
                                <li><a class="dropdown-item fw-semibold" href="productos.php">Brownies & Mas</a></li>
                            </ul>
                        </div>

                        <a href="empresa.php" class="btn nav-btn">Nosotros</a>

                        <!-- ICONOS -->
                        <div class="d-flex align-items-center gap-2 ms-lg-2">
                            <a href="login.php" class="top-icon-btn" title="Perfil/Cuenta">
                                <i class="fas fa-user"></i>
                            </a>
                            <a class="top-icon-btn" title="Whatsapp / Chat" onclick="alert('¡Nuestro numero de WhatsApp es +56 9 1234 5678!');">
                                <i class="fab fa-whatsapp"></i>
                            </a>
                            <a href="carrito.php" class="top-icon-btn" title="Carrito">
                                <i class="fas fa-shopping-basket"></i>
                                <span class="badge-notification">1</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- CONTENIDO PRINCIPAL -->
    <main class="container my-4">
        <h2 class="page-title mb-4">
            Mi Carrito de Compras
        </h2>
        <form id="cart-form" onsubmit="procesarPago(event)">
            <div class="row g-4">
                <!-- Lista de Productos -->
                <div class="col-lg-7">
                    <div class="cart-card">
                        <h4 class="fw-bold mb-3" 
                            style="color: var(--purple-5);">
                            Productos Seleccionados
                        </h4>
                        <div class="cart-item d-flex align-items-center justify-content-between">
                            <div>
                                <h5 class="cart-item-title mb-1">Torta de Chocolate & Manjar</h5>
                                <p class="text-muted small mb-0">Para 15 personas</p>
                                <span class="fw-bold text-danger">$18.990</span>
                            </div>
                            <div class="d-flex align-items-center gap-2">
                                <input type="number" 
                                    class="form-control text-center cantidad-input" ]
                                    value="1" min="1" style="width: 70px;" 
                                    \onchange="calcularTotal()">
                                <button type="button" 
                                    class="btn btn-outline-danger btn-sm" 
                                    onclick="eliminarProducto(this)">
                                    <i class="fas fa-trash">
                                    </i>
                                </button>
                            </div>
                        </div>

                        <div class="cart-item d-flex align-items-center justify-content-between">
                            <div>
                                <h5 class="cart-item-title mb-1">Cheesecake de Frutos Rojos</h5>
                                <p class="text-muted small mb-0">Porción familiar</p>
                                <span class="fw-bold text-danger">$14.500</span>
                            </div>
                            <div class="d-flex align-items-center gap-2">
                                <input type="number" 
                                    class="form-control text-center cantidad-input" 
                                    value="1" min="1" 
                                    style="width: 70px;" 
                                    onchange="calcularTotal()">
                                <button type="button" 
                                    class="btn btn-outline-danger btn-sm" 
                                    onclick="eliminarProducto(this)">
                                    <i 
                                        class="fas fa-trash">
                                    </i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Método de Pago y Dirección -->
                <div class="col-lg-5">
                    <div class="summary-card">
                        <h4 class="fw-bold mb-3" 
                        style="color: var(--purple-5);"
                        >Método de Pago
                        </h4>
                        <div class="mb-3">
                            <select class="form-select border-2" 
                                id="metodo-pago" 
                                required style="border-color: var(--purple-2);">
                                <option 
                                    value="" selected disabled>
                                    Selecciona método de pago...
                                </option>
                                <option 
                                    value="tarjeta">
                                    Tarjeta de Débito / Crédito (Webpay)
                                </option>
                                <option 
                                    value="transferencia">
                                    Transferencia Bancaria
                                </option>
                                <option 
                                    value="efectivo">
                                    Efectivo al retirar
                                </option>
                            </select>
                        </div>

                        <h4 class="fw-bold mb-3 mt-4" style="color: var(--purple-5);">Dirección de Entrega</h4>
                        <div class="mb-3">
                            <input type="text" class="form-control border-2" id="direccion" placeholder="Ej: Av. Avenida #123, Depto 45" required style="border-color: var(--purple-2);">
                        </div>

                        <hr style="border-color: var(--purple-2);">
                        
                        <div class="d-flex justify-content-between fs-5 fw-bold mb-3">
                            <span>Total Estimado:</span>
                            <span id="total-precio" style="color: var(--pink-5);">$33.490</span>
                        </div>

                        <button type="submit" class="btn btn-custom w-100 fs-5">Pagar Ahora</button>
                    </div>
                </div>
            </div>
        </form>
    </main>

    <!-- FOOTER -->
    <footer>
        <div class="container">
            <div class="row gy-3 align-items-center">
                <div class="col-md-4 col-12 text-center text-md-start">
                    <span class="fw-bold">Copyright 2026</span>
                    <p class="small text-white-50 mb-0">Pastelería Dulce Tentación S.A.</p>
                </div>
                <div class="col-md-4 col-12 text-center">
                    <div><strong>Teléfono:</strong> +56 9 1234 5678</div>
                    <div><strong>Local:</strong> Av. Avenida #123</div>
                </div>
                <div class="col-md-4 col-12 text-center text-md-end">
                    <div class="d-inline-block text-start p-2 rounded" style="background-color: rgba(255,255,255,0.1); border: 1px solid var(--purple-2);">
                        <div class="small"><strong>Horario de Atención:</strong></div>
                        <div class="small">Lun - Sáb: 09:00 - 20:00 hrs</div>
                        <div class="small">Dom: 10:00 - 15:00 hrs</div>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <script>
        function calcularTotal(){
            let total = 0;
                document.querySelectorAll(".cart-item")
                .forEach(item => {
            let precio =
                item.querySelector(".text-danger")
                .innerText
                .replace("$","")
                .replace(".","");
            let cantidad =
                item.querySelector(".cantidad-input").value;
                total += parseInt(precio) * cantidad;
            });
            document.getElementById("total-precio")
                .innerText =
                "$" + total.toLocaleString("es-CL");
        }
        function procesarPago(event){
            event.preventDefault();
            let metodo =
                document.getElementById("metodo-pago").value;
            let direccion =
                document.getElementById("direccion")
                .value
                .trim();
            if(direccion === "" || metodo === ""){
                alert(
                "Debes completar la dirección y seleccionar un método de pago."
                );
            return;
            }
            alert(
                "Pedido registrado correctamente. Gracias por tu compra."
            );
            window.location.href = "index.php";
        }

        function eliminarProducto(btn){
            let respuesta =
            confirm("¿Eliminar este producto del carrito?");
            if(!respuesta){
                return;
            }
            const item =
                btn.closest(".cart-item");
                item.remove();
                calcularTotal();
                alert("Producto eliminado correctamente.");
        }
    </script>
</body>
</html>