const express = require('express');
const path = require('path');
const router = require('./router');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route to dummy db
app.use('/', router);

// Serve static files from the public directory at the root path
app.use(express.static(path.join(__dirname, '../public')));

// Serve the main index.html file
app.get('/', (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../public/index.html'))
);

/* /data Refresh Testing */
app.get('/data', (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../public/index.html'))
);

/* Catch All Route */
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

/* Global Error Handler */
app.use((err, req, res, next) => {
  console.log('error handler', err);
  res.status(500).send('Internal Server Error');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

module.exports = app;
