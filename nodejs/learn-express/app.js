const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const nunjucks = require('nunjucks');

dotenv.config();
const indexRouter = require('./routes');
const userRouter = require('./routes/user');

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine','njk');

nunjucks.configure('./views',{
    express: app,
    watch: true
});

app.use(morgan('dev'));
app.use('/',express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
    },
    name:'session-cookie',
}));

app.use('/',indexRouter);
app.use('/user',userRouter);



// const multer = require('multer');
// const fs = require('fs');
// const { use } = require('./routes');

// try{
//     fs.readFileSync('uploads');
// }catch(error){
//     console.error(error);
//     //fs.mkdirSync('uploads');
// }

// const upload = multer({
//     storage: multer.diskStorage({
//         destination(req,file,done){
//             done(null,'uploads/');
//         },
//         filename(req,file,done){
//             const ext = path.extname(file.originalname);
//             done(null,path.basename(file.originalname,ext)+Date.now()+ext);
//         },
//     }),
//     limits: {fileSize: 5*1024*1024},
// });

app.use((req,res,next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

// app.get('/upload',(req,res)=>{
//     res.sendFile(path.join(__dirname,'multipart.html'));
// });

// app.post('/upload',upload.fields([{name:'image1'},{name:'image2'}]),
//     (req,res)=>{
//         console.log(req.files, req.body);
//         res.send('ok');
// });

app.use((err, req, res, next)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기 중');
});