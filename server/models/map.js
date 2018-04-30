const client = require("./mysql");

const getMapInfos = async () => {     // 取地图信息
  await client.startTransaction();
  const sql = 'select * from map'
  const res = await client.executeTransaction(sql, []);
  await client.stopTransaction();
  return res;
}

module.exports = {
  getMapInfos: getMapInfos
}