const issue_models = require('../models/issue');

const setIssue = async (ctx, next) => {
  const form = ctx.request.body;
  const username = form.username;
  const content = form.content;
  const anonymous = form.anonymous;
  const res = await issue_models.setIssue(username, content, anonymous);
  const result = { success: true }
  if (!res.affectedRows) {
    result.success = false;
    result.reason = '发表动态失败，请稍后再试';
  }
  ctx.response.body = JSON.stringify(result);
}

const getIssue = async (ctx, next) => {
  const session = ctx.session.user;
  const issueInfo = await issue_models.getIssue();
  const result = { success: true }
  if (!issueInfo.length) {
    result.success = false;
    result.reason = '暂无动态，请刷新重试';
  }
  result.data = issueInfo;
  ctx.response.body = JSON.stringify(result);
}

module.exports = {
  setIssue: setIssue,
  getIssue: getIssue
}