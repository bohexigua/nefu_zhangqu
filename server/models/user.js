const client = require("./mysql");

const checkUsername = async (username) => {
  await client.startTransaction();
  const sql = 'select * from campus_info where user_no = ?'
  const res = await client.executeTransaction(sql, [username]);
  await client.stopTransaction();
  return res;
}

const setUserInfo = async (username, password) => {     
  await client.startTransaction();
  const sql = 'select * from news order by news_date desc Limit 0,6'
  const res = await client.executeTransaction(sql, []);
  await client.stopTransaction();
  return res;
}

const getUserInfo = async (username, password) => {
  await client.startTransaction();
  const sql1 = 'insert into user(user_name) select user_no from campus_info where not exists(select * from user where user_name = ?) and user_no = ?;';
  await client.executeTransaction(sql1, [username, username]);
  const sql2 = 'select c.user_no, c.user_name, c.user_sex, c.user_college, c.user_img, ui.user_phone, ui.user_mail from user u, campus_info c left join user_info ui on ui.user_no = c.user_no where u.user_name = ? and u.user_pwd = ? and c.user_no = ?';
  const res = await client.executeTransaction(sql2, [username, password, username]);
  await client.stopTransaction();
  return res;
} 

module.exports = {
  setUserInfo: setUserInfo,
  checkUsername: checkUsername,
  getUserInfo: getUserInfo
}