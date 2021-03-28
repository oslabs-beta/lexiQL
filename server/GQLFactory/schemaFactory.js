const { queries, mutations, customObjects } = require("./typeFactory");
const {
  collectQueries,
  collectMutations,
  collectCustomObjectRelationships,
} = require("./resolverFactory");
const isJoinTable = require("./helpers/helperFunctions");
/*    High level functions tasked with assembling the Types and the Resolvers */
schemaFactory = {};
/*  Creates query, mutation, and custom Object Types  */
schemaFactory.createTypes = (sqlSchema) => {};

schemaFactory.createResolvers = () => {};

module.exports = schemaFactory;
