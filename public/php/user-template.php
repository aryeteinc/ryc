<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <style>
      body{
        font-family: Arial, sans-serif;
        line-height: 1.6;
        margin: 0;
        background-color: #f4f4f4;
        padding: 0;
      }

      .container{
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        /* border-radius: 8px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1); */
      }

      .header{
        background-color: #007bff;
        color: #fff;
        text-align: center;
        padding: 20px;
      }

      .content{
        padding: 20px;
      }

      .footer{
        font-size: 12px;
        color: #666666;
        text-align: center;
        padding: 20px;
      }

      .button{
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
        margin: 20px 0;
      }
    </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1> Bienvenido!</h1>      
    </div>

    <div class="content">
      <h2>Hola <?php echo htmlspecialchars($data['nombre']) ?></h2>
      <p>
        Hemos recibido tu mensaje correctamente. Nuestro equipo revisará tu consulta y te responderemos lo antes posible.
      </p>

      <p>
        mientras tanto, puedes visitar nuestra página web para obtener más información sobre nuestros servicios.
      </p>

      <p>
        Quee tengas un excelente día!
      </p>      
    </div>

    <div class="footer">
      <p><?php echo date('Y') ?>Rodriguez y Carvajal SAS. todos los derechos reservados.</p>
      <p>Este es un email automático, por favor no respondas a este mensaje.</p>
    </div>

  </div>
</body>
</html>