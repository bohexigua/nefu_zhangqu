<template>
  <div id="campus">
    <div id="campus-map"></div>
  </div>
</template>

<script>
    import {utils} from '../common/js/utils'

    export default {
      name:'campus',
      components:{
      },
      data(){
				return {
				}
      },
      created(){
      },
      mounted(){
        const map = new AMap.Map('campus-map',{
            resizeEnable: true,
            zoom: 10,
            center: [116.480983, 40.0958]
        });
      },
      activated(){
      },
      updated(){
      }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

#campus{
	#campus-map {
		width: 100%;
		height: 400px;
	}
}
</style>
