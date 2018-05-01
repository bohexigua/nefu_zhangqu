<template>
  <div id="find">
		<h3 class="find-title"> 寻找你最爱的那位 </h3>
		<article class="find-content">
			<p> &nbsp;&nbsp;我们提供东北林业大学在校师生的 10000+ 张人脸库，覆盖了2010 - 2014级的全体师生，以及部分 2015级的同学。因训练用户组耗时，全校师生敬请期待。 </p>
			<p> &nbsp;&nbsp;你可以上传你心目中男神女神的模样，寻找一位你最心动的同学 </p>
		</article>
		<div class="upload-wrap">
			<p> 点击上传图片 </p>
			<img src="../assets/face_diaplay.jpg" alt="">
			<div class="upload-img">
				<div class="h-line"></div>
				<div class="v-line"></div>
			</div>
		</div>
		<div class="find-result">
			<p class="result-title"> 搜索结果: </p>
			<ul class="result-wrap">
				<li class="result-item">
					<div class="item-pic"></div>
					<div class="item-intro"></div>
				</li>
				<li class="result-item">
					<div class="item-pic"></div>
					<div class="item-intro"></div>
				</li>
				<li class="result-item">
					<div class="item-pic"></div>
					<div class="item-intro"></div>
				</li>
				<li class="result-item">
					<div class="item-pic"></div>
					<div class="item-intro"></div>
				</li>
				<li class="result-item">
					<div class="item-pic"></div>
					<div class="item-intro"></div>
				</li>
			</ul>	
		</div>
  </div>
</template>

<script>
//引入vuex 辅助函数  mapState（计算属性），mapMutations（methods方法）
import { mapState, mapMutations, mapGetters} from 'vuex'
export default {
	name: 'find',
	components: {
	},
	computed: {
	},
	methods: {
	}
}
</script>

<style rel="stylesheet/scss" lang="scss">
	#find {
		text-align: center;
		.find-title {
			margin-top: 10px;
			font-size: 18px;
			font-weight: bolder;
		}
		.find-content {
			text-align: left;
			margin-left: 15px;
			margin-right: 15px;
			font-size: 15px;
			p {
				margin-top: 10px;
			}
		}
		.upload-wrap {
			text-align: left;
			margin-top: 20px;
			overflow: hidden;
			margin-left: 25px;
			img {
				height: 105px;
				margin-right: 20px;
			}
			.upload-img {
				display: inline-block;
				position: relative;
				width: 100px;
				height: 100px;
				border-style: dashed;
				border-color: rgba(33, 132, 238, 1);
				border-width: 2px;
				.h-line {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translateY(-50%) translateX(-50%);
					width: 90px;
					border-top-style: dashed;
					border-top-color: rgba(33, 132, 238, 1);
					border-top-width: 2px;
				}
				.v-line {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translateY(-50%) translateX(-50%) rotate(90deg);
					width: 90px;
					border-top-style: dashed;
					border-top-color: rgba(33, 132, 238, 1);
					border-top-width: 2px;
				}
			}
			> p {
				font-size: 15px;
				font-weight: bolder;
				margin-bottom: 5px;
			}
		}
		.find-result {
			margin: 0 auto;
			margin-top: 20px;
			width: 340px;
			height: 400px;
			overflow: hidden;
			background-color: rgba(251, 251, 251, 1);
			margin-bottom: 60px;
			.result-title {
				text-align: left;
				font-size: 18px;
				font-weight: bolder;
				margin-left: 10px;
				margin-top: 5px;
			}
			.result-wrap {
				margin-top: 25px;
				height: 350px;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				.result-item {
					width: 100px;
					height: 140px;
					margin-left: 5px;
					margin-right: 5px;
					.item-pic {
						width: 100px;
						height: 100px;
						background-color: rgba(0, 0, 0, 1);
					}
					.item-intro {
						margin-top: 5px;
						height: 35px;
						width: 100px;
						background-color: rgba(0, 0, 0, 1);
					}
				}
			}
		}
	}
</style>
