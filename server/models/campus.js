const client = require("./mysql");

const getUserByNo = async (userNo) => {     // 取地图信息
  await client.startTransaction();
  const sql = 'select * from campus_info where user_no = ?';
  const res = await client.executeTransaction(sql, [userNo]);
  await client.stopTransaction();
  return res;
}

module.exports = {
  getUserByNo: getUserByNo
}