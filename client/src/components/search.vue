<template>
	<div id="search">
		<x-header>
			<span>搜索</span>
		</x-header>

		<div class="search-keyword">
			<input class="search-input" type="text" v-model.trim="searchval" @keyup.enter="search" placeholder="请输入搜索内容">
			<span class="history" @click="history"> 搜索相关 </span>
		</div>

		<div class="news-wrapper" >

			<ul class="news-content" >
				<!--:to = "'/newsDetails' + item.seo_url"-->
				<router-link class="news-item" v-for="(item,index) in searchlist"
					:to="{
						path:'/newsDetails',
						query:{ item: JSON.stringify(item) }
					}"
					tag='li'
					:key='index'
				>
					<div v-html="item.content"></div>
					<div class="bottom-title">
						<span class="writer">{{ item.username }}</span> &nbsp;&nbsp;
						<span class="icon" :class="{ 'women-icon': item.sex === 1, 'man-icon': item.sex === 2 }">{{ item.comment_count }}</span>
						<span class="datetime">{{ item.date }}</span>
						<span class="praise-icon icon" @click="onAddPraise(item.issueID, index)"></span>
						<span class="praise-num"> {{ item.praise }} </span>
					</div>
				</router-link>

			</ul>
			<!-- 路由外联 -->
			<router-view></router-view>

		</div>
	</div>

</template>
<script>
	import { XHeader } from "vux";
	import { ajax } from '../common/request';
	import { formatDate } from '../common/util';

	export default {
		// props:['newsItem'],
		components: {
			XHeader
		},
		data() {
			return {
				searchval: "",
				searchlist: []
			};
		},
		created() {},
		mounted() {},
		methods: {
			replace(title) {
				var inp = this.searchval;
				//gim 正则表达式：全文匹配，忽略大小写，多行匹配，replace 把匹配到的值替换为 下面的形式
				const reg = new RegExp("" + inp + "", "gim");
				if (title) {
					return title.replace(reg, '<span class="red">' + inp + "</span>");
				} else {
					return title;
				}
			},
			search() {
				console.log('触发 search');
				const keyWord = this.searchval;
				ajax('/issue/searchIssue', { keyWord: keyWord }, 'post')
				.then(res => {
					if (!res.data.success) {
						alert(res.data.reason);
					} else {
						const searchlist = res.data.data.map((value, index, arr) => {
							const result = {};
							if (value.issue_anonymous) {
								result.username = '匿名：某同学';
							} else {
								result.username = value.user_name;
							}
							result.anonymous = value.issue_anonymous;
							result.date = formatDate(value.issue_date)
							result.praise = value.issue_praise;
							result.sex = value.user_sex;
							result.content = value.issue_content;
							result.issueID = value.issue_id;
							return result;
						});
						this.searchlist = searchlist;
					}
				})
			},
			history() {
				this.search();
			}
		},
		filters: {
			//不能监控 data 选项值
		}
	};
</script>
<style rel="stylesheet/scss" lang="scss">
	#search {
		.red {
			color: red;
		}
		width: 100%;
		background-color: #fff;
		z-index: 999;
		/*position: relative;*/
		position: absolute;
		top: 0;
		.vux-header {
			width: 100%;
			position: fixed;
			top: 0;
			background-color: rgba(23, 139, 223, 1);
			z-index: 3;
			.vux-header-left .vux-header-back {
				color: #fff;
			}
			.vux-header-left .left-arrow:before {
				border: 1px solid #fff;
				border-width: 1px 0 0 1px;
			}
			.icon-share3 {
				font-size: 28px;
				position: absolute;
				right: 10px;
			}
		}
		.search-keyword {
			padding: 50px 17px 0 17px;
			.search-input {
				width: 60%;
				padding: 10px 20px;
				border: 1px solid #eee;
			}
			.history {
				color: cornflowerblue;
			}
		}
		.news-wrapper {
			.news-content {
				position: relative;
				z-index: 10;
				background-color: #fff;
				.news-item {
					.news-title {
						line-height: 0.4rem;
					}
					padding: 0.2rem 0.4rem;
					font-size: 0.32rem;
					color: #585151;
					border-bottom: 1px solid #eee;
					.img-wrapper {
						display: flex;
						margin-top: 0.1rem;
						justify-content: space-between;
						li {
							width: 2.13rem;
							height: 1.5rem;
							/*flex: 1;*/
							img {
								width: 100%;
							}
						}
					}
					.bottom-title {
						font-size: 10px;
						color: #b5b5b5;
						margin-top: 8px;
						.icon {
							display: inline-block;
							width: 15px;
							height: 15px;
							background-size: 100% 100%;
							background-repeat: no-repeat;
							transform: translateY(3px);
						}
						.man-icon {
							background-image: url('../assets/man.png');
						}
						.women-icon {
							background-image: url('../assets/women.png');
						}
						.datetime {
							margin-left: 10px;
						}
						.praise-icon {
							width: 20px;
							height: 20px;
							margin-left: 50px;
							background-image: url('../assets/praise.png');
						}
						.praise-num {
							display: inline-block;
							color: rgba(0, 0, 0, 0.5);
							font-size: 14px;
							font-weight: bold;
							margin-left: 1px;
						}
					}
				}
			}
		}
	}
</style>


