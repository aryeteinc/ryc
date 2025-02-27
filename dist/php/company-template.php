<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo mensaje de contacto</title>
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
        background-color: #28a745;
        color: #fff;
        text-align: center;
        padding: 20px;
      }

      .content{
        padding: 20px;
      }

      .details{
        background-color: #f8f9fa;
        padding: 15px;
        margin: 20px 0;
        border-radius: 5px;
      }

      .details-row{
        margin-bottom: 10px;
      }

      .label{
        font-weight: bold;
        color: #495057;
      }

      
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Nuevo mensaje de Contacto</h1>
      </div>

      <div class="content">
        <h2>Detalles del contacto:</h2>

        <div class="details">
          <div class="details-row">
            <span class="label">Nombre:</span>
            <span><?php echo htmlspecialchars($data['nombre']); ?></span>
          </div>

          <div class="details-row">
            <span class="label">Email:</span>
            <span><?php echo htmlspecialchars($data['email']); ?></span>
          </div>

          <?php if(isset($data['telefono'])): ?>
            <div class="details-row">
              <span class="label">Teléfono:</span>
              <span><?php echo htmlspecialchars($data['telefono']); ?></span>
            </div> 
          <?php endif; ?>

          <?php if(isset($data['mensaje'])): ?>          
            <div class="details-row">
              <span class="label">Mensaje:</span>
              <span><?php echo nl2br(htmlspecialchars($data['mensaje'])); ?></span>
            </div>  
          <?php endif; ?>

          <div class="details-row">
            <span class="label">Fecha de envío:</span>
            <span><?php echo date('d/m/Y H:i'); ?></span>
          </div>
        </div>
        <p>Este mensaje fue enviado desde el formulario de contacto del sitio Rodriguez y Carvajal</p>
      </div>
    </div>
  </body>
</html>