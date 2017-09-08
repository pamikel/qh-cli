const express = require('express')
const router = express.Router()
const testRoute = require('./testRoute')

router.use('/professor', testRoute)
// router.use('/video', videoRoute)
// router.use('/wechat', wechatRoute)
// router.use('/room', roomRoute)
// router.use('/article', articleRoute)
// router.use('/shareConfig', shareConfigRoute)
// router.use('/class', classRoute)
// router.use('/tape', tapeRoute)

module.exports = router