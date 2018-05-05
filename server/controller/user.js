const user_model = require('../models/user');

const login = async (ctx, next) => {
  const form = ctx.request.body;
  const username = form.username;
  const password = form.password;
  
}

module.exports = {
  login: login
}