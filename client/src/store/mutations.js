/**
 * Created by orange on 2017/8/13.
 */

 export default {
    increment (state){
			state.count++;
    },
    decrement (state){
			state.count--;
    },
    addNewsArr(state,item){
			state.newsArr = item;
    },
    updateMapInfos(state, payload) {
			state.mapInfos = payload;
    },
    updateNews(state, payload) {
			let res = [];
			for(let i = 0; i < payload.news.length; i++) {
				let item = payload.news[i];
				res.push({
					title: item.news_title,
					date: item.news_date.substring(0, 10),
					link: item.news_link,
					pic: item.news_pic
				});
			}
			state.campusNews = res;
		},
		updateSession(state, payload) {
			state.session = payload.data;
			state.session.success = payload.success;
		}
}
