const express = require("express");
const User = require("../models/user");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.title = "블로그 만드는중";
  res.locals.blogName = "블로그";
  res.locals.user = req.user;
  next();
});

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile", { title: "내 정보" });
});

router.get("/join", isNotLoggedIn, (req, res) => {
  res.render("join", { title: "회원 가입" });
});

router.get("/", (req, res, next) => {
  res.render("main");
});

router.get("/:id", isLoggedIn, async (req, res, next) => {
  if (req.params.id === req.user.id) {
    res.locals.temp = "테스트테스트" + req.user.id;
    try {
      const user = await User.findOne({
        attributes: ["nickname", "email", "phone", "blogName"],
        where: {
          id: req.user.id,
        },
      });
      res.locals.blogName = user.blogName;
      res.locals.email = user.email;
      res.locals.phone = user.phone;
      res.locals.nickName = user.nickname;
      res.locals.title = user.blogName;
      res.render("main");
    } catch (err) {
      console.error(err);
    }
  } else {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
  }
});

module.exports = router;
