<template>
    <div id="my">
			<div class="avatar-wrap">
				<div class="background">
				</div>
				<div class="avatar-img">
					<img src="../assets/default_head.png" alt="" class="avatar">
					<div class="title">{{ session.user_name || '未登录用户' }}</div>
				</div>
			</div>
			<ul class="connect-me">
				<li v-for="(item, index) in menuList">
					<router-link :to="item.link">
						<i class="icon iconfont" :class="item.icon"></i>{{ item.name }}
						<div class="right">
							<i class="icon iconfont icon-enter"></i>
						</div>
					</router-link>
				</li>
			</ul>

    </div>
</template>

<script>
    //引入vuex 辅助函数  mapState（计算属性），mapMutations（methods方法）
    import { mapState,mapMutations,mapGetters } from 'vuex'
    export default {
        name:'my',
        data() {
					return {
						menuList: [{
							name: '登录',
							link: '/login',
							icon: 'icon-login'
						}, {
							name: '完善／修改个人资料',
							link: '/update',
							icon: 'icon-update'
						}, {
							name: '我的消息',
							link: '/news',
							icon: 'icon-news'
						}, {
							name: '退出',
							link: '/exit',
							icon: 'icon-exit'
						}]
					}
        },
        components:{
        },
        computed: {
					...mapState({
						session: s => s.session
					}),
				},
        methods: {
				}
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    #my {
			width: 100%;
			text-align: center;
			position: absolute;
			top:0;
			min-height: 100%;
			.avatar-wrap {
				width:100%;
				height:200px;
				background-color: rgba(7,17,27,.3);
				.background {
					width: 100%;
					height:200px;
					position: absolute;
					left:0;
					right:0;
					top:0;
					z-index: -1;
					background-image: url('../assets/campus_index.jpeg');
					background-size:100% 100%;
					background-repeat: no-repeat;
					filter: blur(10px);
				}
				.avatar-img{
					width: 100px;
					margin: 0 auto;
					img{
						width: 100%;
						border-radius: 50%;
						margin-top: 50px;
					}
					.title{
						font-size: 20px;
						color: rgba(255, 255, 255, 0.9);
						margin-top: 8px;
					}
				}
			}
			.connect-me{
				margin:20px 20px;
				li {
					padding: 10px 5px;
					border-top:1px solid #eee ;
					border-bottom:1px solid #eee ;
					margin:10px 0;
					text-align: left;
					font-size: 16px;
					a {
						display: block;
						width: 100%;
						.iconfont {
							margin-right: 10px;
						}
						.right {
							float: right;
						}
						.icon {
							display: inline-block;
							width: 18px;
							height: 18px;
							background-repeat: no-repeat;
							background-size: 100% 100%;
							transform: translateY(15%);
						}
						.icon-login {
							background-image: url('../assets/login.png');
						}
						.icon-update {
							background-image: url('../assets/update.png');
						}
						.icon-news {
							background-image: url('../assets/news.png');
						}
						.icon-exit {
							background-image: url('../assets/exit.png');;
						}
					}
				}
			}
    }
</style>
