const express = require("express");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.title = '';
  res.locals.blogName = '';
  res.locals.nickName = ''; 
  res.locals.email = '';
  res.locals.phone = '';
  res.locals.SNS = '';
});
