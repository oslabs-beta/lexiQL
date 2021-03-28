// for future uri validation
// const validateURIFormat = (uri) => {
//     return uri.slice(0, 12).includes('postgres://');
//   };

const isJoinTable = () => {};

const setType = () => {};

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
