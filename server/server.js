const express = require('express');
const path = require('path');
const router = require('./router');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add this snippet in your server.js file

app.get('/test-db-connection', async (req, res) => {
  const { Pool } = require('pg');
  const EX_PG_URI =
    'postgres://zhocexop:Ipv9EKas6bU6z9ehDXZQRorjITIXijGv@ziggy.db.elephantsql.com:5432/zhocexop';

  const db = new Pool({ connectionString: EX_PG_URI });

  try {
    // Perform a simple query to test the connection
    const result = await db.query('SELECT NOW()');
    res
      .status(200)
      .send(
        `Database connection successful. Current time: ${result.rows[0].now}`
      );
  } catch (err) {
    // If the connection fails, log the error and send an error response
    console.error('Database connection failed:', err.message);
    res.status(500).send(`Database connection failed: ${err.message}`);
  }
});

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
