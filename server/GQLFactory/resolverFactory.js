const isJunctionTable = require('./helpers/helperFunctions');
const resolverHelper = require('./helpers/resolverHelpers');

const resolverFactory = {};

resolverFactory.collectQueries = () => {};
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
