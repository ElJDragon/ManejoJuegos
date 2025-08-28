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
    <nav class="navbar navbar-expand-lg bg-success navbar-light shadow">
        <div class="container d-flex justify-content-between align-items-center">

            <a class="navbar-brand text-white logo h1 align-self-center" href="../index.html">
                Zay
            </a>

            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#templatemo_main_nav" aria-controls="templatemo_main_nav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

        <div class="container d-flex justify-content-start">
            <a href="../index.html" class="btn btn-link text-dark">
                <i class="fa fa-arrow-left fa-2x"></i>
            </a>
        </div>
        </div>
    </nav>

    <!-- Close Header -->

    <section class="d-flex justify-content-center align-items-center" style="min-height:80vh;">
    <canvas id="gc" width="400" height="400"></canvas>
    </section>
    
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