import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import path from 'path';
import config from './config/config';
import router from './router';
import './models/User';
import './models/Survey';
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

if (process.env.NODE_ENV === 'production') {
  // Express will serve production assets
  app.use(express.static('client/build'));

  // Express will serve the index.html file
  // if it doesn't recognize route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || config.appPort;
const server = http.createServer(app);
server.listen(port);
console.log('Server is listening on port ' + port);
