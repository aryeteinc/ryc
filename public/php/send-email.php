<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'vendor/autoload.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    $config = require 'config.php';
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!$data) {
        throw new Exception('Error al procesar los datos recibidos');
    }

    $mail = new PHPMailer(true);
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->Debugoutput = function($str, $level) {
        error_log("DEBUG: $str");
    };

    // Configuración SMTP
    $mail->isSMTP();
    $mail->Host = $config['smtp_host'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['smtp_user'];
    $mail->Password = $config['smtp_pass'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = $config['smtp_port'];
    $mail->CharSet = 'UTF-8';

    // Email al cliente
    $mail->setFrom($config['smtp_user'], 'Rodriguez y Carvajal');
    $mail->addAddress($data['email']);
    $mail->isHTML(true);
    $mail->Subject = 'Gracias por contactarnos';
    $mail->Body = '
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Gracias por contactarnos</title>
    </head>
    <body>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #333;">¡Gracias por contactarnos!</h1>
            <p>Hola ' . htmlspecialchars($data['nombre']) . ',</p>
            <p>Hemos recibido tu mensaje y te responderemos lo antes posible.</p>
            <p>Tu mensaje:</p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
                ' . nl2br(htmlspecialchars($data['mensaje'])) . '
            </div>
            <p style="margin-top: 20px;">Saludos cordiales,<br>Rodriguez y Carvajal</p>
        </div>
    </body>
    </html>';
    $mail->AltBody = 'Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos pronto.';

    $mail->send();
    
    // Email a la empresa
    $mail->clearAddresses();
    $mail->setFrom($config['smtp_user'], 'Formulario Web');
    $mail->addAddress($config['company_email']);
    $mail->Subject = "Nuevo contacto de: {$data['nombre']}";
    $mail->Body = '
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Nuevo Mensaje de Contacto</title>
    </head>
    <body>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #333;">Nuevo Mensaje de Contacto</h1>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p><strong>Nombre:</strong> ' . htmlspecialchars($data['nombre']) . '</p>
                <p><strong>Email:</strong> ' . htmlspecialchars($data['email']) . '</p>
                <p><strong>Fecha:</strong> ' . date('d/m/Y H:i:s') . '</p>
            </div>
            <h2>Mensaje:</h2>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
                ' . nl2br(htmlspecialchars($data['mensaje'])) . '
            </div>
        </div>
    </body>
    </html>';
    $mail->AltBody = "Nuevo contacto:\nNombre: {$data['nombre']}\nEmail: {$data['email']}\nMensaje: {$data['mensaje']}";

    $mail->send();

    echo json_encode([
        'status' => 'success',
        'message' => `Emails enviados correctamente`
    ]);

} catch (Exception $e) {
    error_log('Error en send-email.php: ' . $e->getMessage());
    
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage(),
        'details' => isset($mail) ? $mail->ErrorInfo : 'Error antes de PHPMailer'
    ]);
}