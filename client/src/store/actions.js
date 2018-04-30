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
  }
}