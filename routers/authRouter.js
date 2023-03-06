import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

import Nodemailer from "../utils/nodemailer.js";

const router = Router();

router.post(
  "/signup",
  passport.authenticate("signup", {
    failureRedirect: "unauthorized",
    failureMessage: true,
  }),
  async (req, res, next) => {
    Nodemailer.sendRegisterMail(
      req.user.email,
      `Nuevo registro de ${req.user.email}`,
      req.user
    );
    res.json({
      message: "Signup successful.",
      user: req.user,
    });
  }
);

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        return res
          .status(401)
          .json({ success: false, message: "Incorrect user or password." });
      }

      req.login(user, async (error) => {
        if (error) return next(error);

        const body = {
          _id: user._id,
          email: user.email,
          fullname: user.fullname,
          tel: user.tel,
          admin: user.admin,
        };
        const token = jwt.sign({ user: body }, "TOP_SECRET", {
          expiresIn: "10m",
        });

        req.session.token = token;

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.post("/logout", (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.json({ message: "You are not logged in." });
  }

  const { user } = req;

  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.json({ message: "Logged Out", email: user.email });
  });
});

router.get("/token", (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.json({ message: "You are not logged in." });
  }
  const { token } = req.session;
  return res.json({ token });
});

router.get("/unauthorized", (req, res) => {
  res.status(401).json({
    success: false,
    message: req.session.messages[req.session.messages.length - 1],
  });
});

export default router;
