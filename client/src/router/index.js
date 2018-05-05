import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import campus from '@/components/campus'
import find from '@/components/find'
import my from '@/components/my'
import page404 from '@/components/page404'
import search from '@/components/search'
import login from '@/components/login'
import update from '@/components/update'
import news from '@/components/news'

Vue.use(Router)

const newsDetails = resolve => require(['@/components/newsDetails'],resolve);

export default new Router({
  routes: [
      // 嵌套路由设置，此处不适用嵌套路由
      // {path: '/index', name:'index', component: index,
      //   children:[
      //       {path: '/index/newsDetails/:id', name: 'newsDetails',component:newsDetails },
      //   ]
      // },

      {path: '/index', name:'index', component: index},
      {path: '/campus', name:'campus', component: campus},
      {path: '/find', name:'find', component: find},
      {path: '/my', name:'my', component: my},
      {path: '/newsDetails/:id', name: 'newsDetails',component: newsDetails },
      {path: '/search', name: 'seach',component: search },
      {path: '/login', name: 'login', component: login},
      {path: '/update', name: 'update', component: update},
      {path: '/news', name: 'news', component: news},

      {path: '*',component: page404},   //当匹配不到合适的路由会跳转到 404 页面
      {path: '/',redirect: '/index'},   // 跳转路由，默认显示路由页面

  ],
    'linkActiveClass':'active'  //为路由匹配激活link-active，方便设置类
})
