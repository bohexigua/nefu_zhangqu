import { ajax } from '../common/request'

export default {
  getMapInfos(context) {
    ajax('/campus/getMapInfos')
    .then(res => {
      context.commit('updateMapInfos', res.data);
    });
  },
  getNews(context) {
    ajax('/campus/getNews')
    .then(res => {
      context.commit('updateNews', res.data);
    });
  },
  getUserInfo(context, { username, password }) {
    ajax('/users/login', {
      username: username,
      password: password
    }, 'POST')
    .then(res => {
      context.commit('updateSession', res.data);
    })
  },
  getSession(context) {          //   上来就请求一次登录态
    ajax('/users/getSession', {}, 'POST')
    .then(res => {
      context.commit('updateSession', res.data);
    })
  }
}