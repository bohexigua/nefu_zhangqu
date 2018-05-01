const request = require('request');
const getAccessToken = require('./getAccessToken');

let baseURL = 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/group/add?';

const createUserGroup = async () => {
  return getAccessToken()
  .then(accessToken => {
    request({
      url: baseURL + 'access_token=' + accessToken,
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({
        group_id: 'nefu_0'
      })
    }, (error, response, body) => {
      if (error) {
        console.log('createUserGroup request error!');
        reject(error);
      }
      const res = JSON.parse(body);
      resolve(res);
    });
  });
}

module.exports = createUserGroup;