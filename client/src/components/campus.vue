<template>
  <div id="campus">
    <div id="campus-map"></div>
    <div class="map-intro">
      <p class="intro-title">地图 poi 定位点（林大地标）简介：</p>
      <p>经纬度：{{posX}}, {{posY}}</p>
      <p>地点简介：{{ intro }}</p>
    </div>
    <div class="new_wrap">
      <div class="news_title">
        东北林业大学近日新闻
      </div>
      <p class="line"></p>
      <ul class="news_content">
        <li class="news_item" v-for="(item, index) in campusNews" @click="jumpToNews(item.link)">
          <div v-if="index">
            <span class="news-item-seq"></span>
            <span class="news-item-title">{{ item.title }}</span>
            <span class="news-item-date">{{ item.date }}</span>
          </div>
          <div v-else>
            <img :src="item.pic" alt="" class="news-item-pic">
            <span class="news-item-title">{{ item.title }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name:'campus',
    components:{
    },
    computed: {
      ...mapState({
        mapInfos: s => s.mapInfos,
        campusNews: s => s.campusNews
      }),
    },
    data(){
      return {
        posX: 126.634623,
        posY: 45.720335,
        intro: '东北林业大学' 
      }
    },
    methods: {
      markerClick(e) {
        const pos = e.target.getPosition();
        const content = e.target.content;
        this.infoWindow.setContent(content);
        this.infoWindow.open(this.map, pos);
        this.intro = content;
        this.posX = pos.O;
        this.posX = pos.P;
      },
      jumpToNews(url) {
        window.location.href = url;
      }
    },
    created() {
      this.$store.dispatch('getMapInfos');
      this.$store.dispatch('getNews');
    },
    mounted() {
      this.map = new AMap.Map('campus-map', {
        pitch: 75,
        viewMode: '3D',
        zoom: 17,
        expandZoomRange: true,
        zooms: [3, 20],
        center: [126.634623, 45.720335]
      });
    },
    activated() {
    },
    updated() {
      const lnglats = [];
      if (this.mapInfos.mapInfos) {           // 放空警报
        for (let i = 0; i < this.mapInfos.mapInfos.length; i++) {
          let item = this.mapInfos.mapInfos[i];
          lnglats.push({
            position: [item.map_point_x, item.map_point_y],
            content: item.map_point_intro
          });
        }
      }
      this.infoWindow = new AMap.InfoWindow();
      for(let i = 0, marker; i < lnglats.length; i++){
        marker = new AMap.Marker({
          position: lnglats[i].position,
          map: this.map
        });
        marker.content = lnglats[i].content;
        // 给Marker绑定单击事件
        marker.on('click', this.markerClick);
      }
      this.map.setFitView();
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

#campus{
  .new_wrap {
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 20px;
    box-shadow: 0 -3px 5px rgba(220, 220, 220, 1);
    text-align: center;
    margin-bottom: 80px;
    .news_title {
      height: 40px;
      font-size: 14px;
      font-weight: bold;
      line-height: 40px;
    }
    .line {
      height: 1px;
      background-color: rgba(200, 200, 200, 1);
    }
    .news_content {
      margin-top: 20px;
      .news_item {
        margin-top: 10px;
      }
      .news-item-pic {
        width: 100px;
      }
      .news-item-seq {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: rgba(0, 121, 202, 1);
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }
      .news-item-title {
        display: inline-block;
        width: 240px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        text-align: left;
      }
    }
  }
  .map-intro {
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    .intro-title {
      margin-bottom: 5px;
      font-size: 16px;
      font-weight: bolder;
    }
  } 
	#campus-map {
		width: 100%;
		height: 350px;
	}
}
</style>
