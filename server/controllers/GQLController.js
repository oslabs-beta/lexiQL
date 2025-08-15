const { createTypes, createResolvers } = require('../GQLFactory/schemaFactory');

const GQLController = {};

GQLController.createGQLSchema = (req, res, next) => {
  const { SQLSchema } = res.locals;

  console.log('GQLController: Creating schema from SQL data');
  console.log('SQLSchema type:', typeof SQLSchema);
  console.log('SQLSchema keys:', Object.keys(SQLSchema || {}));
  console.log('SQLSchema structure:', JSON.stringify(SQLSchema, null, 2));

  try {
    const types = createTypes(SQLSchema);
    const resolvers = createResolvers(SQLSchema);
    res.locals.GQLSchema = { types, resolvers };
    console.log('GQLController: Schema created successfully');
    return next();
  } catch (err) {
    console.error('GQLController error:', err);
    console.error('GQLController error stack:', err.stack);
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
