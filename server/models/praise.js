const client = require("./mysql");

const exitPraise = async (username, issueID) => {
  await client.startTransaction();
  const sql = 'select * from praise where praise_user = ? and issue_id = ?'
  const res = await client.executeTransaction(sql, [username, issueID]);
  await client.stopTransaction();
  return res;
}

const addPraise = async (username, issueID) => {
  await client.startTransaction();
  const sql = 'insert into praise (praise_id, praise_user, issue_id) values (null, ?, ?)'
  const res = await client.executeTransaction(sql, [username, issueID]);
  await client.stopTransaction();
  return res;
}

module.exports = {
  addPraise: addPraise,
  exitPraise: exitPraise
}