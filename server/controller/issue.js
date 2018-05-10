const issue_models = require('../models/issue');
const praise_models = require('../models/praise');
const issuePv_models = require('../models/issuePv');
const comment_models = require('../models/comment');
const util = require('../common/util');
const getSimnet = require('../common/issueSimnet');

const recallIssue = async (session) => {
  const result = [];
  const issueNoLogin = await issue_models.getIssueNoLogin();
  if (session) {                                  // 已登录
    const username = session.user_no;
    const issuePv = await issue_models.get3IssuePv(username);
    for (let i = 0; i < issuePv.length; i++) {
      let item = issuePv[i];
      result.push({
        content: util.delHtmlTag(item.issue_content)
      });
    }
  }
  for (let i = result.length; i < 3; i++) {
    let item = issueNoLogin[i];
    result.push({
      content: util.delHtmlTag(item.issue_content)
    });
  }
  let resText = '';
  for (let i = 0; i < 3; i++) {
    resText += result[i].content;
  }
  return resText;
}

const sortIssue = async (issueInfo, session) => {
  const text1 = await recallIssue(session);
  for (let i = 0; i < issueInfo.length; i++) {
    let item = issueInfo[i];
    let text2 = item.issue_content;
    const res = await getSimnet(text1, text2);
    issueInfo[i].score = res.score;
  }
  issueInfo.sort((a, b) => {
    return a.score > b.score;
  })
  return issueInfo;
}

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
  const issueInfo = await issue_models.getIssue(12);
  const result = { success: true }
  if (!issueInfo.length) {
    result.success = false;
    result.reason = '暂无动态，请刷新重试';
    ctx.response.body = JSON.stringify(result);
    return;
  }
  result.lastDate = issueInfo[issueInfo.length - 1].issue_date;
  console.log(sortIssue(issueInfo, session));
  // result.data = sortIssue(issueInfo, session).splice(0, 10);
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

const searchIssue = async (ctx, next) => {
  const form = ctx.request.body;
  const keyWord = form.keyWord;
  const res = await issue_models.searchIssue(keyWord);
  const result = { success: true };
  if (!res.length) {
    result.success = false;
    result.reason = '对不起，没有查询到相关记录';
  } else {
    result.data = res;
  }
  ctx.response.body = JSON.stringify(result);
}

module.exports = {
  setIssue: setIssue,
  getIssue: getIssue,
  addPraise: addPraise,
  addIssuePv: addIssuePv,
  getComment: getComment,
  addComment: addComment,
  searchIssue: searchIssue,
  recallIssue: recallIssue
}