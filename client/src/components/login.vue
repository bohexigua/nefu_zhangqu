<template>
  <el-container class="login-wrap">
    <el-header class="header">
      <img class="logo" src="../assets/zhangqu_logo.png" alt="">
    </el-header>
    <el-main class="input-group">
      <el-input v-model="username" placeholder="请输入你的在校学号" class="username" @change="checkUsername">
        <template slot="prepend">学号</template>
      </el-input>
      <el-input v-model="password" placeholder="请输入你的密码" class="password" type="password">
        <template slot="prepend">密码</template>
      </el-input>
    </el-main>
    <el-footer class="footer">
      <div class="btn-group">
        <el-button type="primary" class="login-btn" @click="login">点击登录</el-button>
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
  import axios from 'axios'

  export default {
      name:'login',
      data() {
        return {
          username: '',
          password: '',
          errorText: '',
          errorFlag: false
        }
      },
      components:{
      },
      computed:{
      },
      methods:{
        checkUsername() {
          if (!/^[0-9]*$/.test(this.username)) {
            this.username = '';
            this.errorText = '学号只能是数字!';
            this.errorFlag = true;
            delay(3000).then(() => {
              this.errorFlag = false;
            })
          }
        },
        login() {
          const username = this.username;
          const password = this.password;
          this.$store.dispatch('getUserInfo', { username, password });
          this.$router.push({ path: '/my' });
        },
        jumpToIndex() {
          this.$router.push({ path: '/my' });
        }
      }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .login-wrap {
    .header {
      margin-top: 50px;
    }
    .logo {
      width: 325px;
    }
    .input-group {
      margin-top: 30px;
      .password {
        margin-top: 10px;
      }
    }
    .footer {
      margin-top: 20px;
      text-align: center;
      .btn-group {
        display: inline-block;
        overflow: hidden;
        .login-btn {
          margin-right: 40px;
        }
        .back-btn {
          margin-left: 40px;
        }
      }
    }
  }
</style>
