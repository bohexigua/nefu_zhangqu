const router = require('koa-router')()
const campus = require('../controller/campus')

router.prefix('/campus')

router.get('/getNews', campus.getNews)

router.get('/getMapInfos', campus.getMapInfos)

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
