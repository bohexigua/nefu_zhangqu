<template>
  <el-container class="login-wrap">
    <el-header class="header">
      <img class="logo" src="../assets/update_info.png" alt="">
    </el-header>
    <el-main class="input-group">
      <el-input v-model="password" placeholder="请输入你的新密码" class="input-item" type="password">
        <template slot="prepend">新密码</template>
      </el-input>
      <el-input v-model="rePassword" placeholder="请重复输入你的新密码" class="input-item" type="password">
        <template slot="prepend">重复密码</template>
      </el-input>
      <el-input v-model="telephone" placeholder="请输入你的手机号" class="input-item">
        <template slot="prepend">手机号</template>
      </el-input>
      <el-input v-model="email" placeholder="请输入你的电子邮箱" class="input-item" type="email">
        <template slot="prepend">电子邮箱</template>
      </el-input>
    </el-main>
    <el-footer class="footer">
      <div class="btn-group">
        <el-button type="primary" class="login-btn" @click="login">修改／完善信息</el-button>
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
      name:'login',
      data() {
        return {
          password: '',
          rePassword: '',
          telephone: '',
          email: '', 
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
        .login-btn {
          margin-right: 30px;
        }
        .back-btn {
          margin-left: 30px;
        }
      }
    }
  }
</style>
