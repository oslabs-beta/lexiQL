const toCamelCase = require('camelcase');
const { singular } = require('pluralize');
const { pascalCase } = require('pascal-case');

const resolverHelper = {};

/* */

resolverHelper.queryByPrimaryKey = (tableName, primaryKey) => {
  let queryName = '';
  if (tableName === singular(tableName)) {
    queryName += `${singular(tableName)}` + `ByID`;
  } else queryName = singular(tableName);

  return `
    ${queryName}: (parent, args) => {
      const query = 'SELECT * FROM ${tableName} WHERE ${primaryKey} = $1';
      const values = [args.${primaryKey}];
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },`;
};

resolverHelper.queryAll = (tableName) => {
  return `
    ${tableName}: () => {
      const query = 'SELECT * FROM ${tableName}';
      return db.query(query)
        .then(data => data.rows)
        .catch(err => new Error(err));
    },`;
};

/* */

resolverHelper.createMutation = () => {};

resolverHelper.updateMutation = () => {};

resolverHelper.deleteMutation = () => {};

/* */

resolverHelper.identifyRelationships = () => {};

resolverHelper.oneToOne = () => {};

resolverHelper.oneToMany = () => {};

resolverHelper.manyToMany = () => {};

resolverHelper.checkForeignKeys = () => {};

module.exports = resolverHelper;
