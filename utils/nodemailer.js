import nodemailer from "nodemailer";

import logger from "./logger.js";

const email = process.env.NODEMAILER_TRANSPORT_MAIL;

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_TRANSPORT_HOST,
  port: process.env.NODEMAILER_TRANSPORT_PORT,
  auth: {
    user: process.env.NODEMAILER_TRANSPORT_MAIL,
    pass: process.env.NODEMAILER_TRANSPORT_PASS,
  },
});

export async function sendOrderMail(to, subject, body) {
  const opts = {
    from: "Backend 32120",
    to: to,
    subject,
    html: `<h1> Nueva Orden </h1>
                <p> ${body
                  .map(
                    (element) =>
                      element.nombre +
                      " " +
                      "x" +
                      " " +
                      element.cantidad +
                      " " +
                      "$" +
                      (element.precio * element.cantidad).toFixed(2)
                  )
                  .join("</p><p>")} </p>
                <br>
                <p> Gracias por tu compra </p>
                <p> Backend 32120 </p>
            `,
  };

  try {
    const result = await transporter.sendMail(opts);
    logger.info("Mail sended", result);
  } catch (error) {
    logger.error("Mail cannot send", error);
  }
}

export async function sendRegisterMail(to, subject, body) {
  const opts = {
    from: "Backend 32120",
    to: to,
    subject,
    html: `<h1> Nuevo Registro </h1>
                <p> Email: ${body.email} </p>
                <p> Nombre: ${body.fullname} </p>
                <p> Telefono: ${body.tel} </p>
                <br>
                <p> Gracias por registrarte </p>
                <p> Backend 32120 </p>
            `,
  };

  try {
    const result = await transporter.sendMail(opts);
    logger.info("Mail sended", result);
  } catch (error) {
    logger.error("Mail cannot send", error);
  }
}

export default {
  sendOrderMail,
  sendRegisterMail,
};
