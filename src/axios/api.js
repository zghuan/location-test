import { fetch } from "./fetch"; //引用fetch.js
import api from './url'; //引用url.js
import { Indicator,MessageBox } from 'mint-ui'; //引入提示工具


//商品评论列表
export function getEvaluateGoodsWebList(goodsId) {
  //Indicator.open();
  return fetch({
    url: api.getEvaluateGoodsWebList,
    method: 'GET',//请求方法
    params:{
       goodsId//传过去的参数
    }
  })
}