const cors = require('cors')
const {corsOrigin} = require('../config/resource')

module.exports = cors({origin:true,credentials:true})