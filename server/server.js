import express from 'express';
import path from 'path';
import { ParseServer } from 'parse-server';
import ParseDashboard from 'parse-dashboard';
import * as config from './config';

const server = express();

const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';

server.use(
  '/parse',
  new ParseServer({
    databaseURI: config.mongo.uri,
    cloud: path.resolve(__dirname, 'cloud.js'),
    appId: config.parse.app_id,
    masterKey: config.parse.master_key,
    fileKey: config.parse.file_key,
    serverURL: `http://${config.express.host}:${config.express.port}/parse`
  })
);

server.use(
  '/dashboard',
  ParseDashboard({
    apps: [{
      serverURL: '/parse',
      appId: config.parse.app_id,
      masterKey: config.parse.master_key,
      appName: 'Couchsurfing App',
    }]
  }, IS_DEVELOPMENT),
);

server.listen(config.express.port, () => console.log(
  `Server is now running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${config.express.port}`
));
