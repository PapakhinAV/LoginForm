const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const dbConnect = require('./config/db');
const signupRouter = require('./routes/signupRouter');
const signinRouter = require('./routes/signinRouter');
const logoutRouter = require('./routes/logoutRouter');
const passports = require('./passports');
const { checkAuthentication } = require('./config/authControl');

dotenv.config();
const app = express();
dbConnect();

const host = app.use(
  cors({
    origin: `${process.env.APP_SERVER}`,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(express.urlencoded({ extended: true }));

const connection = mongoose.createConnection(process.env.MONGO_DB,
  { useNewUrlParser: true, useUnifiedTopology: true });

app.use(session({
  secret: process.env.SESSIONS_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: connection }),

}));

app.use(passport.initialize());
app.use(passport.session());
passports(passport);

const { PORT } = process.env;

app.use('/signUpNewUser', signupRouter);
app.use('/signInUser', signinRouter);
app.use('/logout', logoutRouter);
app.get("/home", checkAuthentication, (req, res) => {
  res.sendStatus(200)
})

app.listen(PORT, () => {
  console.log('Server has been started on port ', PORT);
});
