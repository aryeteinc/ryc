// src/pages/api/send-email.ts
import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    // Validar los datos recibidos
    if (!data.email || !data.nombre || !data.mensaje) {
      return new Response(
        JSON.stringify({
          status: 'error',
          message: 'Faltan campos requeridos'
        }),
        { status: 400 }
      );
    }

    // Configurar el transporter de nodemailer
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true para puerto 465, false para otros puertos
      auth: {
        user: import.meta.env.EMAIL_USER,
        pass: import.meta.env.EMAIL_PASS,
      },
    });

    // Email para el cliente
    await transporter.sendMail({
      from: `"Rodriguez y Carvajal" <${import.meta.env.EMAIL_USER}>`,
      to: data.email,
      subject: 'Gracias por contactarnos',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #007bff; text-align: center;">¡Gracias por contactarnos!</h1>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p>Hola ${data.nombre},</p>
            <p>Hemos recibido tu mensaje correctamente. Nuestro equipo revisará tu consulta y te responderemos lo antes posible.</p>
            <p>Este es un resumen de tu mensaje:</p>
            <div style="background-color: #ffffff; padding: 15px; border-radius: 5px; margin: 10px 0;">
              ${data.mensaje}
            </div>
          </div>
          
          <p style="color: #666666; font-size: 14px; text-align: center;">
            Este es un mensaje automático, por favor no respondas a este email.
          </p>
        </div>
      `,
    });

    // Email para la empresa
    await transporter.sendMail({
      from: `"Sistema de Contacto" <${import.meta.env.EMAIL_USER}>`,
      to: import.meta.env.COMPANY_EMAIL,
      subject: `Nuevo contacto de: ${data.nombre}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #28a745; text-align: center;">Nuevo Mensaje de Contacto</h1>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px;">
            <h2 style="color: #333;">Detalles del contacto:</h2>
            
            <div style="background-color: #ffffff; padding: 15px; border-radius: 5px; margin: 10px 0;">
              <p><strong>Nombre:</strong> ${data.nombre}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Teléfono:</strong> ${data.telefono || 'No proporcionado'}</p>
              <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
            </div>
            
            <h3 style="color: #333;">Mensaje:</h3>
            <div style="background-color: #ffffff; padding: 15px; border-radius: 5px;">
              ${data.mensaje}
            </div>
          </div>
        </div>
      `,
    });

    return new Response(
      JSON.stringify({
        status: 'success',
        message: 'Mensaje enviado correctamente'
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Error al enviar email:', error);
    return new Response(
      JSON.stringify({
        status: 'error',
        message: error instanceof Error ? error.message : 'Error al enviar el mensaje'
      }),
      { status: 500 }
    );
  }
};