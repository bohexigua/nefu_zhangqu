const issue_models = require('../models/issue');
const praise_models = require('../models/praise');
const issuePv_models = require('../models/issuePv');
const comment_models = require('../models/comment');

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

const addPraise = async (ctx, next) => {
  const session = ctx.session.user;
  const form = ctx.request.body;
  const issueID = form.issueID;
  const username = session.user_no;
  const exitRes = await praise_models.exitPraise(username, issueID);
  const result = { success: true };
  if (exitRes.length) {
    result.success = false;
    result.reason = '你已经点过赞了，不能重复点赞';
  } else {
    const addRes = await praise_models.addPraise(username, issueID);
    if (!addRes.affectedRows) {
      result.success = false;
      result.reason = '发表动态失败，请稍后再试';
    }
  }
  ctx.response.body = JSON.stringify(result);
}

const addIssuePv = async (ctx, next) => {
  const result = { success: true };
  if (!ctx.session.user) {
    result.success = false;
    result.reason = '用户未登录，无法统计 pv';
    ctx.response.body = JSON.stringify(result);
    return;
  }
  const session = ctx.session.user;
  const issueID = ctx.request.query.issueID;
  const username = session.user_no;
  const res = await issuePv_models.setIssuePv(username, issueID);
  if (!res.affectedRows) {
    result.success = false;
    result.reason = '未知错误，无法统计 pv';
  }
  ctx.response.body = JSON.stringify(result);
}

const getComment = async (ctx, next) => {
  const issueID = ctx.request.query.issueID;
  const res = await comment_models.getComment(issueID);
  const result = { success: true }
  result.data = res;
  ctx.response.body = JSON.stringify(result);
}

const addComment = async (ctx, next) => {
  const result = { success: true };  
  if (!ctx.session.user) {
    result.success = false;
    result.code = 2088;
    result.reason = '用户未登录，请登录后再评论';
    ctx.response.body = JSON.stringify(result);
    return;
  }
  const form = ctx.request.body;
  const session = ctx.session.user;
  const username = session.user_no;
  const issueID = form.issueID;
  const content = form.content;
  const res = await comment_models.setComment(issueID, username, content);
  if (!res.affectedRows) {
    result.success = false;
    result.reason = '添加评论失败，请稍后再试';
  }
  ctx.response.body = JSON.stringify(result);
}

module.exports = {
  setIssue: setIssue,
  getIssue: getIssue,
  addPraise: addPraise,
  addIssuePv: addIssuePv,
  getComment: getComment,
  addComment: addComment
}