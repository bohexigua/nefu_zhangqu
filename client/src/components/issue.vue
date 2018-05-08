<template>
  <el-container class="issue-wrap">
    <el-header class="issue-header">
      <img src="../assets/issue_logo.png" alt="issue_logo">
    </el-header>
    <main>
      <vue-editor v-model="content" class="vue-editor" :placeholder="editorPlaceholder"></vue-editor>
    </main>
    <el-footer class="issue-footer">
      <p>
        <el-switch
          v-model="anonymousFlag"
          active-text="匿名"
          inactive-text="实名">
        </el-switch>
      </p>
      <p class="btn-group">
        <el-button type="primary" class="publish-btn" @click="publishIssue">发表动态</el-button>
        <el-button type="warning" class="back-btn" @click="jumpToIndex">返回主页</el-button>
      </p>
    </el-footer>
  </el-container>
</template>

<script>
  //引入vuex 辅助函数  mapState（计算属性），mapMutations（methods方法）
  import { mapState, mapMutations, mapGetters } from 'vuex'
  import { delay } from '../common/util'
  import { ajax } from '../common/request'
  import axios from 'axios'
  import { VueEditor } from 'vue2-editor'

  export default {
      name:'issue',

      data() {
        return {
          content: '',
          editorPlaceholder: '来发个信息，交流一下吧～',
          anonymousFlag: true
        }
      },
      components: {
        VueEditor
      },
      computed:{
        ...mapState({
          session: s => s.session
        }),
      },
      methods:{
        onEditorChange() {},
        jumpToIndex() {
          this.$router.push({ path: '/my' });
        },
        publishIssue() {
          const content = this.content;
          const username = this.session.user_no;
          let anonymous;
          if (this.anonymousFlag) {                      //   1 匿名， 0 实名
            anonymous = 1;
          } else {
            anonymous = 0;
          }
          if (content === '') {
            alert('请填写您要发表的动态后再点击确认～');
            return;
          }
          ajax('/issue/setIssue', {
            content: content,
            username: username,
            anonymous: anonymous
          }, 'POST')
          .then(res => {
            if (res.data.success) {
              alert('动态发表成功，3s后自动跳回首页');
              delay(3000).then(() => {
                this.$router.push({ path: '/index' });
              })
            } else {
              alert(res.data.reason)
            }
          })
        }
      }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .issue-wrap {
    .issue-header {
      margin-top: 10px;
      text-align: center;
      img {
        width: 70%;
      }
    }
    .vue-editor {
      height: 270px;
      margin-bottom: 10px;
      margin-left: 10px;
      margin-right: 10px;
      margin-top: 20px;
      .ql-toolbar {
        height: 120px;
        border-color: rgba(0, 116, 195, 1);
      }
      #quill-container {
        height: 150px;
        border-color: rgba(0, 116, 195, 1);
      }
    }
    .issue-footer {
      margin-top: 10px;
      .btn-group {
        margin-top: 40px;
        text-align: center;
        .publish-btn {
          margin-right: 45px;
        }
        .back-btn {
          margin-left: 45px;
        }
      }
    }
  }
</style>
