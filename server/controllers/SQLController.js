const { Pool } = require('pg');
/* Example db URI */
const EX_PG_URI = 'postgres://zhocexop:Ipv9EKas6bU6z9ehDXZQRorjITIXijGv@ziggy.db.elephantsql.com:5432/zhocexop';
const fs = require('fs');
const sqlQuery = fs.readFileSync('server/tableQuery.sql', 'utf8');


const SQLController = {};

SQLController.getSQLSchema = (req, res, next) => {
    let PSQL_URI;
    console.log('request body', req.body);
    req.body.link ? PSQL_URI = req.body.link : PSQL_URI = EX_PG_URI
    const db = new Pool({connectionString: PSQL_URI});
    db.query(sqlQuery)
    .then((data) => {
        res.locals.SQLSchema = data.rows[0].tables;
        return next()
    })
    .catch((err) => {
        const errObj = {
            log: `Error in getSQLSchema: ${err}`,
            status: 400,
            message: {
              err: 'Unable to connect to SQL database, please confirm URI',
            },
          };
          return next(errObj);
        });
};
/* Format the SQL Schema for visualizer */
SQLController.createGraphData = (req, res, next) => {
  
}
module.exports = SQLController