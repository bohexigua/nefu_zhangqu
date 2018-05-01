const router = require('koa-router')()
const campus = require('../controller/campus')
const find = require('../controller/find')

router.get('/getNewsTest', campus.getNewsTest)

router.get('/getAccessTokenTest', find.getAccessTokenTest)

router.get('/createUserGroupTest', find.createUserGroupTest)

router.get('/registerFaceTest', find.registerFaceTest)

router.get('/getFaceTest', find.getFaceTest)

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
