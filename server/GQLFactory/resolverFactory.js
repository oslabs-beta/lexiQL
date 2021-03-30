const isJunctionTable = require('./helpers/helperFunctions');
const resolverHelper = require('./helpers/resolverHelpers');

const resolverFactory = {};

resolverFactory.collectQueries = () => {};
/* -------------------------------- */
resolverFactory.collectMutations = () => {};
/* ------------------------------------ */
resolverFactory.collectCustomObjectRelationships = () => {};

module.exports = resolverFactory;
