<template>
  <el-container class="update-wrap">
    <el-header class="header">
      <img class="logo" src="../assets/update_info.png" alt="">
    </el-header>
    <el-main class="input-group">
      <el-input v-model="password" placeholder="请输入你的新密码" class="input-item" type="password" @change="checkPassword">
        <template slot="prepend">新密码</template>
      </el-input>
      <el-input v-model="repassword" placeholder="请重复输入你的新密码" class="input-item" type="password" @change="checkRepassword">
        <template slot="prepend">重复密码</template>
      </el-input>
      <el-input v-model="telephone" placeholder="请输入你的手机号" class="input-item" @change="checkTelePhone">
        <template slot="prepend">手机号</template>
      </el-input>
      <el-input v-model="email" placeholder="请输入你的电子邮箱" class="input-item" type="email" @change="checkEmail">
        <template slot="prepend">电子邮箱</template>
      </el-input>
    </el-main>
    <el-footer class="footer">
      <div class="btn-group">
        <el-button type="primary" class="update-btn" @click="update">修改／完善信息</el-button>
        <el-button type="warning" class="back-btn" @click="jumpToIndex">返回主页</el-button>
      </div>
    </el-footer>
    <el-alert
      v-show="errorFlag"
      :title="errorText"
      type="error">
    </el-alert>
  </el-container>
</template>

<script>
  //引入vuex 辅助函数  mapState（计算属性），mapMutations（methods方法）
  import { mapState, mapMutations, mapGetters } from 'vuex'
  import { delay } from '../common/util'
  import { ajax } from '../common/request'

  export default {
      name:'update',
      
      data() {
        return {
          password: '',
          repassword: '',
          telephone: '',
          email: '', 
          errorText: '',
          errorFlag: false
        }
      },
      components:{
      },
      computed:{
        ...mapState({
					session: s => s.session
				}),
      },
      watch: {
        session(val) {
          this.email = val.user_mail;
          this.telephone = val.user_phone;
        }
      },
      methods:{
        update() {
          const username = this.session.user_no;
          const password = this.password;
          const telephone = this.telephone;
          const email = this.email;
          if (!this.checkPassword()) return;
          if (!this.checkRepassword()) return;
          if (!this.checkTelePhone()) return;
          if (!this.checkEmail()) return;
          delay(3000).then(() => {
            this.errorFlag = false;
          })
          ajax('/users/updateUserInfo', {
            username: username,
            password: password,
            telephone: telephone,
            email: email
          }, 'POST')
          .then(res => {
            if (!res.data.success) {
              alert(res.data.reason);
            }
          });
          this.$router.push({ path: '/my' });
        },
        jumpToIndex() {
          this.$router.push({ path: '/my' });
        },
        checkPassword() {
          this.errorFlag = false;
          const password = this.password;
          if (password.length < 6) {
            this.errorText = '密码不能少于6位!';
            this.errorFlag = true;
            return false;
          }
          return true;
        },
        checkRepassword() {
          this.errorFlag = false;
          const password = this.password;
          const repassword = this.repassword;
          if (password !== repassword) {
            this.errorText = '重复密码和密码不一致!';
            this.errorFlag = true;
            return false;
          }
          return true;
        },
        checkTelePhone() {
          this.errorFlag = false;
          const telephone = this.telephone;
          if (/^[1][3,4,5,7,8][0-9]{9}$/.test(telephone) || telephone === '') {
            return true;
          } else {
            this.errorText = '错误的手机号格式（可不填写）';
            this.errorFlag = true;
            return false;
          }
        },
        checkEmail() {
          this.errorFlag = false;
          const email = this.email;
          if (/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(email)) {
            return true;
          } else {
            this.errorText = '错误的邮箱格式（可不填写）';
            this.errorFlag = true;
            return false;
          }
        }
      },
      mounted() {
        this.email = this.session.user_mail;
        this.telephone = this.session.user_phone;
      }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .update-wrap {
    .header {
      margin-top: 30px;
    }
    .logo {
      width: 325px;
    }
    .input-group {
      margin-top: 30px;
      .input-item {
        margin-top: 15px;
      }
    }
    .footer {
      margin-top: 20px;
      text-align: center;
      .btn-group {
        display: inline-block;
        overflow: hidden;
        .update-btn {
          margin-right: 30px;
        }
        .back-btn {
          margin-left: 30px;
        }
      }
    }
  }
</style>
