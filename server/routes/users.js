const router = require('koa-router')()
const user = require('../controller/user')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/login', user.login)

router.post('/getSession', user.getSession)

router.post('/logout', user.logout)

module.exports = router
