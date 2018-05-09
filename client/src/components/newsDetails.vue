<template>
	<el-container id="newsDetails">
		<div class="title-bar">
			<span class="back" @click="onBackToIndex"></span>
			<span class="title-text"> 动态详情 </span>
		</div>
		<el-header class="news-header">
			<div class="news-author"> {{ newsItem.username }} </div>
			<div class="news-date"> {{ newsItem.date }} </div>
		</el-header>
		<el-main class="main">
			<div class="news-content" v-html="newsItem.content"></div>
			<ul class="comment-wrap">
				<li class="comment-item" v-for="(item, index) in commentList">
					<p class="comment-user">
						<img :src="changeUserPic(item)" class="user-pic">
						<span class="user-name"> {{ item.name }} </span>
					</p>
					<p class="item-content"> {{ item.comment_content }} </p>
				</li>
			</ul>
		</el-main>
		<div class="input-wrap">
			<el-input v-model="commentContent" placeholder="匿／实名消息，匿／实名评论" class="publish-input"></el-input>
			<el-button type="primary" class="publish-btn" @click="publishComment">发布</el-button>
		</div>
	</el-container>
</template>
<script>
	import { mapState, mapMutations, mapGetters } from "vuex";
	import { ajax } from '../common/request'

	const logPv = async (issueID) => {
		ajax('/issue/addIssuePv?issueID=' + issueID)
		.then(res => {
			console.log(res);
		});
	}

	const getComment = async (issueID, self) => {
		ajax('/issue/getComment?issueID=' + issueID)
		.then(res => {
			self.commentList = res.data.data;
			for (let i = 0; i < self.commentList.length; i++) {
				if (self.newsItem.anonymous === 1) {						//   匿名
					self.commentList[i].name = '某' + self.commentList[i].user_college + '同学';
				} else {
					self.commentList[i].name = self.commentList[i].user_name;
				}
			}
		});
	}

	export default {
		components: {
		},
		data() {
			return {
				newsItem: {},
				commentContent: '',
				commentList: []
			};
		},
		created() {
		},
		mounted() {
			this.newsItem = JSON.parse(this.$route.query.item);	
			logPv(this.newsItem.issueID);
			getComment(this.newsItem.issueID, this);
		},
		methods: {
			onBackToIndex() {
				this.$router.push('/index');
			},
			publishComment() {
			},
			changeUserPic(item) {
				if (this.newsItem.anonymous === 1) {
					return 'static/img/default_head.png';
				} else {
					return 'static/student/' + item.comment_user + '.jpg';
				}
			}
		},
		watch: {
			$route(val) {
				if (val.query && val.query.item) {
					this.newsItem = JSON.parse(val.query.item);
					logPv(this.newsItem.issueID);
					getComment(this.newsItem.issueID, this);
				}
			}
		},
		filters: {
			
		},
		activated() {
		},
		updated() {
		}
	};
</script>
<style rel="stylesheet/scss" lang="scss">
	#newsDetails {
		.title-bar {
			width: 100%;
			height: 35px;
			overflow: hidden;
			background-color: rgba(23, 139, 223, 1);
			display: flex;
			align-items: center;
			.back {
				display: inline-block;
				background-repeat: no-repeat;
				background-size: 100% 100%;
				width: 20px;
				height: 20px;
				background-image: url('../assets/back.png');
				margin-left: 10px;
			}
			.title-text {
				color: rgba(255, 255, 255, 1);
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
			}
		}
		background-color: rgba(200, 200, 200, 0.1);
		.news-header {
			margin-top: 20px;
			.news-author {
				color: rgba(0, 0, 0, 0.5);
				float: left;
			}
			.news-date {
				color: rgba(0, 0, 0, 0.5);
				float: right;
			}
		}
		.main {
			padding: 0;
			.news-content {
				line-height: 20px;
				padding-left: 20px;
				padding-right: 20px;
			}
			.comment-wrap {
				padding-left: 20px;
				padding-right: 20px;
				margin-top: 40px;
				background-color: rgba(255, 255, 255, 1);
				.comment-item {
					border-top: 1px solid rgba(0, 0, 0, 0.3);
					padding-top: 15px;
					padding-bottom: 15px;
					.comment-user {
						.user-pic {
							height: 40px;
						}
						.user-name {
							display: inline-block;
							margin-left: 10px;
							transform: translateY(-20px);
						}
					}
					.item-content {
						padding-left: 50px;
					}
				}
			}
		}
		.input-wrap {
			position: fixed;
			bottom: 3px;
			height: 38px;
			width: 100%;
			.publish-input {
				margin-left: 3px;
				width: 80%;
			}
			.publish-btn {
				position: absolute;
				top: 0;
				right: 0;
			}
		}
	}
</style>
