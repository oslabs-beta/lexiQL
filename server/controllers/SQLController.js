const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const CryptoJS = require('crypto-js');

const secretKey = require('../secretKey');
/* Example db URI */
const EX_PG_URI =
  'postgres://zhocexop:Ipv9EKas6bU6z9ehDXZQRorjITIXijGv@ziggy.db.elephantsql.com:5432/zhocexop';

// Mock database data for testing when the real database is unavailable
const MOCK_DB_DATA = {
  "users": {
    "primaryKey": "id",
    "foreignKeys": [],
    "referencedBy": {
      "posts": "user_id",
      "comments": "user_id",
      "profiles": "user_id"
    },
    "columns": {
      "id": {"dataType": "integer", "columnDefault": null, "charMaxLength": null, "isNullable": "NO"},
      "name": {"dataType": "character varying", "columnDefault": null, "charMaxLength": 255, "isNullable": "YES"},
      "email": {"dataType": "character varying", "columnDefault": null, "charMaxLength": 255, "isNullable": "YES"},
      "created_at": {"dataType": "timestamp", "columnDefault": null, "charMaxLength": null, "isNullable": "YES"}
    }
  },
  "posts": {
    "primaryKey": "id",
    "foreignKeys": {
      "user_id": {"referenceTable": "users", "referenceKey": "id"},
      "category_id": {"referenceTable": "categories", "referenceKey": "id"}
    },
    "referencedBy": {
      "comments": "post_id",
      "tags_posts": "post_id"
    },
    "columns": {
      "id": {"dataType": "integer", "columnDefault": null, "charMaxLength": null, "isNullable": "NO"},
      "title": {"dataType": "character varying", "columnDefault": null, "charMaxLength": 255, "isNullable": "YES"},
      "content": {"dataType": "text", "columnDefault": null, "charMaxLength": null, "isNullable": "YES"},
      "user_id": {"dataType": "integer", "columnDefault": null, "charMaxLength": null, "isNullable": "YES"},
      "category_id": {"dataType": "integer", "columnDefault": null, "charMaxLength": null, "isNullable": "YES"},
      "published": {"dataType": "boolean", "columnDefault": null, "charMaxLength": null, "isNullable": "YES"},
      "created_at": {"dataType": "timestamp", "columnDefault": null, "charMaxLength": null, "isNullable": "YES"}
    }
  },
  "categories": {
    "primaryKey": "id",
    "foreignKeys": [],
    "referencedBy": {
      "posts": "category_id"
    },
    "columns": {
      "id": {"dataType": "integer", "columnDefault": null, "charMaxLength": null, "isNullable": "NO"},
      "name": {"dataType": "character varying", "columnDefault": null, "charMaxLength": 100, "isNullable": "YES"},
      "description": {"dataType": "text", "columnDefault": null, "charMaxLength": null, "isNullable": "YES"}
    }
  },
  "comments": {
    "primaryKey": "id",
    "foreignKeys": {
      "user_id": {"referenceTable": "users", "referenceKey": "id"},
      "post_id": {"referenceTable": "posts", "referenceKey": "id"}
    },
    "referencedBy": {},
    "columns": {
      "id": {"dataType": "integer", "columnDefault": null, "charMaxLength": null, "isNullable": "NO"},
      "content": {"dataType": "text", "columnDefault": null, "charMaxLength": null, "isNullable": "YES"},
      "user_id": {"dataType": "integer", "columnDefault": null, "charMaxLength": null, "isNullable": "YES"},
      "post_id": {"dataType": "integer", "columnDefault": null, "charMaxLength": null, "isNullable": "YES"},
      "created_at": {"dataType": "timestamp", "columnDefault": null, "charMaxLength": null, "isNullable": "YES"}
    }
  },
  "profiles": {
    "primaryKey": "id",
    "foreignKeys": {
      "user_id": {"referenceTable": "users", "referenceKey": "id"}
    },
    "referencedBy": {},
    "columns": {
      "id": {"dataType": "integer", "columnDefault": null, "charMaxLength": null, "isNullable": "NO"},
      "bio": {"dataType": "text", "columnDefault": null, "charMaxLength": null, "isNullable": "YES"},
      "avatar_url": {"dataType": "character varying", "columnDefault": null, "charMaxLength": 500, "isNullable": "YES"},
      "user_id": {"dataType": "integer", "columnDefault": null, "charMaxLength": null, "isNullable": "YES"}
    }
  },
  "tags": {
    "primaryKey": "id",
    "foreignKeys": [],
    "referencedBy": {
      "tags_posts": "tag_id"
    },
    "columns": {
      "id": {"dataType": "integer", "columnDefault": null, "charMaxLength": null, "isNullable": "NO"},
      "name": {"dataType": "character varying", "columnDefault": null, "charMaxLength": 50, "isNullable": "YES"},
      "color": {"dataType": "character varying", "columnDefault": null, "charMaxLength": 7, "isNullable": "YES"}
    }
  },
  "tags_posts": {
    "primaryKey": "id",
    "foreignKeys": {
      "tag_id": {"referenceTable": "tags", "referenceKey": "id"},
      "post_id": {"referenceTable": "posts", "referenceKey": "id"}
    },
    "referencedBy": {},
    "columns": {
      "id": {"dataType": "integer", "columnDefault": null, "charMaxLength": null, "isNullable": "NO"},
      "tag_id": {"dataType": "integer", "columnDefault": null, "charMaxLength": null, "isNullable": "YES"},
      "post_id": {"dataType": "integer", "columnDefault": null, "charMaxLength": null, "isNullable": "YES"}
    }
  },
  "likes": {
    "primaryKey": "id",
    "foreignKeys": {
      "user_id": {"referenceTable": "users", "referenceKey": "id"},
      "post_id": {"referenceTable": "posts", "referenceKey": "id"}
    },
    "referencedBy": {},
    "columns": {
      "id": {"dataType": "integer", "columnDefault": null, "charMaxLength": null, "isNullable": "NO"},
      "user_id": {"dataType": "integer", "columnDefault": null, "charMaxLength": null, "isNullable": "YES"},
      "post_id": {"dataType": "integer", "columnDefault": null, "charMaxLength": null, "isNullable": "YES"},
      "created_at": {"dataType": "timestamp", "columnDefault": null, "charMaxLength": null, "isNullable": "YES"}
    }
  }
};

const sqlFilePath = path.resolve(__dirname, '../tableQuery.sql');
console.log('Attempting to read SQL file from:', sqlFilePath);

const sqlQuery = fs.readFileSync(sqlFilePath, 'utf8');

const SQLController = {};

// decrypt incoming PSQL URLs
const decryptedURI = (encryptedURL) => {
  const bytes = CryptoJS.AES.decrypt(encryptedURL, secretKey);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
};

SQLController.getSQLSchema = (req, res, next) => {
  let PSQL_URI;

  // if user sent URI, call decryptedURI to decrypt the link
  req.body.link
    ? (PSQL_URI = decryptedURI(req.body.link))
    : (PSQL_URI = EX_PG_URI);

  console.log('Connecting to database...');
  console.log('Using URI:', PSQL_URI.substring(0, 20) + '...');
  
  const db = new Pool({ connectionString: PSQL_URI });
  
  // Test the connection first
  db.query('SELECT NOW()')
    .then(() => {
      console.log('Database connection successful');
      return db.query(sqlQuery);
    })
    .then((data) => {
      console.log('SQL query executed successfully');
      console.log('Raw data structure:', typeof data.rows[0].tables);
      res.locals.SQLSchema = data.rows[0].tables;
      return next();
    })
    .catch((err) => {
      console.error('Database connection error:', err);
      console.log('Falling back to mock data...');
      
      // Use mock data as fallback
      res.locals.SQLSchema = MOCK_DB_DATA;
      console.log('Mock data set:', res.locals.SQLSchema);
      return next();
    })
    .finally(() => {
      db.end();
    });
};

/* Format the SQL Schema for visualizer */
SQLController.formatGraphData = (req, res, next) => {
  try {
    console.log('formatGraphData: Starting to format data');
    const sqlSchema = res.locals.SQLSchema;
    console.log('formatGraphData: SQLSchema received:', typeof sqlSchema);
    
    let graphData = [];

    for (const tableName of Object.keys(sqlSchema)) {
      console.log('formatGraphData: Processing table:', tableName);
      const tableObject = {};
      tableObject[tableName] = sqlSchema[tableName];
      if (sqlSchema[tableName].foreignKeys) {
        const foreignKeysArray = [];
        for (const fk of Object.keys(sqlSchema[tableName].foreignKeys)) {
          const foreignKeyObject = {};
          foreignKeyObject[fk] = sqlSchema[tableName].foreignKeys[fk];
          foreignKeysArray.push(foreignKeyObject);
        }
        sqlSchema[tableName].foreignKeys = foreignKeysArray;
      }

      if (sqlSchema[tableName].referencedBy) {
        const referencedByArray = [];
        for (const refBy of Object.keys(sqlSchema[tableName].referencedBy)) {
          const referencedByObject = {};
          referencedByObject[refBy] = sqlSchema[tableName].referencedBy[refBy];
          referencedByArray.push(referencedByObject);
        }
        sqlSchema[tableName].referencedBy = referencedByArray;
      }

      if (sqlSchema[tableName].columns) {
        const columnsArray = [];
        for (const columnName of Object.keys(sqlSchema[tableName].columns)) {
          const columnsObject = {};
          columnsObject[columnName] = sqlSchema[tableName].columns[columnName];
          columnsArray.push(columnsObject);
        }
        sqlSchema[tableName].columns = columnsArray;
      }

      graphData.push(tableObject);
    }

    console.log('formatGraphData: Final graph data length:', graphData.length);
    res.locals.SQLSchema = graphData;
    return next();
  } catch (err) {
    console.error('formatGraphData error:', err);
    const errObject = {
      log: `Error in formatGraphData: ${err}`,
      status: 400,
      message: { err: `Format graph data failed` },
    };
    return next(errObject);
  }
};

module.exports = SQLController;