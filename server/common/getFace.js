const request = require('request');
const getAccessToken = require('./getAccessToken');

const baseURL = 'https://aip.baidubce.com/rest/2.0/face/v3/search?';

const requestFace = (imageBase64, accessToken) => {
  return new Promise((resolve, reject) => {
    request({
      url: baseURL + 'access_token=' + accessToken,
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({
        image: imageBase64,
        image_type: 'BASE64',
        group_id_list: 'nefu_0',
        max_user_num: 4
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

const getFace = (imageBase64) => {
  return getAccessToken()
  .then(accessToken => {
    return requestFace(imageBase64, accessToken);
  });
}

module.exports = getFace;