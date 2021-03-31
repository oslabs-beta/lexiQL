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
resolverFactory.collectMutations = (tableName, tableData) => {
  const { primaryKey, columns } = tableData;
  const createMutation = resolverHelper.createMutation(
    tableName,
    primaryKey,
    columns
  );
  const updateMutation = resolverHelper.updateMutation(
    tableName,
    primaryKey,
    columns
  );
  const deleteMutation = resolverHelper.deleteMutation(tableName, primaryKey);
  return `${createMutation}\n${updateMutation}\n${deleteMutation}`;
};
/* ------------------------------------ */
resolverFactory.collectCustomObjectRelationships = () => {};

module.exports = resolverFactory;
