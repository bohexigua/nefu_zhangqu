<template>
	<div id="index">

		<div class="header-x">
			<span class="title">掌趣东林</span>
			<i class="icon iconfont icon-search1" @click="search"></i>
		</div>

		<div class="tab-title" ref='tab_title_hook'>
		<ul class="box1">
			<li class="box1-item" :class="{'active':isCur===index}" v-for="(item,index) in tab_title" @click="highlight(index)">
				{{item.name}}
			</li>
		</ul>
		</div>

		<div class="news-wrapper" ref="news_hook">

			<ul class="news-content" ref="news_con">
				<!--下拉刷新-->
				<div class="loading" v-show="loadingShow">
					<img src="../assets/loading.gif" alt="">
				</div>

				<!--路由参数设置-->
				<!--:to="{-->
				<!--name:'newsDetails',-->
				<!--path:'/newsDetails',-->
				<!--params:{-->
				<!--id:item.source_url,-->
				<!--newsItem:item-->
				<!--}-->
				<!--}"-->
					<!--嵌套路由设置-->
				<!--:to = "'index/newsDetails' + item.source_url"-->

				<router-link class="news-item" v-for="(item,index) in newsData"
					:to ='{
						path: "/newsDetails" + item.source_url,
						query:{
							newsItem:JSON.stringify(item)
						}
					}'

					tag='li'
					:key='index'
				>

					<div class="news-title" v-html="item.content"></div>
					<ul class="img-wrapper" v-if="item.image_list">
						<li v-for="(item,index) in item.image_list">
							<!-- :src="item['url']" -->
							<img v-lazy="item['url']"  alt="">
						</li>
					</ul>
					<div class="bottom-title">
						<span class="writer">{{ item.username }}</span> &nbsp;&nbsp;
						<span class="sex-icon" :class="{ 'women-icon': item.sex === 1, 'man-icon': item.sex === 2 }">{{ item.comment_count }}</span>
						<span class="datetime">{{ item.date }}</span>
					</div>
				</router-link>

				<!-- 上拉加载 -->
				<div class="loading2" v-show="loadingShow2">
					加载更多...
				</div>

			</ul>
				<!-- 路由外联 -->
				<router-view></router-view>
		</div>

		<!--对于动态增加的组件 貌似 v-show 不能触发 transition动画，要用 v-if-->
		<transition name="fade">
			<to-top :flag="toTop" @scrolltoTop="scroll_to"></to-top>
		</transition>

	</div>
</template>

<script>
	import { ajax } from "../common/request";
	import BScroll from "better-scroll";
	import toTop from "../components/toTop";
	import { formatDate, delay } from '../common/util'

	export default {
		name: "index",
		components: {
			toTop
		},
		data() {
			return {
				tab_title: [{ name: "推荐", key: "__all__" }],
				prevkey: "", 																		//上一个选中的标签
				isCur: 0, 																			//当前点击的tab页
				newsData: [],																		//新闻列表
				loadingShow: false, 														//控制下拉刷新 load
				loadingShow2: false, 														//控制上啦加载 load
				loadTip: false, 																//刷新成功提示条
				tabkey: "", 																		//缓存当前选中的 tab页对应的 key
				toTop: false, 																	//回到顶部
				ttt: 0,
				newsArr: [] 																		//存储在 vuex 里面的数据
			};
		},
		methods: {
			search() {
				console.log("search");
				this.ttt = 0;
				this.$router.push("/search");
			},

			request(key, fn) {
				ajax('/issue/getIssue')
				.then(res => {
					const newsData = res.data.data.map((value, index, arr) => {
						const result = {};
						if (value.issue_anonymous) {
							result.username = '匿名：某同学';
						} else {
							result.username = value.user_name;
						}
						result.date = formatDate(value.issue_date)
						result.praise = value.issue_praise;
						result.sex = value.user_sex;
						result.content = value.issue_content;
						return result;
					});
					this.newsData = newsData;
					this.$nextTick(() => {
						this.news_scroll && this.news_scroll.refresh();
						fn && fn();
					});
				})
			},

			//暂时不考虑 vuex 存储
			saveStore(data) {
				let newsObj = {
					collectionFlag: false,
					item_id: ""
				};

				let newsdata = data.map(item => {
					newsObj.collectionFlag = false;
					newsObj.item_id = item.item_id;
					this.newsArr.push(newsObj);
					return item;
				});

				/**
				 * 算了，好像存 vuex 没有多大意义，
				 * 而且复杂度直线提升
				 * */
				this.$store.commit("addNewsArr", this.newsArr);
				/**
				 * 暂时，不考虑了，等有新想法在考虑
				 * */
				this.newsData = this.newsData.concat(newsdata);
			},

			highlight(index) {
				//阻止pc 端，点击事件执行多次，（不是自己派发的事件，return）
				//点击事件是靠 better-scroll 派发的
				if (!event._constructed) return;
				this.isCur = index;
				this.tabkey = this.tab_title[index]["key"];
				console.log(this.tabkey, "我执行的次数");
				this.request(this.tabkey);
			},
			//初始化 better-scroll
			_initScroll() {
				let self = this;
				let flagdown = false;
				let flagup = false;

				this.title_scroll = new BScroll(this.$refs.tab_title_hook, {
					scrollX: true,
					click: true
				});

				this.news_scroll = new BScroll(this.$refs.news_hook, {
					click: true,
					probeType: 2
				});

				this.news_scroll.on("scroll", function(pos) {
					//                    console.log('y' + pos.y + '-' + 'this.maxScrollY' + this.maxScrollY);
					// 下拉刷新
					if (pos.y > 40) {
						self.loadingShow = true;
						flagdown = true;
					}
					if (pos.y < -500) {
						self.toTop = true;
					}
					// 上拉加载
					if (pos.y < this.maxScrollY) {
						self.loadingShow2 = true;
						flagup = true;
						//                        console.log('上拉加载。。。');
					}
				});

				this.news_scroll.on("scrollEnd", function(pos) {
					// 下拉刷新，结束逻辑
					if (flagdown) {
						console.log("flagdown");
						flagdown = false;
						self.request(self.tabkey, function() {
							self.loadingShow = false;
						});
					}

					// 上啦加载，结束逻辑
					if (flagup) {
						console.log("flagup");
						flagup = false;
						ajax(self.tabkey, function(data) {
							//                            self.newsData = self.newsData.concat(data.data);
							self.saveStore(data.data);
							self.$nextTick(() => {
								self.loadingShow2 = false;
							});
						});
					}
				});
			},
			//滚动到顶部
			scroll_to(item) {
				this.toTop = false;
				this.news_scroll.scrollTo(0, 0, 300);
				console.log(item);
			}
		},
		filters: {
			date: function(time) {
				if (!time) {
					return "";
				}
				let time1 = new Date(time) - 0;
				let time2 = new Date() - 0;
				let time3 = time2 - time1;
				let time4 = parseInt(time3 / 1000 / 60);
				let time5;
				if (time4 > 0) {
					time5 = time4 + "分钟前";
				} else if (time4 <= 0) {
					time5 = "刚刚";
				} else if (time4 > 60) {
					time5 = parseInt(time4 / 60) + "时前";
				}
				return time5;
			}
		},
		watch: {
			$route(to, from, next) {}
		},
		created() {
			let key0 = this.tab_title[0]["key"];
			this.request(key0);
		},
		mounted() {
			this._initScroll();
		},
		updated() {
			var self = this;
			this.$nextTick(() => {
				self.news_scroll.refresh();
				self.title_scroll.refresh();
			});
		}
	};
</script>

<style rel="stylesheet/scss" lang="scss">
	#index {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 50px;
		min-height: 100%;
		.header-x {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			height: 40px;
			background-color: rgba(23, 139, 223, 1);
			z-index: 999;
			text-align: center;
			.title {
				line-height: 40px;
				color: #fff;
				font-size: 18px;
			}
		}
		.icon-search1 {
			position: absolute;
			top: 4px;
			right: 12px;
			font-size: 30px;
			color: #fff;
		}
		.icon-mail_fill {
			position: absolute;
			top: 4px;
			left: 12px;
			font-size: 30px;
			color: #fff;
		}
		.tab-title {
			position: fixed;
			left: 0;
			right: 0;
			top: 40px;
			z-index: 999;
			background-color: #eee;
			overflow: hidden;
			.box1 {
				/*display: flex;*/
				overflow: hidden;
				background-color: #f4f5f6;
				width: 11rem;
				position: relative;
				.box1-item {
					font-size: 0.28rem;
					text-align: center;
					width: 1rem;
					height: 0.7rem;
					line-height: 0.7rem;
					float: left;
					&.active {
						color: rgba(23, 139, 223, 1);
					}
				}
			}
		}
		.news-wrapper {
			position: absolute;
			left: 0;
			right: 0;
			width: 100%;
			top: 1.6rem;
			bottom: 50px;
			background-color: #fff;
			overflow: hidden;
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
						.sex-icon {
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
					}
				}
			}
		}
		.loading {
			/*position:absolute;*/
			/*left:0;*/
			//-top:-25px;
			width: 100%;
			text-align: center;
			color: green;
			font-size: 18px;
			//z-index:-1;
			img {
				width: 100px;
			}
		}
		.load-result {
			position: absolute;
			left: 0;
			right: 0;
			top: 30px;
			text-align: center;
			height: 30px;
			width: 80px;
			background-color: #000;
			color: #fff;
			border-radius: 5px;
			z-index: 999;
			font-size: 14px;
			line-height: 30px;
			margin: 0 auto;
		}
		.loading2 {
			text-align: center;
			padding: 10px;
		}

		.fade-enter-active,
		.fade-leave-active {
			transition: all 3s;
		}
		.fade-enter,
		.fade-leave-to {
			opacity: 0;
		}
		/*测试*/
		.ttt {
			position: fixed;
			left: 0.5rem;
			bottom: 2rem;
			z-index: 1000;
			height: 0.9rem;
			width: 0.9rem;
			border-radius: 50%;
			background: #d43d3d;
			text-align: center;
			line-height: 0.9rem;
			&.fade1-enter-active,
			&.fade1-leave-active {
				transition: all 5s;
			}
			&.fade1-enter,
			&.fade1-leave-to {
				opacity: 0;
			}
		}
	}
</style>
<!--因为 我们现在用的框架里 ，有一个 utils 文件，里面有个 通用弹框，每次需要使用的时候 ，直接 utils.alert('提示语句',function(){}) 就可以了，所以我猜有这样的想法-->
