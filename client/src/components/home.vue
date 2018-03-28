<template>
  <div class="page-wrap">
    <header class="header am-flexbox"></header>
    <div class="content-wrap am-flexbox-item"></div>
    <footer class="footer" @click="onchangeSelected">
      <div class="icon icon-home" :class="{ 'selected': home }" ref="home"></div>
      <div class="icon icon-address" :class="{ 'selected': address }" ref="address"></div>
      <div class="icon icon-interactive" :class="{ 'selected': interactive }" ref="interactive"></div>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      home: true,
      address: false,
      interactive: false
    }
  },

  methods: {
    onchangeSelected(e) {
      const elem = e.target;
      if (elem === this.$refs.home
      || elem === this.$refs.address
      || elem === this.$refs.interactive) {
        this.home = false;
        this.address = false;
        this.interactive = false;
      }
      if (elem === this.$refs.home) {
        this.home = true;
      } else if (elem === this.$refs.address) {
        this.address = true;
      } else if (elem === this.$refs.interactive) {
        this.interactive = true;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .header {
    width: 100%;
    height: 45px;
    background-color: rgba(20, 125, 230, 1);
    position: fixed;
    top: 0;
  }
  .content-wrap {
    margin-top: 45px;
  }
  .footer {
    width: 100%;
    height: 50px;
    background-color: rgba(255, 255, 255, 1);
    position: fixed;
    bottom: 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 30px;
      height: 30px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .icon-home {
      background-image: url('../assets/homepage.png');
    }
    .icon-address {
      background-image: url('../assets/addressbook.png');
    }
    .icon-interactive {
      background-image: url('../assets/interactive.png');
    }
    .selected.icon-home {
      background-image: url('../assets/homepage_fill.png');
    }
    .selected.icon-address {
      background-image: url('../assets/addressbook_fill.png');
    }
    .selected.icon-interactive {
      background-image: url('../assets/interactive_fill.png');
    }
  }
</style>
