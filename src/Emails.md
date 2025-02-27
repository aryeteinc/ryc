# Componente de Email para Astro + PHP

Este componente permite implementar un formulario de contacto en Astro que envía emails usando PHP y PHPMailer. El sistema envía dos emails:
1. Un email de confirmación al cliente
2. Una notificación a la empresa

## Estructura de Archivos

```
tu-proyecto/
├── src/
│   └── components/
│       └── EmailForm.astro         # Componente del formulario
└── public/
    └── php/
        ├── send-email.php          # Script de envío de emails
        ├── config.php              # Configuración SMTP
        └── vendor/                 # Dependencias de Composer (PHPMailer)
```

## Requisitos Previos

- PHP 7.4 o superior
- Composer (para instalar PHPMailer)
- Cuenta de email con acceso SMTP
- Servidor web con soporte PHP

## Instalación Local

1. **Instalar PHPMailer:**
   ```bash
   cd public/php
   composer require phpmailer/phpmailer
   ```

2. **Configurar credenciales SMTP:**
   Crear/editar `public/php/config.php`:
   ```php
   <?php
   return [
       'smtp_host' => 'mail.tudominio.com',
       'smtp_user' => 'tu@email.com',
       'smtp_pass' => 'tu_contraseña',
       'smtp_port' => 465,
       'smtp_secure' => 'ssl',
       'company_email' => 'empresa@tudominio.com'
   ];
   ```

3. **Importar el componente en tu página:**
   ```astro
   ---
   import EmailForm from '../components/EmailForm.astro';
   ---

   <div class="container">
     <EmailForm />
   </div>
   ```

## Desarrollo Local

1. **Iniciar servidor PHP:**
   ```bash
   cd public
   php -S localhost:8000
   ```

2. **Iniciar Astro:**
   ```bash
   npm run dev
   ```

## Despliegue en Hosting Compartido

1. **Preparar archivos:**
   - Ejecuta `npm run build`
   - Verifica que tienes los archivos PHP en `dist/php/`

2. **Subir archivos al hosting:**
   - Sube todo el contenido de la carpeta `dist` a tu hosting
   - La estructura en el hosting debería ser:
     ```
     public_html/             # o www/
     ├── php/
     │   ├── vendor/
     │   ├── send-email.php
     │   └── config.php
     └── ... (resto de archivos de Astro)
     ```

3. **Configurar PHPMailer:**
   - Accede al hosting vía SSH o FTP
   - Navega a la carpeta `php`
   - Ejecuta: `composer require phpmailer/phpmailer`
   - Si no tienes acceso a Composer en el hosting:
     1. Instala PHPMailer localmente
     2. Sube la carpeta `vendor` completa al hosting

4. **Permisos de archivos:**
   ```bash
   chmod 644 config.php send-email.php
   chmod 755 vendor/
   ```

5. **Configuración en el hosting:**
   - Actualiza `config.php` con las credenciales correctas
   - Verifica que el servidor tenga habilitadas las extensiones PHP necesarias:
     - php-mail
     - php-smtp
     - openssl

## Solución de Problemas

1. **Error "Could not authenticate":**
   - Verifica las credenciales SMTP
   - Confirma que el puerto es correcto (465 para SSL, 587 para TLS)
   - Asegúrate de usar la contraseña correcta

2. **Los emails no llegan:**
   - Revisa la carpeta de spam
   - Verifica los logs de PHP
   - Confirma que el servidor permite envío de emails

3. **Error de conexión SMTP:**
   - Verifica que el puerto no esté bloqueado
   - Confirma la configuración SSL/TLS
   - Revisa el firewall del servidor

## Personalización

1. **Modificar el diseño del formulario:**
   Edita `EmailForm.astro` y ajusta las clases CSS según necesites.

2. **Cambiar las plantillas de email:**
   En `send-email.php`, modifica las secciones `$mail->Body` para ambos emails.

3. **Añadir campos al formulario:**
   - Actualiza el formulario en `EmailForm.astro`
   - Modifica `send-email.php` para procesar los nuevos campos

## Seguridad

- Mantén `config.php` fuera del acceso público si es posible
- Usa siempre conexiones SMTP seguras (SSL/TLS)
- Valida y sanitiza todos los datos del formulario
- Mantén PHPMailer actualizado

## Notas Importantes

- Si usas Gmail, necesitas una "Contraseña de aplicación"
- Algunos hostings restringen el envío de emails
- Considera usar servicios de monitoreo de emails en producción
- Haz copias de seguridad antes de actualizar

## Soporte

Para problemas con:
- PHPMailer: [Documentación oficial](https://github.com/PHPMailer/PHPMailer)
- Astro: [Documentación de Astro](https://docs.astro.build)