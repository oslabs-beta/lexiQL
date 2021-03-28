const express = require('express');
const router = express.Router();
const { getSQLSchema } = require('./controllers/SQLController');
const { createGQLSchema } = require('./controllers/GQLController');

/* Route for example SQL Schema */
router.get('/example-schema', getSQLSchema,
 (req, res) => {res.status(200).json(res.locals.SQLSchema)
});

/* Route to get user db schema */
router.post('/sql-schema', getSQLSchema,
(req, res) => {res.status(200).json(res.locals.SQLSchema)
});

/* Route to get user (table specific) GraphQL Schema and Resolvers */
router.post('gql-schema', createGQLSchema,
(req, res) => {res.status(200).json(res.locals.GQLSchema)
});


module.exports = router;