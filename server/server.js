const express = require('express');
const path = require('path');
const router = require('./router');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// route to dummy db
app.use('/', router);
// to only run build and get static when in production, not development
app.use('/build', express.static(path.join(__dirname, '../build')));
/* Serves Static Files  */
app.get('/', (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'))
);
/* /data Refresh Testing */
app.get('/data', (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'))
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
