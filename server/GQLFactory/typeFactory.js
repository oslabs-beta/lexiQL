const { setType } = require('./helpers/helperFunctions');
const { mutationsHelper, customHelper } = require('./helpers/typeHelpers');
const { pascalCase } = require('pascal-case');
const toCamelCase = require('camelcase');
const { singular } = require('pluralize');

const typeFactory = {};

typeFactory.queries = (tableName, tableData) => {
  const { primaryKey, columns } = tableData;
  const singularName = singular(tableName);
  const pkType = setType(columns[primaryKey].dataType);
  let byID = toCamelCase(singularName);
  if (singularName === tableName) byID += 'ByID';
  return (
    `    ${toCamelCase(tableName)}: [${pascalCase(singularName)}!]!\n` +
    `    ${byID}(${primaryKey}: ${pkType}!): ${pascalCase(singularName)}!\n`
  );
};

typeFactory.mutations = (tableName, tableData) => {
  const { primaryKey, foreignKeys, columns } = tableData;

  return (
    mutationsHelper.create(tableName, primaryKey, foreignKeys, columns) +
    mutationsHelper.update(tableName, primaryKey, foreignKeys, columns) +
    mutationsHelper.delete(tableName, primaryKey)
  );
};

typeFactory.customObjects = (tableName, sqlSchema) => {
  const tableData = sqlSchema[tableName];
  const { primaryKey, foreignKeys, columns } = tableData;
  const pkType = setType(columns[primaryKey].dataType);

  return `${
    `  type ${pascalCase(singular(tableName))} {\n` +
    `${primaryKey}: ${pkType}!`
  }${customHelper.getFields(
    primaryKey,
    foreignKeys,
    columns
  )}${customHelper.getRelationships(tableName, sqlSchema)}\n  }\n\n`;
};

module.exports = typeFactory;
