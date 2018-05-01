const getAccessToken = require('../common/getAccessToken');
const createUserGroup = require('../common/createUserGroup');
const registerFace = require('../common/registerFace');

const getAccessTokenTest = async () => {
  console.log(getAccessToken());
}

const createUserGroupTest = async () => {
  console.log(createUserGroup());
}

const registerFaceTest = async () => {
  console.log(registerFace());
}

module.exports = {
  getAccessTokenTest: getAccessTokenTest,
  createUserGroupTest: createUserGroupTest,
  registerFaceTest: registerFaceTest
}