<template>
  <div id="find">
		<h3 class="find-title"> 寻找你最喜欢的那位 </h3>
		<article class="find-content">
			<p> &nbsp;&nbsp;我们提供东北林业大学在校师生的 18000+ 张人脸库，覆盖了2010 - 2016级的全体师生。 </p>
			<p> &nbsp;&nbsp;你可以上传你心目中男神女神的模样，寻找一位你最心动的同学。 </p>
		</article>
		<div class="upload-wrap">
			<p> 点击加号上传图片 </p>
			<img src="../assets/face_diaplay.jpg" alt="">
			<div class="upload-img">
				<div>
					<div class="h-line"></div>
					<div class="v-line"></div>
				</div>
				<input type="file" name="file" class="upload-input" @change="uploadChange($event)" accept="image/png,image/gif,image/jpg" />
			</div>
		</div>
		<div class="find-result">
			<p class="result-title"> 搜索结果（召回 4 名最像的同学）: </p>
			<ul class="result-wrap">
				<li class="result-item" v-for="(item, index) in userList">
					<div class="item-pic" :style="changeUserImage(item.userNo)"></div>
					<div class="item-intro">
						<p> 学号：{{ item.userNo }} </p>
						<p> 姓名：{{ item.name }} </p>
						<p> 学院：{{ item.college }} </p>
						<p> 相似度：{{ item.score }} </p>
					</div>
				</li>
			</ul>	
		</div>
		<div class="loaing-dialog" v-show="showDialog">
			<img src="../assets/load.gif" alt="" class="loading-icon">
			<p class="loading-text"> 正在努力加载中 </p>
		</div>
  </div>
</template>

<script>
//引入vuex 辅助函数  mapState（计算属性），mapMutations（methods方法）
import { mapState, mapMutations, mapGetters } from 'vuex'
import axios from 'axios';
import { requestURL } from '../common/config'

const stopTouchMove = (event) => {
	event.preventDefault();
}

export default {
	name: 'find',
	data() {
		return {
			showDialog: false,
			uploadBtnFlag: true,
			userList: [{path: '', name: '', userNo: '', college: '', score: ''}, 
			{path: '', name: '', userNo: '', college: '', score: ''}, 
			{path: '', name: '', userNo: '', college: '', score: ''}, 
			{path: '', name: '', userNo: '', college: '', score: ''}]
		}
	},
	components: {
	},
	computed: {
	},
	methods: {
		uploadChange(event) {
			if (!this.uploadBtnFlag) return;
			const file = event.target.files[0];
			if (!/(jpg|png|gif|jpeg)/.test(file.type)) {
				alert('请上传图片文件!');
				return ;
			}
			const param = new FormData();
			param.append('file', file, file.name);
			const config = {  
				headers: { 'Content-Type':'multipart/form-data' } 
			};
			axios.post(requestURL + '/find/recallFace', param, config)
			.then(res => {
				this.showDialog = false;
				this.uploadBtnFlag = true;
				document.removeEventListener('touchmove', stopTouchMove);
				if (res.data.success) {
					this.userList = res.data.userList;
				} else {
					alert('图片召回失败，原因：' + res.data.reason);
				}
				console.log(res);  
			});
			this.showDialog = true;
			this.uploadBtnFlag = false;
			document.addEventListener('touchmove', stopTouchMove, false);
		},
		changeUserImage(studentNo) {
			if (studentNo) {
				const path = '../static/student/' + studentNo + '.jpg';
				return 'background-image: url("' + path + '")';
			}
		}
	}
}
</script>

<style rel="stylesheet/scss" lang="scss">
	#find {
		text-align: center;
		.loaing-dialog {
			width: 150px;
			height: 100px;
			position: absolute;
			background-color: rgba(0, 0, 0, 0.8);
			top: 50%;
			left: 50%;
			transform: translateX(-50%) translateY(-50%);
			border-radius: 10px;
			overflow: hidden;
			.loading-icon {
				margin-top: 20px;
				width: 30px;
			}
			.loading-text {
				margin-top: 10px;
				color: rgba(255, 255, 255, 0.8);
			}
		}
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
			.upload-input {
				display: inline-block;
				width: 102px;
				height: 102px;
				position: absolute;
				opacity: 0;
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
			height: 520px;
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
				height: 480px;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				.result-item {
					width: 100px;
					height: 140px;
					margin-left: 10px;
					margin-right: 10px;
					.item-pic {
						width: 100px;
						height: 100px;
						background-size: 100% 100%;
						background-repeat: no-repeat;
						background-image: url('../assets/people.png');
					}
					.item-intro {
						margin-top: 5px;
						height: 35px;
						width: 100px;
						text-align: left;
					}
				}
			}
		}
	}
</style>
