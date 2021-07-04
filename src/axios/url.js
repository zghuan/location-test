

export default {
  //接口配置
  getEvaluateGoodsWebList: '/evaluateGoodsWeb/getEvaluateGoodsWebList',//商品评论列表
  insertCart: '/cartWeb/insertCart',//加入商品到购物车
  getWebGoodsList: '/goodsWeb/getWebGoodsList',//商品列表
  getWebGoodsDetail: '/goodsWeb/getWebGoodsDetail',//商品详情
  newUserCollect: '/userCollectWeb/newUserCollect',//收藏商品
  getUserCollectGoodsList: '/userCollectWeb/getUserCollectGoodsList',//商品收藏列表
  removeUserCollect: '/userCollectWeb/removeUserCollect',//取消收藏
  getShoppingRecordList: '/browseRecordWeb/getShoppingRecordList',//获取足迹记录
  deleteBrowseRecord: '/browseRecordWeb/deleteBrowseRecord',//删除足迹记录
  cancelCart:'/cartWeb/cancelCart',//批量删除购物车
  getAdminBrandList:'/brand/getAdminBrandList',//获取所有的品牌列表
  getKeywordGoodsList:'/goodsWeb/getKeywordGoodsList',//关键字搜索的商品列表
  getMainCategoryList:'/categoryWeb/getMainCategoryList',//获取商城一级商品分类列表
  getAdList: '/adWeb/getAdList',//广告列表(首页轮播图)
  getAddressById: '/userAddressWeb/getAddressById',//获取单个地址详情
  getSonAreas: '/areasWeb/getSonAreas',//获取所有省份
  addAddress: '/userAddressWeb/addAddress',//新增用户地址
  getMainAreas: '/areasWeb/getMainAreas',//获取国家（一级地区）
  sendValiteCode: '/sendSmsWeb/sendValiteCode',//获取注册验证码
  userRegister: '/userWeb/userRegister',//用户注册
  userLogin: '/userWeb/userLogin',//用户登录
  getDefaultAddress: '/userAddressWeb/getDefaultAddress',//获取用户默认地址
  addWebOrder: '/orderWeb/addWebOrder',//创建订单
  getSonCategoryList: '/categoryWeb/getSonCategoryList',//获取二级分类
  getAddressList: '/userAddressWeb/getAddressList',//获取用户地址列表
  delAddress: '/userAddressWeb/delAddress',//删除用户地址
  editAddress: '/userAddressWeb/editAddress',//修改用户地址
  getUserById: '/userWeb/getUserById',//
  modifyUserBase: '/userWeb/modifyUserBase',//

  //--------勋保-----
  getCategory: '/categoryWeb/getCategory',
}


//也可以像下面这样，区分环境或者区分服务器等等
// let service = 'dev';
// // let service = 'prod';
// let api = '';
// if (service === 'dev') {
//   /**dev开发**/
//   api = '/stomatology/patient';
// } else if (service === 'prod') {
//   /**prod部署**/
//   api = '/proxy/client';
// }
//
// export default {
//   /**个人中心start**/
//   //1 获取c端个人信息 POST /wx/getClientInfo
//   getClientInfo: `${api}/wx/getClientInfo`,
//   //2 获取手机注册验证码 POST /wx/getClientRegisterCode
//   getClientRegisterCode: `${api}/wx/getClientRegisterCode`,
//   //3 绑定手机号 POST /wx/clientBindMobile
//   clientBindMobile: `${api}/wx/clientBindMobile`,
//   /**个人中心end**/
//
// }
