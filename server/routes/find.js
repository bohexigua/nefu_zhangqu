const router = require('koa-router')()
const find = require('../controller/find')
const koaBody = require('koa-body');

router.prefix('/find')

router.post('/recallFace', koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 300 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
  }
}), find.recallFace)

module.exports = router
