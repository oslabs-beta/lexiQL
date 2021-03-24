const express = require('express');
const { ModuleFilenameHelpers } = require('webpack');
const router = express.Router();
const SQLController = require('./controllers/SQLController');

/* Route for SQL Schema */
router.get('/sql-schema', SQLController.getSQLSchema,
 (req, res) => {res.status(200).json(res.locals.SQLSchema)
})

/* Route  */

module.exports = router;