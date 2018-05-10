const client = require("./mysql");

const getComment = async (issueID) => {     
  await client.startTransaction();
  const sql = 'select c.*, ci.user_name, ci.user_college from comment c, campus_info ci where c.comment_user = ci.user_no and c.issue_id = ?';
  const res = await client.executeTransaction(sql, [issueID]);
  await client.stopTransaction();
  return res;
}

const setComment = async (issueID, username, content) => {
  await client.startTransaction();
  const sql = 'insert into comment (comment_id, issue_id, comment_user, comment_content) values (null, ?, ?, ?)';
  const res = await client.executeTransaction(sql, [issueID, username, content]);
  await client.stopTransaction();
  return res;
}

module.exports = {
  getComment: getComment,
  setComment: setComment
}