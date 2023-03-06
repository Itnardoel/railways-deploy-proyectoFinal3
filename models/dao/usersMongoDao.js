import UserModel from "../userModel.js";
import UserDto from "../dto/usersDto.js";
import { NotFoundError } from "../errors/customError.js";

export async function get() {
  const usersDao = await UserModel.find({});
  return usersDao.map((userDao) => new UserDto(userDao));
}

export async function getById(id) {
  const userDao = await UserModel.findOne({ _id: id });
  if (!userDao) {
    throw new NotFoundError(`User with id ${id} not found`, { id });
  }
  return new UserDto(userDao);
}

export async function updateById(id, userDto) {
  const userDao = await UserModel.findOne({ _id: id });
  if (!userDao) {
    throw new NotFoundError(`User with id ${id} not found`, { id });
  }
  if (userDto.email) {
    userDao.email = userDto.email;
  }
  if (userDto.fullname) {
    userDao.fullname = userDto.fullname;
  }
  if (userDto.tel) {
    userDao.tel = userDto.tel;
  }
  return new UserDto(await userDao.save());
}

export async function deleteById(id) {
  const userDao = await UserModel.findOne({ _id: id });
  if (!userDao) {
    throw new NotFoundError(`User with id ${id} not found`, { id });
  }
  await UserModel.deleteOne({ _id: id });
  return new UserDto(userDao);
}

export default {
  get,
  getById,
  updateById,
  deleteById,
};
