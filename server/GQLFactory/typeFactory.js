const setType = require('./helpers/helperFunctions');
const { mutationsHelper, customHelper } = require('./helpers/typeHelpers');

const typeFactory = {};

typeFactory.queries = () => {};

typeFactory.mutations = (tableName, tableData) => {
  const { primaryKey, foreignKeys, columns } = tableData;

  return (
    mutationsHelper.create(tableName, primaryKey, foreignKeys, columns) +
    mutationsHelper.update(tableName, primaryKey, foreignKeys, columns) +
    mutationsHelper.delete(tableName, primaryKey)
  );
};

typeFactory.customObjects = () => {};

module.exports = typeFactory;
