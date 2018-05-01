const client = require("./mysql");

const setFaceInfo = async (userNo, faceToken) => {     // 取地图信息
  await client.startTransaction();
  const sql = 'INSERT INTO face (face_id, user_no, face_token) VALUES (null, ?, ?)';
  const res = await client.executeTransaction(sql, [userNo, faceToken]);
  await client.stopTransaction();
  return res;
}

module.exports = {
  setFaceInfo: setFaceInfo
}