const express = require("express");

const { isLoggedIn } = require("./middlewares");

const router = express.Router();


router.get('/write',isLoggedIn,(req,res,next)=>{
    res.render('write');
});


module.exports = router;