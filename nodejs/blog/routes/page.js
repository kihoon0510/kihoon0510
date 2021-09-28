const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.title = "블로그 만드는중";
  res.locals.blogName = "테스트 중";
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

module.exports = router;
