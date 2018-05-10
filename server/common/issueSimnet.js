const request = require('request');
const getAccessToken = require('./getAccessToken');

let baseURL = 'https://aip.baidubce.com/rpc/2.0/nlp/v2/simnet?';

const requestSimnet = (text1, text2, accessToken) => {
  return new Promise((resolve, reject) => {
    request({
      url: baseURL + 'access_token=' + accessToken,
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text_1: text1,
        text_2: text2
      })
    }, async (error, response, body) => {
      if (error) {
        console.log('getFace request error!');
        reject(error);
      }
      const res = JSON.parse(body);
      resolve(res);
    });
  });
}

const getSimnet = (text1, text2) => {
  return getAccessToken('language')
  .then(accessToken => {
    return requestSimnet(text1, text2, accessToken);
  });
}

module.exports = getSimnet;