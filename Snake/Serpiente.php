<!DOCTYPE html>
<html lang="en">
<head>
    <title>Zay Shop eCommerce HTML CSS Template</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="apple-touch-icon" href="../assets/img/apple-icon.png">
    <link rel="shortcut icon" type="image/x-icon" href="../assets/img/favicon.ico">

    <link rel="stylesheet" href="../assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="../assets/css/templatemo.css">
    <link rel="stylesheet" href="../assets/css/custom.css">

    <!-- Load fonts style after rendering the layout styles -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400;500;700;900&display=swap">
    <link rel="stylesheet" href="../assets/css/fontawesome.min.css">
<!--
    
TemplateMo 559 Zay Shop

https://templatemo.com/tm-559-zay-shop

-->
</head>



<body>
    
    <!-- Header -->
    <nav class="navbar navbar-expand-lg navbar-light shadow">
        <div class="container d-flex justify-content-between align-items-center">

            <a class="navbar-brand text-success logo h1 align-self-center" href="index.html">
                Zay
            </a>

            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#templatemo_main_nav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between" id="templatemo_main_nav">
                <div class="flex-fill">
                    <ul class="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="../index.html">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="../about.html">About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="../shop.html">Shop</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="../contact.html">Contact</a>
                        </li>
                    </ul>
                </div>
                <div class="navbar align-self-center d-flex">
                    <div class="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3">
                        <div class="input-group">
                            <input type="text" class="form-control" id="inputMobileSearch" placeholder="Search ...">
                            <div class="input-group-text">
                                <i class="fa fa-fw fa-search"></i>
                            </div>
                        </div>
                    </div>
                    <a class="nav-icon d-none d-lg-inline" href="#" data-bs-toggle="modal" data-bs-target="#templatemo_search">
                        <i class="fa fa-fw fa-search text-dark mr-2"></i>
                    </a>
                    <a class="nav-icon position-relative text-decoration-none" href="#">
                        <i class="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i>
                        <span class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">7</span>
                    </a>
                    <a class="nav-icon position-relative text-decoration-none" href="#">
                        <i class="fa fa-fw fa-user text-dark mr-3"></i>
                        <span class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">+99</span>
                    </a>
                </div>
            </div>

        </div>
    </nav>
    <!-- Close Header -->

    
    <section>
        <canvas id="gc" width="400" height="400"></canvas>

<script>

window.onload=function() {

    canv=document.getElementById("gc");

    ctx=canv.getContext("2d");

    document.addEventListener("keydown",keyPush);

    setInterval(game,1000/15);

}

px=py=10;

gs=tc=20;

ax=ay=15;

xv=yv=0;

trail=[];

tail = 5;

function game() {

    px+=xv;

    py+=yv;

    if(px<0) {

        px= tc-1;

    }

    if(px>tc-1) {

        px= 0;

    }

    if(py<0) {

        py= tc-1;

    }

    if(py>tc-1) {

        py= 0;

    }

    ctx.fillStyle="black";

    ctx.fillRect(0,0,canv.width,canv.height);



    ctx.fillStyle="lime";

    for(var i=0;i<trail.length;i++) {

        ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);

        if(trail[i].x==px && trail[i].y==py) {

            tail = 5;

        }

    }

    trail.push({x:px,y:py});

    while(trail.length>tail) {

    trail.shift();

    }



    if(ax==px && ay==py) {

        tail++;

        ax=Math.floor(Math.random()*tc);

        ay=Math.floor(Math.random()*tc);

    }

    ctx.fillStyle="red";

    ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2);

}

function keyPush(evt) {

    switch(evt.keyCode) {

        case 37:

            xv=-1;yv=0;

            break;

        case 38:

            xv=0;yv=-1;

            break;

        case 39:

            xv=1;yv=0;

            break;

        case 40:

            xv=0;yv=1;

            break;

    }

}

</script>
    </section>
</body>
</html>