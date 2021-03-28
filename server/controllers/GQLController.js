const { createTypes, createResolvers} = require('../GQLFactory/schemaFactory');


const GQLController = {};

GQLController.createGQLSchema = (req, res, next) => {
const { SQLSchema } = req.body
console.log(SQLSchema)
/* Loop through each property(tablename) and for each one create types and resolvers*/
for(const tableName in SQLSchema) {
    const tableData = SQLSchema[tableName];
    createTypes(tableName, tableData)
} 
};

module.exports = GQLController;