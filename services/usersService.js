import usersMongoDao from "../models/dao/usersMongoDao.js";

export async function get() {
  const user = await usersMongoDao.get();
  return user;
}

export async function getById(id) {
  const user = await usersMongoDao.getById(id);
  return user;
}

export async function updateById(id, data) {
  const user = await usersMongoDao.updateById(id, data);
  return user;
}

export async function deleteById(id) {
  const user = await usersMongoDao.deleteById(id);
  return user;
}

export default {
  get,
  getById,
  updateById,
  deleteById,
};
