const cheerio = require('cheerio');
const request = require('request');
const news_models = require('../models/news');

const baseURL = 'http://news.nefu.edu.cn/';

const getNefuNews = () => {
	return new Promise((resolve, reject) => {
		request(baseURL, (error, response, body) => {
			if (error) {
				reject(error);
			}
			$ = cheerio.load(body);
			$firstNews = $('.m-txt1');
			$newsList = $('.ul-txt1');
			const firstItem = {										// 单独处理头条
				title: $firstNews.children('.txt').children('h4').children('a').text(),
				link: baseURL + $firstNews.children('.txt').children('h4').children('a').attr('href'),
				time: $firstNews.children('.txt').children('.date').text(),
				img: baseURL + $firstNews.children('.pic').children('a').children('img').attr('src')
			};
			const result = [];
			result.push(firstItem);
			const newsLen = $newsList.children().length;
			for (let i = 0; i < newsLen; i++) {
				let $item = $newsList.children().eq(i);
				let time = $item.children('span').text();
				let link = $item.children('a').attr('href');
				let title = $item.children('a').text();
				result.push({
					time: time,
					link: baseURL + link,
					title: title
				});
			}
			resolve(result);
		});
	});
}

const run = () => {
	getNefuNews()
	.then(res => {
		news_models.setNews(res);
	})
}

module.exports = run;