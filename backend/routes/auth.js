const router = require("express").Router(); // создали роутер
const { login, createUser, cookieCheck } = require("../controllers/users");
const {
  signinValidator,
  signupValidator,
} = require("../middlewares/validator");

router.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

router.post("/signin", signinValidator, login);

router.post("/signup", signupValidator, createUser);

router.get("/signout", (req, res) => {
  res.clearCookie("jwt").send({ message: "Выход" });
});

router.get("/check", cookieCheck);

module.exports = router;
