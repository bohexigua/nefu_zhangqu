const client = require("./mysql");

const setIssuePv = async (username, issueID) => {     
  await client.startTransaction();
  const sql1 = 'select * from issue_pv where pv_user = ? and pv_issue = ?';
  const res1 = await client.executeTransaction(sql1, [username, issueID]);
  let pvNum = 1;
  let pvID;
  if (res1.length) {
    pvNum = res1[0].pv_num + 1;
    pvID = res1[0].pv_id;
  }
  const sql2 = 'replace into issue_pv (pv_id, pv_issue, pv_user, pv_num) values (?, ?, ?, ?)';
  const res2 = await client.executeTransaction(sql2, [pvID, issueID, username, pvNum]);
  await client.stopTransaction();
  return res2;
}

module.exports = {
  setIssuePv: setIssuePv
}