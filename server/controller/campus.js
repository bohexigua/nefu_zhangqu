const getNefuNews = require('../common/getNefuNews');
const news_models = require('../models/news');

// getNefuNews();
//  每隔 6 小时自动去爬去一次
// const interval = 1000 * 60 * 60 * 6;
// setInterval(getNefuNews, interval);

const getNews = async (ctx, next) => {
	const news = await news_models.getNews();
	ctx.response.body = JSON.stringify(result);
}

module.exports = {
	getNews: getNews
}