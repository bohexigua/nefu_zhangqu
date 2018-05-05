const client = require("./mysql");

const checkUsername = async (username) => {
  await client.startTransaction();
  const sql = 'select * from news order by news_date desc Limit 0,6'
  const res = await client.executeTransaction(sql, []);
  await client.stopTransaction();
  return res;
}

const setUserInfo = async (username, password) => {     // 取新闻
  await client.startTransaction();
  const sql = 'select * from news order by news_date desc Limit 0,6'
  const res = await client.executeTransaction(sql, []);
  await client.stopTransaction();
  return res;
}

module.exports = {
  setUserInfo: setUserInfo,
  checkUsername: checkUsername
}