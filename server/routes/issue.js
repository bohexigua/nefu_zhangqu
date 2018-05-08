const router = require('koa-router')()
const issue = require('../controller/issue')

router.prefix('/issue')

router.post('/setIssue', issue.setIssue)

module.exports = router
