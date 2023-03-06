import ordersMongoDao from "../models/dao/ordersMongoDao.js";
import Nodemailer from "../utils/nodemailer.js";

export async function create(cart) {
  const order = await ordersMongoDao.create(cart);
  await Nodemailer.sendOrderMail(
    order.email,
    `Nuevo pedido de ${order.email}`,
    order.items
  );
  return order;
}

export default {
  create,
};
