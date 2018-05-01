const request = require('request');
const getAccessToken = require('./getAccessToken');
const fs = require('fs');
const path = require('path');
const face_models = require('../models/face');

let baseURL = 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/user/add?';
const filePath = path.resolve('./public/images');
const dirPath = fs.readdirSync(filePath);

const registerFace = async () => {
  return getAccessToken()
  .then(accessToken => {
    for(let i = 0; i < dirPath.length; i++) {
      let item = dirPath[i];
      if (/\.jpg/.test(item)) {
        let imageBuf = fs.readFileSync(filePath + '/' + item);
        let imageBase64 = imageBuf.toString("base64");
        let studentNo = item.split('.')[0];
        request({
          url: baseURL + 'access_token=' + accessToken,
          method: "POST",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: JSON.stringify({
            image: imageBase64,
            image_type: 'BASE64',
            group_id: 'nefu_0',
            user_id: studentNo
          })
        }, (error, response, body) => {
          if (error) {
            console.log('registerFace request error!');
            reject(error);
          }
          const res = JSON.parse(body);
          if (res.error_msg === 'SUCCESS') {
            face_models.setFaceInfo(studentNo, res.result.face_token);
            console.log('registerFace success!');
          } else {
            console.log('error: registerFace failed!');
            console.log(res);
          }
        });
      }
    }
  });
}

module.exports = registerFace;