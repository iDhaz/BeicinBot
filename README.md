<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css?family=Anton|Montserrat|Ramabhadra|Ubuntu&display=swap"
        rel="stylesheet">

    <style>
        * {
            margin: 0px;
            text-align: center !important;
            justify-content: space-between;
        }

        header {
            border-bottom: 1px rgb(83, 75, 75) solid;
            border-inline-end: 5px;
        }

        img {
            border-radius: 100%;
            width: 128px;
        }

        .container {
            background-image: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url("https://i1.sndcdn.com/artworks-000522047457-ci6uwg-t500x500.jpg");
            background-size: cover;
        }

        .logo {
            margin-top: 20px;
            -webkit-filter: drop-shadow(0px 0px 9.5px rgb(0, 0, 0));
            filter: drop-shadow(0px 0px 9.5px rgb(0, 0, 0));
        }

        .title {
            font-size: 30pt;
            font-family: 'Ramabhadra', sans-serif;
            text-transform: uppercase;
        }

        /* .title a {
            text-decoration: none;
            color: #000
        }
        .title a:hover {
            color: #7f7dff
        } */
        #criador h1 {
            margin-top: 15px;
            font-family: 'Ubuntu', sans-serif;
        }

        #criador p {
            font-family: 'Montserrat', sans-serif;
            padding: 10px;
        }

        .title-owner {
            font-size: 16pt;
        }
    </style>
</head>

<body>
    <div class="container">
        <header>
            <div id="head">
                <figure>
                    <img class="logo" src="https://i1.sndcdn.com/artworks-000522047457-ci6uwg-t500x500.jpg" alt="logo">
                    <figcaption>
                        <h1 class="title">
                            Beicin
                            <!--<a target="_blanck" href="https://discordapp.com/oauth2/authorize?client_id=578821153733476352&scope=bot&permissions=271903816">Beicin</a>-->
                        </h1>
                    </figcaption>
                </figure>
            </div>
        </header>
        <section class="corpo">
            <div id="criador">
                <h1>
                    Meu Criador
                </h1>
                <p>Meu nome é <b>Pablo Vinícius</b>, sou de Salvador - Bahia. Tenho <b>16</b> anos, atualmente estou
                    cursando 2° ano (Ensino Médio). <br> Possuo interesse em <b>desenvolvimento Web</b>, e programo
                    <i>Discord Bot's</i>.</p>
                <figure>
                    <img src="https://cdn.discordapp.com/avatars/408762620770779138/ac7829ea00fcaa095e7eb504ae6cf71c.png?size=2048"
                        alt="discord@me">
                    <figcaption>
                        <h1 class="title-owner">AvengerSuicide#7178</h1>
                    </figcaption>
                </figure>
            </div>
        </section>
    </div>
</body>

</html>