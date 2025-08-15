const express = require('express');
const path = require('path');
const router = require('./router');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route to dummy db
app.use('/', router);

// Serve the main index.html file for the root route
app.get('/', (req, res) => {
  res
    .status(200)
    .send(
      'Backend server is running. Use the webpack dev server at localhost:8080 for the frontend.'
    );
});

/* /data Refresh Testing */
app.get('/data', (req, res) => {
  res
    .status(200)
    .send(
      'Backend server is running. Use the webpack dev server at localhost:8080 for the frontend.'
    );
});

/* Catch All Route */
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

/* Global Error Handler */
app.use((err, req, res, next) => {
  console.log('error handler', err);
  res.status(500).send('Internal Server Error');
});

let serverInstance = null;
if (process.env.NODE_ENV !== 'test') {
  serverInstance = app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
}

module.exports = app;
