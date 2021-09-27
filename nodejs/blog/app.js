const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
const nunjucks = require("nunjucks");

const { sequelize } = require('./models');

const multer = require("multer");
const fs = require("fs");

try {
  fs.readdirSync("uploads");
} catch (err) {
  console.error(err);
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

dotenv.config();
const app = express();
app.set("port", process.env.PORT || 3000);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

sequelize.sync({force : false})
  .then(()=>{
    console.log('db connect');
  })
  .catch((err)=>{
    console.log('db 연결 실패')
    console.error(err);
  });


app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie",
  })
);
app.get("/", (req, res) => {
  res.locals.blogName = '테스트 중';
  res.locals.title = '블로그 만드는중';
  res.locals.nickName = '남기훈';
  res.locals.email = 'nam_0510@naver.com';
  res.locals.phone = '010-6661-1259';
  res.render("layout");
});

app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/login.html"));
});

app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file, req.body);
  res.send("ok");
});

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("err");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
