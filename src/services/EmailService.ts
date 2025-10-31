// src/services/EmailService.ts

const ACCESS_CODE = '0610'; // Código fijo de acceso

interface EmailData {
  nombre: string;
  email: string;
}

export const sendAccessCodeEmail = async ({ nombre, email }: EmailData): Promise<boolean> => {
  try {
    // OPCIÓN 1: Usando EmailJS (Recomendado - Gratis y fácil)
    // Regístrate en https://www.emailjs.com/
    const emailJSPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const emailJSServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const emailJSTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

    if (emailJSPublicKey && emailJSServiceId && emailJSTemplateId) {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: emailJSServiceId,
          template_id: emailJSTemplateId,
          user_id: emailJSPublicKey,
          template_params: {
            to_email: email,
            to_name: nombre,
            access_code: ACCESS_CODE,
            reply_to: 'hola@mindchefai.com'
          }
        })
      });

      return response.ok;
    }

    // OPCIÓN 2: Si tienes backend propio
    // const response = await fetch('https://tu-backend.com/api/send-access-code', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ nombre, email, code: ACCESS_CODE })
    // });
    // return response.ok;

    // Por defecto, si no hay configuración, simular envío exitoso
    console.log(`Email simulado enviado a ${email} con código ${ACCESS_CODE}`);
    return true;

  } catch (error) {
    console.error('Error enviando email:', error);
    return false;
  }
};

export const verifyAccessCode = (code: string): boolean => {
  return code.trim() === ACCESS_CODE;
};

export { ACCESS_CODE };