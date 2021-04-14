const express = require('express');
const router = express.Router();
const { graphqlHTTP } = require('express-graphql');
const {
  getSQLSchema,
  formatGraphData,
} = require('./controllers/SQLController');
const { createGQLSchema } = require('./controllers/GQLController');
const schema = require('./schema');

/* Route for example SQL Schema and example GQL Schema */
router.get(
  '/example-schema',
  getSQLSchema,
  createGQLSchema,
  formatGraphData,
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

/* Route to get user (table specific) GraphQL Schema and Resolvers */
// router.post('gql-schema', GQLController.createGQLSchema,
// (req, res) => {res.status(200).json(res.locals.GQLSchema)
// });

module.exports = router;
