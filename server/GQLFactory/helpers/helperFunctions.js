// for future uri validation
// const validateURIFormat = (uri) => {
//     return uri.slice(0, 12).includes('postgres://');
//   };

const isJoinTable = (foreignKeys, columns) => {
  return Object.keys(foreignKeys).length + 1 === Object.keys(columns).length;
};

// to add more PSQL types
const setType = (str) => {
  switch (str) {
    case "character varying":
      return "String";
    case "character":
      return "String";
    case "integer":
      return "Int";
    case "text":
      return "String";
    case "date":
      return "String";
    case "boolean":
      return "Boolean";
    default:
      return "Int";
  }
};

// to add more PSQL types
const typeConversion = {
  "character varying": "String",
  character: "String",
  integer: "Int",
  text: "String",
  date: "String",
  boolean: "Boolean",
  numeric: "Int",
};

module.exports = {
  isJoinTable,
  setType,
  typeConversion,
};
