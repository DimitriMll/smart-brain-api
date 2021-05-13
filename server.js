const express = require("express");
// const bodyParser = require('body-parser');
const cors = require("cors");
const bcrypt = require("bcrypt-nodejs");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: process.env.DATABASE_URL,
    ssl: true
  },
});

const app = express();
// app.use(bodyParser.json());

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send('It is working!!');
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});

/*
app.use(express.urlencoded({extended: false}));
app.use(express.json());
const user = {
        name: 'Sally',
        hobby: 'soccer',
    }
    res.send(user);

    
app.get('/:id', (req, res) => {
    console.log(req.params);
    res.send('getting root');
});
*/
