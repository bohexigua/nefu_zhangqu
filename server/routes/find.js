const router = require('koa-router')()
const find = require('../controller/find')

router.prefix('/find')

router.post('/recallFace', find.recallFace)

module.exports = router
