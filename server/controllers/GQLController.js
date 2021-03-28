const { createTypes, createResolvers } = require('../GQLFactory/schemaFactory');

const GQLController = {};

GQLController.createGQLSchema = (req, res, next) => {
  const { SQLSchema } = res.locals;
  try {
    const types = createTypes(SQLSchema);
    const resolvers = createResolvers(SQLSchema);
    res.locals.GQLSchema = { types, resolvers };
    return next();
  } catch (err) {
    const errObject = {
      log: `Error in createGQLSchema: ${err}`,
      status: 400,
      message: {
        err: 'Unable to create GQL schema',
      },
    };
    return next(errObject);
  }
};

module.exports = GQLController;
