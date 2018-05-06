const user_model = require('../models/user');

const login = async (ctx, next) => {
  const form = ctx.request.body;
  const username = form.username;
  const password = form.password;
  const checkRes = await user_model.checkUsername(username);
  const result = { success: true };
  if (!checkRes.length) {
    result.success = false;
    result.reason = '你不是本校师生（新入学的2017级信息暂未录入，敬请期待）';
    ctx.response.body = JSON.stringify(result);
    return;
  }
  const checkLogin = await user_model.getUserInfo(username, password);
  if (!checkLogin.length) {
    result.success = false;
    result.reason = '密码输入错误，请重新输入！';
    ctx.response.body = JSON.stringify(result);
    return;
  }
  result.data = checkLogin[0];
  if (result.data.user_sex === 1) result.data.user_sex = '女';
  else result.data.user_sex = '男';
  ctx.session.user = result.data;
  ctx.session.user.success = result.success;
  ctx.response.body = JSON.stringify(result);
}

const getSession = async (ctx, next) => {
  const result = { success: true };
  const session = ctx.session.user;
  if (session && !session.success) {
    result.success = false;
    result.reason = '您尚未登录或登录失效，请重新登录';
    ctx.response.body = JSON.stringify(result);
    return;
  }
  result.data = session;
  ctx.response.body = JSON.stringify(result);
}

const logout = async (ctx, next) => {
  ctx.session.user = {};
  ctx.response.body = JSON.stringify({
    success: true
  });
}

module.exports = {
  login: login,
  getSession: getSession,
  logout: logout
}