const toCamelCase = require("camelcase");
const { singular } = require("pluralize");
const { pascalCase } = require("pascal-case");

const resolverHelper = {};

/* */

resolverHelper.queryByPrimaryKey = () => {};

resolverHelper.queryAll = () => {};

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
