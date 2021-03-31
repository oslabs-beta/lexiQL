const isJunctionTable = require('./helpers/helperFunctions');
const resolverHelper = require('./helpers/resolverHelpers');
const resolverFactory = {};

resolverFactory.collectQueries = (tableName, tableData) => {
  const { primaryKey } = tableData;
  const queryByPK = resolverHelper.queryByPrimaryKey(tableName, primaryKey);
  const queryAll = resolverHelper.queryAll(tableName);
  return `\n${queryByPK}\n${queryAll}`;
};
/* -------------------------------- */
resolverFactory.collectMutations = () => {};
/* ------------------------------------ */
resolverFactory.collectCustomObjectRelationships = () => {};

module.exports = resolverFactory;
