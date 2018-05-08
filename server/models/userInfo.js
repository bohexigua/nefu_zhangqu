const client = require("./mysql");

const updateUserInfo = async (username, password, telephone, email) => {
  await client.startTransaction();
  const sql1 = 'UPDATE user SET user_pwd = ? WHERE user_name = ?'
  const res1 = await client.executeTransaction(sql1, [password, username]);
  const sql2 = 'replace into user_info(`user_no`, `user_phone`, `user_mail`)  VALUES (?, ?, ?);'
  const res2 = await client.executeTransaction(sql2, [username, telephone, email]);
  await client.stopTransaction();
  return {
    res1: res1,
    res2: res2
  };
}

module.exports = {
  updateUserInfo: updateUserInfo
}