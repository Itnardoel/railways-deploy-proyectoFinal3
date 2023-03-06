import usersService from "../services/usersService.js";

export async function get(req, res, next) {
  try {
    const users = await usersService.get();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

export async function getById(req, res, next) {
  const { user: myId } = req;
  try {
    const user = await usersService.getById(myId._id);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export async function updateById(req, res, next) {
  try {
    const user = await usersService.updateById(req.params.id, req.body);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export async function deleteById(req, res, next) {
  try {
    const user = await usersService.deleteById(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export default {
  get,
  getById,
  updateById,
  deleteById,
};
