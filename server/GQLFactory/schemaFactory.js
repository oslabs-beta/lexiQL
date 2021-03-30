const { queries, mutations, customObjects } = require('./typeFactory');
const {
  collectQueries,
  collectMutations,
  collectCustomObjectRelationships,
} = require('./resolverFactory');
const { isJunctionTable } = require('./helpers/helperFunctions');
/*    High level functions tasked with assembling the Types and the Resolvers */
schemaFactory = {};
/*  Creates query, mutation, and custom Object Types  */
schemaFactory.createTypes = (sqlSchema) => {
  let queryType = '';
  let mutationType = '';
  let customObjectType = '';

  for (const tableName of Object.keys(sqlSchema)) {
    const tableData = sqlSchema[tableName];
    const { foreignKeys, columns } = tableData;
    if (!isJunctionTable(foreignKeys, columns)) {
      queryType += queries(tableName, tableData);
      mutationType += mutations(tableName, tableData);
      customObjectType += customObjects(tableName, sqlSchema);
    }
  }

  const types =
    `${'const typeDefs = `\n' + '  type Query {\n'}${queryType}  }\n\n` +
    `  type Mutation {${mutationType}  }\n\n` +
    `${customObjectType}\`;\n\n`;

  return types;
};

schemaFactory.createResolvers = () => {};

module.exports = schemaFactory;
