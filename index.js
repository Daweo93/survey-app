import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import config from './config/config';
import router from './router';
import './models/User';
import './services/passport-google-oauth';

const app = express();

mongoose.connect(config.mLabConnection, {
  useMongoClient: true
});

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [config.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', router);

const port = process.env.PORT || config.appPort;
const server = http.createServer(app);
server.listen(port);
console.log('Server is listening on port ' + port);
