const router = require('koa-router')()
const campus = require('../controller/find')

router.prefix('/find')

module.exports = router
