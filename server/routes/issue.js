const router = require('koa-router')()
const issue = require('../controller/issue')

router.prefix('/issue')

router.post('/setIssue', issue.setIssue)

router.get('/getIssue', issue.getIssue)

router.post('/addPraise', issue.addPraise)

module.exports = router
