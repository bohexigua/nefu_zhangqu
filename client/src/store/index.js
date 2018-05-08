/**
 * Created by orange on 2017/8/13.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
			count:0,
			newsArr:[],
			mapInfos: [],
			campusNews: [],
			session: {},
			myMenuList: [{
				name: '登录',
				link: '/login',
				icon: 'icon-login'
			}, {
				name: '完善／修改个人资料',
				link: '/update',
				icon: 'icon-update'
			}, {
				name: '匿名／实名交流',
				link: '/issue',
				icon: 'icon-issue'
			}, {
				name: '退出',
				link: '/my',
				icon: 'icon-exit'
			}]
    },
    //使用处进行 commit
		mutations,
		actions,
    getters: {
			nowTime(state) {
				return new Date() - 0 + '-' + state.count;
			},
			getNewsArr(state) {
				return state.newsArr;
			}
    }
});
export default store;
