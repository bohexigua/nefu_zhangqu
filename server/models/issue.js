const client = require("./mysql");

const setIssue = async (username, content, anonymous) => {     
  await client.startTransaction();
  const sql = 'INSERT INTO issue (issue_id, issue_content, issue_anonymous, issue_user, issue_date) VALUES (null, ?, ?, ?, now())';
  const res = await client.executeTransaction(sql, [content, anonymous, username]);
  await client.stopTransaction();
  return res;
}

const getIssue = async (time = '2010-01-01', num = 15) => {                                  // 暂未加入推荐
  await client.startTransaction();
  const sql = 'select i.*, ci.user_name, ci.user_sex, ci.user_college, count(p.praise_id) as issue_praise from issue as i \
    left join campus_info as ci on i.issue_user = ci.user_no \
    left join praise as p on p.issue_id = i.issue_id \
    where i.issue_date > ? \
    group by i.issue_id, ci.user_name, ci.user_sex, ci.user_college \
    order by i.issue_date desc \
    limit ?';
  const res = await client.executeTransaction(sql, [time, num]);
  await client.stopTransaction();
  return res;
}

const searchIssue = async (keyWord) => {
  await client.startTransaction();
  const sql = 'select i.*, ci.user_name, ci.user_sex, ci.user_college, count(p.praise_id) as issue_praise from issue as i \
    left join campus_info as ci on i.issue_user = ci.user_no \
    left join praise as p on p.issue_id = i.issue_id \
    where i.issue_content like "%' + keyWord + '%" \
    group by i.issue_id, ci.user_name, ci.user_sex, ci.user_college \
    order by i.issue_date desc';
  const res = await client.executeTransaction(sql, []);
  await client.stopTransaction();
  return res;
}

module.exports = {
  setIssue: setIssue,
  getIssue: getIssue,
  searchIssue: searchIssue
}