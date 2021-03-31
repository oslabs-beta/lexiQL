const toCamelCase = require('camelcase');
const { singular } = require('pluralize');
const { pascalCase } = require('pascal-case');

const resolverHelper = {};

/* */

resolverHelper.queryByPrimaryKey = () => {};

resolverHelper.queryAll = () => {};

/* */

resolverHelper.createMutation = (tableName, primaryKey, columns) => {
  const mutationName = toCamelCase('add_' + singular(tableName));
  const columnsArray = Object.keys(columns).filter(
    (column) => column !== primaryKey
  );
  const columnsArgument = columnsArray.join(', ');
  const valuesArgument = columnsArray
    .map((column, i) => `$${i + 1}`)
    .join(', ');
  const valuesList = columnsArray.map((column) => `args.${column}`).join(', ');

  return `
	${mutationName}: (parent, args) => {
	  const query = 'INSERT INTO ${tableName} (${columnsArgument}) VALUES (${valuesArgument}) RETURNING *';
	  const values = [${valuesList}];
	  return db.query(query, values)
	    .then(data => data.rows[0])
	    .catch(err => new Error(err));
	},`;
};

resolverHelper.updateMutation = (tableName, primaryKey, columns) => {
  const mutationName = toCamelCase('update_' + singular(tableName));
  const columnsArray = Object.keys(columns).filter(
    (column) => column != primaryKey
  );
  const setStatement = columnsArray
    .map((column, i) => `${column} = $${i + 1}`)
    .join(', ');
  const valuesList = [
    columnsArray.map((column) => `args.${column}`).join(', ') +
      `, args.${primaryKey}`,
  ];
  const primaryKeyArgument = `$${columnsArray.length + 1}`;

  return `
	${mutationName}: (parent, args) => {
	  const query = 'UPDATE ${tableName} SET ${setStatement} WHERE ${primaryKey} = ${primaryKeyArgument} RETURNING *';
	  const values = [${valuesList}];
	  return db.query(query, values)
	    .then(data => data.rows[0])
	    .catch(err => new Error(err));
	},`;
};

resolverHelper.deleteMutation = (tableName, primaryKey) => {
  const mutationName = toCamelCase('delete_' + singular(tableName));

  return `
	${mutationName}: (parent, args) => {
	  const query = 'DELETE FROM ${tableName} WHERE ${primaryKey} = $1 RETURNING *';
	  const values = [args.${primaryKey}];
	  return db.query(query, values)
	    .then(data => data.rows[0])
	    .catch(err => new Error(err));
	},`;
};

/* */

resolverHelper.identifyRelationships = () => {};

resolverHelper.oneToOne = () => {};

resolverHelper.oneToMany = () => {};

resolverHelper.manyToMany = () => {};

resolverHelper.checkForeignKeys = () => {};

module.exports = resolverHelper;
