import axios from 'axios'
import { requestURL } from '../common/config'

export const ajax = (url, data = {}, method = 'get', config = {}) => {
  return axios({
    method: method,
    url: requestURL + url,
    data: data
  });
}