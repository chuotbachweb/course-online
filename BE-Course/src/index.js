const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/db.config");
const { firebaseConfig } = require("./config/firebase.config");
const firebase = require("firebase/app");
const route = require("./routes");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const port = 1407;

db.connect();
firebase.initializeApp(firebaseConfig);

app.use(cors());
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// read token in cookie
app.use(cookieParser());

route(app);

app.listen(port, () =>
  console.log(`app listening at http://localhost:${port}`)
);