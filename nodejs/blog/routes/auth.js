const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/join', isNotLoggedIn, async(req,res,next)=>{
    const {id, nickname, password, blogName} = req.body;
    try{
        const exUser = await User.findOne({where:{id}});
        if(exUser){
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            id,
            nickname,
            password: hash,
            blogName,
        });
        return res.redirect('/');
    } catch(err){
        console.error(err);
        return next(err);
    }
});

router.post('/login', isNotLoggedIn,(req,res,next)=>{
    passport.authenticate('local',(authError, user, info)=>{
        if(authError){
            console.error(authError);
            return next(authError); 
        }
        if(!user){
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user,(loginError)=>{
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req,res,next);    
});

router.get('/logout',isLoggedIn,(req,res)=>{
    req.logout();
    req.session.destroy();
    res.redirect('/');
});
module.exports = router;