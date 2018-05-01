const getAccessToken = require('../common/getAccessToken');
const createUserGroup = require('../common/createUserGroup');
const registerFace = require('../common/registerFace');
const getFace = require('../common/getFace');
const path = require('path');
const fs = require('fs');

const getAccessTokenTest = async () => {
  console.log(getAccessToken());
}

const createUserGroupTest = async () => {
  console.log(createUserGroup());
}

const registerFaceTest = async () => {
  console.log(registerFace());
}

const getFaceTest = async () => {
  let tempFilePath = path.resolve('./public/images/20131620.jpg');
  let imageBuf = fs.readFileSync(tempFilePath);
  let imageBase64 = imageBuf.toString("base64");
  getFace(imageBase64)
  .then(res => {
    console.log(JSON.stringify(res));
  });
}

module.exports = {
  getAccessTokenTest: getAccessTokenTest,
  createUserGroupTest: createUserGroupTest,
  registerFaceTest: registerFaceTest,
  getFaceTest: getFaceTest
}