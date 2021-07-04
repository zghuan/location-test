import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/gmcc',
    },
    {
      path:'/gmcc', //首页
      name: 'gmcc',
      component: resolve =>import('@/pages/gmcc')
    },
    {
      path:'/o2o', //o2o
      name: 'o2o',
      component: resolve =>import('@/pages/o2o')
    },
    {
      path:'/opened_address', //已开店的地址
      name: 'opened_address',
      component: resolve =>import('@/pages/o2o/opened_address')
    },
    {
      path:'/me', //个人
      name: 'me',
      component: resolve =>import('@/pages/me')
    },
    {
      path:'/my_mall', //我的店铺
      name: 'my_mall',
      component: resolve =>import('@/pages/me/my_mall')
    },
    {
      path:'/update_store', //更新我的店铺信息
      name: 'update_store',
      component: resolve =>import('@/pages/me/update_store')
    },
    {
      path:'/store_information', //完善门店信息
      name: 'store_information',
      component: resolve =>import('@/pages/me/store_information')
    },
    {
      path:'/store_address', //门店地址
      name: 'store_address',
      component: resolve =>import('@/pages/me/store_address')
    },
    {
      path:'/store_bussiness_license', //营业执照
      name: 'store_bussiness_license',
      component: resolve =>import('@/pages/me/store_bussiness_license')
    },
    {
      path:'/submit_check', //提交审核
      name: 'submit_check',
      component: resolve =>import('@/pages/me/submit_check')
    },
    {
      path:'/store/:storeId', //商家店铺
      name: 'store_mall',
      component: resolve =>import('@/pages/o2o/store')
    },
    {
      path:'/order', //我的订单
      name: 'order',
      component: resolve =>import('@/pages/me/order')
    },
    {
      path:'/order_detail/:orderId', //订单详情
      name: 'order_detail',
      component: resolve =>import('@/pages/me/order_detail')
    },
  ]
})
