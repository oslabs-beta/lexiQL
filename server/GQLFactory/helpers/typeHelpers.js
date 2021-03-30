const { singular } = require('pluralize');
const { pascalCase } = require('pascal-case');
const { typeConversion } = require('./helperFunctions');

/*   Functions facilitating creation of mutation types */
const mutationsHelper = {};

mutationsHelper.paramType = () => {};

mutationsHelper.create = () => {};

mutationsHelper.delete = () => {};

mutationsHelper.update = () => {};

/*   Functions facilitating creation of custom types */
const customHelper = {};
/*  Loops through SQL columns getting their name as fieldName, type, and isNullable to be returned as fields */
customHelper.getFields = (primaryKey, foreignKeys, columns) => {
  let fields = ``;

  for (const fieldName of Object.keys(columns)) {
    if (!(foreignKeys && foreignKeys[fieldName]) && fieldName !== primaryKey) {
      const { dataType, columnDefault, isNullable } = columns[fieldName];
      fields += `\n${fieldName}: ${typeConversion[dataType]}`;
      if (isNullable === 'NO' && columnDefault === null) fields += `!`;
    }
  }
  return fields;
};

customHelper.getRelationships = (tableName, sqlSchema) => {
  let relationshipFields = ``;
  const tableData = sqlSchema[tableName];
  const { foreignKeys, referencedBy } = tableData;

  if (foreignKeys) {
    for (const fk of Object.keys(foreignKeys)) {
      console.log('RELATIONSHIP FIELDS:', relationshipFields);
      relationshipFields += `\n${foreignKeys[fk].referenceTable}: [${pascalCase(
        singular(foreignKeys[fk].referenceTable)
      )}]`;
    }
  }
  if (referencedBy) {
    for (const refTableName of Object.keys(referencedBy)) {
      const { foreignKeys } = sqlSchema[refTableName];
      for (const foreignFK of Object.keys(foreignKeys)) {
        if (foreignKeys[foreignFK].referenceTable !== tableName) {
          relationshipFields += `\n${
            foreignKeys[foreignFK].referenceTable
          }: [${pascalCase(singular(foreignKeys[foreignFK].referenceTable))}]`;
        }
      }
    }
  }
  return relationshipFields;
};

module.exports = {
  mutationsHelper,
  customHelper,
};
