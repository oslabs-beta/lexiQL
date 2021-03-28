const isJoinTable = require('./helperfunctions');


const resolverFactory = {};

resolverFactory.collectQueries = () => {};

resolverFactory.queryByPrimaryKey = () => {};

resolverFactory.queryAll = () => {};
/* -------------------------------- */

resolverFactory.collectMutations = () => {};

resolverFactory.createMutation = () => {};

resolverFactory.updateMutation = () => {};

resolverFactory.deleteMutation = () => {};
/* ------------------------------------ */

resolverFactory.collectCustomObjectRelationships = () => {};

resolverFactory.identifyRelationships = () => {};

resolverFactory.oneToOne = () => {};

resolverFactory.oneToMany = () => {};

resolverFactory.manyToMany = () => {};

resolverFactory.checkForeignKeys = () => {};

module.exports = resolverFactory;