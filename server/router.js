const express = require('express');
const router = express.Router();
const { graphqlHTTP } = require('express-graphql');

const {
  getSQLSchema,
  formatGraphData,
} = require('./controllers/SQLController');
const { createGQLSchema } = require('./controllers/GQLController');
const schema = require('./schema');

/* Test endpoint */
router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Server is working!' });
});

/* Test mock data endpoint */
router.get('/test-mock', (req, res) => {
  const MOCK_DB_DATA = {
    "users": {
      "primaryKey": "id",
      "foreignKeys": [],
      "referencedBy": {
        "posts": "user_id"
      },
      "columns": {
        "id": {"dataType": "integer", "columnDefault": null, "charMaxLength": null, "isNullable": "NO"},
        "name": {"dataType": "character varying", "columnDefault": null, "charMaxLength": 255, "isNullable": "YES"},
        "email": {"dataType": "character varying", "columnDefault": null, "charMaxLength": 255, "isNullable": "YES"}
      }
    },
    "posts": {
      "primaryKey": "id",
      "foreignKeys": {
        "user_id": {"referenceTable": "users", "referenceKey": "id"}
      },
      "referencedBy": {},
      "columns": {
        "id": {"dataType": "integer", "columnDefault": null, "charMaxLength": null, "isNullable": "NO"},
        "title": {"dataType": "character varying", "columnDefault": null, "charMaxLength": 255, "isNullable": "YES"},
        "content": {"dataType": "text", "columnDefault": null, "charMaxLength": null, "isNullable": "YES"},
        "user_id": {"dataType": "integer", "columnDefault": null, "charMaxLength": null, "isNullable": "YES"}
      }
    }
  };
  res.status(200).json(MOCK_DB_DATA);
});

/* Test GQLFactory endpoint */
router.get('/test-gql', (req, res) => {
  const { createTypes, createResolvers } = require('./GQLFactory/schemaFactory');
  const MOCK_DB_DATA = {
    "users": {
      "primaryKey": "id",
      "foreignKeys": [],
      "referencedBy": {
        "posts": "user_id"
      },
      "columns": {
        "id": {"dataType": "integer", "columnDefault": null, "charMaxLength": null, "isNullable": "NO"},
        "name": {"dataType": "character varying", "columnDefault": null, "charMaxLength": 255, "isNullable": "YES"},
        "email": {"dataType": "character varying", "columnDefault": null, "charMaxLength": 255, "isNullable": "YES"}
      }
    },
    "posts": {
      "primaryKey": "id",
      "foreignKeys": {
        "user_id": {"referenceTable": "users", "referenceKey": "id"}
      },
      "referencedBy": {},
      "columns": {
        "id": {"dataType": "integer", "columnDefault": null, "charMaxLength": null, "isNullable": "NO"},
        "title": {"dataType": "character varying", "columnDefault": null, "charMaxLength": 255, "isNullable": "YES"},
        "content": {"dataType": "text", "columnDefault": null, "charMaxLength": null, "isNullable": "YES"},
        "user_id": {"dataType": "integer", "columnDefault": null, "charMaxLength": null, "isNullable": "YES"}
      }
    }
  };
  
  try {
    console.log('Testing GQLFactory with mock data...');
    const types = createTypes(MOCK_DB_DATA);
    const resolvers = createResolvers(MOCK_DB_DATA);
    res.status(200).json({ 
      success: true, 
      types: types.substring(0, 200) + '...',
      resolvers: resolvers.substring(0, 200) + '...'
    });
  } catch (err) {
    console.error('GQLFactory test error:', err);
    res.status(500).json({ 
      success: false, 
      error: err.message,
      stack: err.stack 
    });
  }
});

/* Route for example SQL Schema and example GQL Schema */
router.get(
  '/example-schema',
  getSQLSchema,
  (req, res, next) => {
    // If we're using mock data, skip formatGraphData since it's already in the correct format
    if (res.locals.SQLSchema && typeof res.locals.SQLSchema === 'object' && !Array.isArray(res.locals.SQLSchema)) {
      console.log('Using mock data, skipping formatGraphData');
      return next();
    }
    return formatGraphData(req, res, next);
  },
  createGQLSchema,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

/* Route for example SQL Schema */
router.get('/example-schema-json', getSQLSchema, (req, res) => {
  res.status(200).json(res.locals.SQLSchema);
});

/* Route to get user db schema */
router.post(
  '/sql-schema',
  getSQLSchema,
  createGQLSchema,
  formatGraphData,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

router.use(
  '/playground',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

module.exports = router;
