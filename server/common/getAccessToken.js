const request = require('request');

const APIKey = 'zm4WEwQGEjUL2oUrVlgiWSnD';
const secretKey = '6FawiNRKOWNS93z1dm2XM739rYufiVSD';
const grantType = 'client_credentials';
let baseURL = 'https://aip.baidubce.com/oauth/2.0/token?';
baseURL += 'grant_type=' + grantType;
baseURL += '&client_id=' + APIKey;
baseURL += '&client_secret=' + secretKey

const getAccessToken = () => {
  return new Promise((resolve, reject) => {
    request({
      url: baseURL,
      method: "GET"
    }, (error, response, body) => {
      if (error) {
        console.log('getAccessToken request error!');
        reject(error);
      }
      const res = JSON.parse(body);
      resolve(res.access_token);
    });
  });
}

module.exports = getAccessToken;