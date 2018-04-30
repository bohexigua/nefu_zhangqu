const getNefuNews = require('../common/getNefuNews');
const news_models = require('../models/news');
const map_models = require('../models/map');

// getNefuNews();
//  每隔 6 小时自动去爬去一次
const interval = 1000 * 60 * 60 * 6;
setInterval(getNefuNews, interval);

const getNewsTest = async (ctx, next) => {
	getNefuNews();
}

const getNews = async (ctx, next) => {
	const news = await news_models.getNews();
	const result = { success: true };
	if (news.length) {
		result.news = news;
	} else {
		result.success = false;
	}
	ctx.response.body = JSON.stringify(result);
}

const getMapInfos = async (ctx, next) => {
	const mapInfos = await map_models.getMapInfos();
	const result = { success: true };
	if (mapInfos.length) {
		result.mapInfos = mapInfos;
	} else {
		result.success = false;
	}
	ctx.response.body = JSON.stringify(result);
}

module.exports = {
	getNews: getNews,
	getMapInfos: getMapInfos,
	getNewsTest: getNewsTest
}