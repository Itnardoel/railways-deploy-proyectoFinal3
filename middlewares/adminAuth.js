import logger from "../utils/logger.js";

export default async (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.json({ message: "Please Log In." });
  }

  const { user } = req;

  if (!user.admin) {
    return res.status(401).json({ message: "Not an admin user." });
  }

  try {
    if (user.admin) {
      next();
    }
  } catch (error) {
    logger.error("error", error.message);
    next(error);
  }
};
