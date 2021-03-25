const express = require('express');
const router = express.Router();
const SQLController = require('./controllers/SQLController');
const GQLController = require('./controllers/GQLController');

/* Route for example SQL Schema */
router.get('/example-schema', SQLController.getSQLSchema,
 (req, res) => {res.status(200).json(res.locals.SQLSchema)
});

/* Route to get user db schema */
router.post('/sql-schema', SQLController.getSQLSchema,
(req, res) => {res.status(200).json(res.locals.SQLSchema)
});

/* Route to get user (table specific) GraphQL Schema and Resolvers */
router.post('gql-schema', GQLController.createGQLSchema,
(req, res) => {res.status(200).json(res.locals.GQLSchema)
});


module.exports = router;