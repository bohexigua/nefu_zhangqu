const request = require('request');
const config = require('./config');

const getAccessToken = (type = 'face') => {
  let APIKey;
  let secretKey;
  if (type === 'face') {
    APIKey = config.APIKey;
    secretKey = config.secretKey;
  } else if (type === 'language') {
    APIKey = config.languageAPIKey;
    secretKey = config.languageSecretKey;
  }
  const grantType = 'client_credentials';
  let baseURL = 'https://aip.baidubce.com/oauth/2.0/token?';
  baseURL += 'grant_type=' + grantType;
  baseURL += '&client_id=' + APIKey;
  baseURL += '&client_secret=' + secretKey
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