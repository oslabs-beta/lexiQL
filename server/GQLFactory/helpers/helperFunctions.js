const isJunctionTable = (foreignKeys, columns) => {
  if (!foreignKeys) return false;
  return Object.keys(foreignKeys).length + 1 === Object.keys(columns).length;
};

const setType = (str) => {
  switch (str) {
    case 'character varying':
      return 'String';
    case 'character':
      return 'String';
    case 'integer':
      return 'Int';
    case 'bigint':
      return 'String';
    case 'text':
      return 'String';
    case 'date':
      return 'String';
    case 'boolean':
      return 'Boolean';
    default:
      return 'String';
  }
};

const typeConversion = {
  'character varying': 'String',
  character: 'String',
  integer: 'Int',
  text: 'String',
  date: 'String',
  boolean: 'Boolean',
  numeric: 'Int',
  bigint: 'String',
};

module.exports = {
  isJunctionTable,
  setType,
  typeConversion,
};
