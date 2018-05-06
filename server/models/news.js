const client = require("./mysql");

const setNews = async (news) => {      // 插入新闻
  await client.startTransaction();
  let sql = 'insert ignore into news (news_id, news_title, news_link, news_date, news_pic)';
  for (let i = 0; i < news.length; i++) {
    let item = news[i];
    sql += ' select '
    sql += 'null, "' + item.title + '", "' + item.link + '", "' + item.time + '", "' + (item.img || '') + '"';
    if (i !== news.length - 1) {
      sql += ' union';
    }
  }
  const res = await client.executeTransaction(sql, []);
  await client.stopTransaction();
  return res;
}

const getNews = async () => {     // 取新闻
  await client.startTransaction();
  const sql = 'select * from news order by news_date desc, news_pic desc Limit 0,6'
  const res = await client.executeTransaction(sql, []);
  await client.stopTransaction();
  return res;
}

module.exports = {
  setNews: setNews,
  getNews: getNews
}