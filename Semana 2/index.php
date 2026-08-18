<!DOCTYPE html>
<html lang="es">
    <head>
        <title>Bienvenidos</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>  
        <style>.menu-{background-color: #8DCEB2;
                     color:white !important;    
                     padding:8px 15px;  
                     border-radius:8px;     
                     margin-right:15px;     
                     font-weight:bold;}
        </style>  
        <style>.segundoverde-{
            background-color: #ADDCC7;
            color:white !important;
            padding:8px 15px;
            border-radius:8px;
            margin-right:15px;
            font-weight:bold;}
        </style>
        <style>.mi-container{
            border:5px solid #bc99eb;
            border-radius:0px;
            background-color: #DFDFF5;}  
        </style>
        <style>.mi-container2{
            margin:0px;
            border:5px solid #E2DFF5;
            border-radius:0px;
            background-color: #BEE8EB;}  
        </style>
        <style>.titulo{
        margin-bottom:0px;
        font-size:30px;
        color:white;
        font-weight:bold;
        text-shadow:2px 2px 4px #34096C;}
        </style>
        <style>.link-menu{
        color:#34096C;}
        </style>
       <style> body{
    margin:0;
    padding:0;
    background-color:#34096C;
}
</style>


    </head>
    <body>
        <!-- Navbar lo que ve el usuario -->
        <nav class="navbar navbar-expand-sm navbar-dark"
        style="background-color: #34096C;">
            <div class="container-fluid">
                <a class="navbar-brand" href="index.php"><img src="img/gato.jpg" alt="Avatar Logo" style="width:40px;" class="rounded-pill"> 
                </a>
                <!-- responsivo celular lo achica y hamburguesa -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
                </button>        
                <div class="collapse navbar-collapse" id="collapsibleNavbar">        
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <!-- boton empresa -->
                            <a class="nav-link dropdown-toggle menu-" href="#" role="button" data-bs-toggle="dropdown" >Empresa</a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="empresa.php">Quienes Somos</a></li>
                                <li><a class="dropdown-item" href="#">Nuestro Equipo</a></li>
                                <li><a class="dropdown-item" href="#">Mision</a></li>
                            </ul>  
                        </li>
                        <!-- botones navbar -->              
                        <li class="nav-item">
                            <a class="nav-link segundoverde-" href="productos.php">Productos</a>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link segundoverde-" href="servicios.php">Servicios</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link segundoverde-" href="contacto.php">Contacto</a>
                        </li>
                    </ul>  
                </div> 
                <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#myModal">Acceder</button>             
            </div>         
        </nav>
        <!-- Container -->
        <div class="container-fluid mi-container "><h1 class="titulo">Bienvenidos</h1>
            <a href="index.php" class="link-menu">Ir a Principal</a><br>
            <a href="empresa.php" class="link-menu">Ir a Empresa</a><br>
            <a href="productos.php" class="link-menu">Ir a Productos</a><br>
            <a href="servicios.php" class="link-menu">Ir a Servicios</a><br>
            <a href="contacto.php" class="link-menu">Ir a Contacto</a><br>
        </div>
        <div class="container-fluid mi-container2">
            <div class="row">
                <div class="col-md-4">
                    <h3 class="titulo" > Historia</h3>
                    <p>A medianoche, en el mes de junio,
                    permanezco de pie bajo la mística luna.
                    Un vapor de opio, como de rocío, tenue,
                    se desprende de su dorado halo,
                    y, lentamente manando, gota a gota,
                    sobre la cima de la tranquila montaña,
                    se desliza soñolienta y musicalmente
                    hasta el universal valle.
                    </p>
                </div>
                <div class="col-md-4 text-center">
                <img class="img-fluid mx-auto d-block" src="img/fuegos.jpg">
                </div>
                <div class="col-md-4">
                <h3 class="titulo">Misión</h3>
                <p>El romero cabecea sobre la tumba;
                    la lila se inclina sobre la ola;
                    abrazando la niebla en su pecho
                    las ruinas se van a dormir.
                    Parecido a Leteo, ¡mira!, el lago
                    parece que se entrega a un sueño consciente
                    y no despertaría por nada del mundo.
                    ¡Toda la belleza duerme! Y ¡mira dónde reposa
                    Irene, con sus destinos!
                </p>
                </div>
            </div>
        </div>
        <!-- Footer -->
        <div class="container-fluid bg-dark">
            <div class="row">
                <div class="col-md-4"></div>
                <div class="col-md-4" style="color:white"><strong>MiEmpresa@2026</strong></div>
                <div class="col-md-4"></div>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="myModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">Autenticación</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <!-- Modal body -->
                    <div class="modal-body">
                        <form action="empresa.php">
                            <div class="mb-3 mt-3">
                                <label for="email" class="form-label">Email:</label>
                                <input type="email" class="form-control" id="email" placeholder="Enter email" name="email">
                            </div>
                            <div class="mb-3">
                                <label for="pwd" class="form-label">Password:</label>
                                <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd">
                            </div>
                            <div class="form-check mb-3">
                                <label class="form-check-label">
                                    <input class="form-check-input" type="checkbox" name="remember"> Remember me
                                </label>
                            </div>
                            <button type="submit" class="btn segundoverde-">Login</button>
                        </form>
                    </div>
                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn segundoverde-" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>         
    </body>
</html>