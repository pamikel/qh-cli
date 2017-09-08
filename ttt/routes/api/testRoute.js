const express = require('express')
const router = express.Router()
const responseWrap = require('../../util/responseWrap')
const tokenToUser = require('../../util/tokenToUser')
const testController = require('../../controller/testController')

router.get('/', tokenToUser,responseWrap(testController.testApi))

module.exports = router
