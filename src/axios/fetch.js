import axios from 'axios';//引入axios
import { Indicator, MessageBox } from 'mint-ui'; //引入提示工具
import router from '../router';


export const ajaxUrl = 'http://192.168.10.191:8484/v1';
//export const ajaxUrl = 'http://192.168.10.127';

export function fetch(options){
  return new Promise((resolve, reject) => {
    const instance = axios.create({  //instance创建一个axios实例，可以自定义配置，可在 axios文档中查看详情
      //所有的请求都会带上这些配置，比如全局都要用的身份信息等。
      baseURL: ' http://vw7iih.natappfree.cc',
      //baseURL: 'http://192.168.10.127',
      baseURL: ajaxUrl,

      headers: {
        'Content-Type': 'application/json',
        // 'token_in_header': global_.token,//token从全局变量那里传过来
      },
      timeout:30 * 1000 // 30秒超时
    });

    //返回状态判断(添加响应拦截器)
    instance.interceptors.response.use(
      res => {
        //console.log('正常返回值：',res);
        return res;
      },
      error => {
        if(error.response) {
          console.log('错误返回值：',error.response.status ,error.response.data.message);

          switch(error.response.status) {
            case 500:
               MessageBox.alert('服务器发生错误，请稍后重试', '错误提示');
            break;
          }
        }
      }
    );

    instance(options)
      .then(response => { //then 请求成功之后进行什么操作
        //把请求到的数据发到引用请求的地方
        if(response) {
          resolve(response.data);
        }
        else {
          resolve(response);
        }
        Indicator.close();
      })
      .catch(error => {
        console.info('请求异常，信息：',error);
        Indicator.close();
        reject(error);
      });
  });
}
