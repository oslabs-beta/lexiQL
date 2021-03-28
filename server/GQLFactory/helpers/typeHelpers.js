const toCamelCase = require("camelcase");
const { singular } = require("pluralize");
const { pascalCase } = require("pascal-case");

/*   Functions facilitating creation of mutation types */
const mutationsHelper = {};

mutationsHelper.paramType = () => {};

mutationsHelper.create = () => {};

mutationsHelper.delete = () => {};

mutationsHelper.update = () => {};

/*   Functions facilitating creation of custom types */
const customHelper = {};

customHelper.getFields = () => {};

customHelper.getRelationships = () => {};

module.exports = {
  mutationsHelper,
  customHelper,
};
