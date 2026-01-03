const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const {RedisStore} = require("connect-redis");
const passport = require("passport");
const bodyParser = require("body-parser");

const redisClient = require('./helpers/redis.mjs').default; // use CommonJS version
const store = new RedisStore({
  client: redisClient,
  prefix: 'sess:'  // or any prefix *matching* your cookie format
});

const route = require('./route/index.js')
dotenv.config();
const roure = require('./route/index');

const app = express();

app.use(cors({
  origin: ['http://localhost:8080','http://192.168.0.42:8080'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  credentials: true
}));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Redis session
app.use(session({
  name: "odoo2026",
  secret: 'Lionking9',
  saveUninitialized: false,
  resave: false,
  rolling: false,
  store,
  cookie: (() => {
    const base = {
      maxAge: 60 * 60 * 1000,
      secure: app.get("env") !== "development" ?  true : false,
      httpOnly: true,
      sameSite: "lax",
      path: "/"
    };
  })()   // <-- ✔ FIXED
}));


// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api', roure);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log("server is running on port", PORT));
