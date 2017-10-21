import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import config from './config';
import router from './router';
import './services/passport-google-oauth';

const app = express();

mongoose.connect(config.mLabConnection, {
  useMongoClient: true
});
app.use('/', router);

const port = process.env.PORT || config.appPort;
const server = http.createServer(app);

server.listen(port);
console.log('Server is listening on port ' + port);
