const client = require("./mysql");

const setIssue = async (username, content, anonymous) => {     
  await client.startTransaction();
  const sql = 'INSERT INTO issue (issue_id, issue_content, issue_anonymous, issue_user) VALUES (null, ?, ?, ?)';
  const res = await client.executeTransaction(sql, [content, anonymous, username]);
  await client.stopTransaction();
  return res;
}

module.exports = {
  setIssue: setIssue
}