const client = require("./mysql");

const setIssue = async (username, content, anonymous) => {     
  await client.startTransaction();
  const sql = 'INSERT INTO issue (issue_id, issue_content, issue_anonymous, issue_user, issue_date) VALUES (null, ?, ?, ?, now())';
  const res = await client.executeTransaction(sql, [content, anonymous, username]);
  await client.stopTransaction();
  return res;
}

const getIssue = async () => {
  await client.startTransaction();
  const sql = 'select * from issue';
  const res = await client.executeTransaction(sql, []);
  await client.stopTransaction();
  return res;
}

module.exports = {
  setIssue: setIssue,
  getIssue: getIssue
}