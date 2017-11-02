import http from 'http';
import express from 'express';
import volleyball from 'volleyball';
import bodyParser from 'body-parser';
import route from './routes';
// Set up the express app
const app = express();
require('dotenv').config();

// Log requests to the console.
app.use(volleyball);

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

route(app);


// Set the app entry port
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to my API.'
}));

export default app;
