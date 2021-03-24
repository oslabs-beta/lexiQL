const { Pool } = require('pg');

const PG_URI = 'postgres://zhocexop:Ipv9EKas6bU6z9ehDXZQRorjITIXijGv@ziggy.db.elephantsql.com:5432/zhocexop';
const fs = require('fs');
const sqlQuery = fs.readFileSync('server/tableQuery.sql', 'utf8');

const db = new Pool({
    connectionString: PG_URI
});

const SQLController = {};

SQLController.getSQLSchema = (req, res, next) => {
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
module.exports = SQLController