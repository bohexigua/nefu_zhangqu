const getAccessToken = require('../common/getAccessToken');
const createUserGroup = require('../common/createUserGroup');
const registerFace = require('../common/registerFace');
const getFace = require('../common/getFace');
const campus_model = require('../models/campus');
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

const recallFace = async (ctx, next) => {
  const file = ctx.request.body.files.file;    // 获取上传文件
  const fileBuf = fs.readFileSync(file.path);    // 创建可读流
  const imageBase64 = fileBuf.toString("base64");
  const result = {success: true};
  return await getFace(imageBase64)
  .then(async res => {
    if (res.error_msg !== 'SUCCESS') {
      result.success = false;
      result.reason = res.error_msg;
    } else {
      const userList = res.result.user_list;
      result.userList = [];
      for (let i = 0; i < userList.length; i++) {
        let item = userList[i];
        let userInfo = await campus_model.getUserByNo(item.user_id);
        result.userList.push({
          userNo: userInfo[0].user_no,
          score: item.score,
          path: userInfo[0].user_img,
          name: userInfo[0].user_name,
          college: userInfo[0].user_college
        })
      }
    }
    ctx.response.body = JSON.stringify(result);
  });
}

module.exports = {
  getAccessTokenTest: getAccessTokenTest,
  createUserGroupTest: createUserGroupTest,
  registerFaceTest: registerFaceTest,
  getFaceTest: getFaceTest,
  recallFace: recallFace
}