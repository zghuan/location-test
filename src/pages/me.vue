<template>
    <div class="me">
        <div style="height:0.4rem;"></div>
            <div class="top">
                <div class="information">
                    <img :src="avatar" alt="头像" class="avatar">
                    <span class="nickname">{{nickName}}</span>
                </div>
                <div class="func">
                    <div class="money flex" @click="myMoney">
                        <img src="../../static/money.png" alt="我的资产">
                        <span >我的资产</span>
                    </div>
                    <div class="order flex" @click="$router.push({path:'/order'})">
                        <img src="../../static/order.png" alt="我的订单">
                        <span>我的订单</span>
                    </div>
                    <div class="friend flex" @click="inviteFriend">
                         <img src="../../static/friend.png" alt="邀请好友">
                        <span>邀请好友</span>
                    </div>
                </div>
            </div>
        <div style="height:0.4rem;"></div>
            <mt-swipe :auto="4000"  class="swipe" :show-indicators="false">
                <mt-swipe-item v-for="list in imageList" :key="list.id">
                <!-- <a :href="list.source"> -->
                    <img :src="http+list.thumb" alt="">
                <!-- </a> -->
                </mt-swipe-item>
            </mt-swipe>
        <div style="height:0.4rem;"></div>
            <div class="bottom" v-if="isOpen">
                <div class="store">
                    <img src="../../static/store.png" alt="">
                    <span>我的店铺</span>
                </div>
                <div class="progress">
                    <div class="progress_flex">
                        <span class="num">1</span>
                        <span class="text">成功开店</span>
                    </div>
                    <img src="../../static/right_blue.png" alt="">
                    <div class="progress_flex">
                        <span class="num">2</span>
                        <span class="text">消费体验</span>
                    </div>
                    <img src="../../static/right_blue.png" alt="">
                    <div class="progress_flex">
                        <span class="num">3</span>
                        <span class="text">币值收益</span>
                    </div>
                </div>
                <div class="openStore">
                    <button @click="goOpenStore">{{status}}</button>
                </div>
                <div class="remind">
                    <span>{{msg}}</span>
                </div>
            </div>
            <div class="bottom bottom_height" v-else>
                <div class="store">
                    <img src="../../static/store.png" alt="">
                    <span>我的店铺</span>
                </div>
                <div class="store_msg">
                    <img :src="store_avatar" alt="">
                    <span>{{store_name}}</span>
                </div>
                <div class="store_earn">
                    <div class="earn">
                        <span style="color:#495060;">店铺总收入</span>
                        <span class="num_count">{{store_earn}}</span>
                    </div>
                    <div class="count">
                        <span style="color:#495060;">收款笔数</span>
                        <span class="num_count">{{store_count}}</span>
                    </div>
                </div>
                <div class="openStore">
                    <button @click="goMyMall">进入我的小店</button>
                </div>
            </div>
    </div>
</template>
<script>
import $ from 'jquery';
import bg from '../assets/bg.png';
import { Indicator,Toast,MessageBox } from 'mint-ui';
export default {
    data(){
        return{
            code:'', //状态码
            status:'立即开店',
            msg:'共享海量活跃用户，助力经营',
            isOpen:true,
            avatar:require('../../static/person.png'),
            nickName:'',
            store_avatar:'',
            store_name:'',
            store_earn:0, //店铺总收入
            store_count:0, //收款笔数
            userId:'', //用户id
            msg:'',//错误消息
            limit:10,//轮播图列表
            imageList:[], //图片列表
            http:'http://hart-avatar.oss-cn-hongkong.aliyuncs.com/avatar/'
        }
    },
    created(){
        var url = window.location.href;
            this.userId = url.split('=')[1];
             console.log(this.userId)
             localStorage.setItem('userId',this.userId);
             this.getMyMall(); //获取我的商铺
             this.getLunboto() //获取轮播图
    },
    methods:{
    //进入我的资产
        myMoney(){
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if(isAndroid==true){
              
                window.android.myAssets()
            }else if(isiOS == true){
              
               window.webkit.messageHandlers.ToAssets.postMessage("");
            }
            console.log('进入我的资产',isAndroid,isiOS)
        },
    //进入邀请好友
        inviteFriend(){
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if(isAndroid==true){
                window.android.inviteFriends()
            }else if(isiOS == true){
               window.webkit.messageHandlers.InviteFriend.postMessage("");
            }
            
        },
    //立即开店
        goOpenStore(){
            if(this.code ==10){
                Toast({
                        message: '店铺正在审核，请耐心等待',
                        position: 'middle',
                        duration: 2000
                     })
            }else if(this.code == 9){
                this.$router.push({path:'/store_bussiness_license'})
            }else if(this.code == 500){
                this.$router.push({path:'/store_information'}) 
            }else if(this.code ==1){
                Toast({
                        message: '您更新的店铺信息正在审核，请耐心等待',
                        position: 'middle',
                        duration: 2000
                     })
            }else if(this.code ==2){
                this.status = '重新开店'
                this.$router.push({path:'/store_information'})
            }else{
                Toast({
                        message: res.data.msg,
                        position: 'middle',
                        duration: 2000
                     })
                this.$router.push({path:'/store_information'}) 
            }

        },
    //获取我的店铺
       getMyMall(){
            this.$http({
                method: 'POST',
                url: $fn.apiHost +'merchant/get',
                params:{userId:this.userId},
              })
                .then((res)=>{
                    console.log(res)
                    if(res.data.result.avatar == 'art.png'){
                        console.log(' ')
                    }else{
                        this.avatar = res.data.result.avatar
                    }
                    this.nickName = res.data.result.nickName
                    this.code = res.data.code
                    //是否已开店
                    if(res.data.code == 0){
                        this.isOpen = false //打开店铺
                        this.store_avatar =  res.data.result.merchant.exterior.split('_')[0]
                        this.store_name =  res.data.result.merchant.name //店铺名
                        this.store_count = res.data.result.count //收款笔数
                        this.store_earn = res.data.result.amount //店铺总收入
                    }else if(res.data.code == 10){
                        this.status = '待审核...'  //开店审核中
                    }else if(res.data.code == 1){
                        this.status = '待审核...'  //店铺更新待审核
                    }else if(res.data.code == 2){
                        this.msg = '审核失败，'+ res.data.result.reason   //开店审核失败
                    }else if(res.data.code ==3){
                        MessageBox.confirm(
                            res.data.result.reason, 
                            res.data.msg,
                           ).then(a => {
                            this.confirmUpdateRes()
                          //  console.log(a)
                        });
                            this.isOpen = false //打开原来的店铺
                            this.store_avatar =  res.data.result.merchant.exterior.split('_')[0]
                            this.store_name =  res.data.result.merchant.name
                            this.store_count = res.data.result.count //收款笔数
                            this.store_earn = res.data.result.amount //店铺总收入
                    }
                })
                .catch(err=> {
                  console.log(err)
                })
        },
    //用户确认收到信息
        confirmUpdateRes(){
            this.$http({
                method: 'POST',
                url: $fn.apiHost +'merchant/confirmUpdateRes',
                params:{userId:this.userId},
              })
                .then((res)=>{
                    console.log(res)
                   
                })
                .catch(err=> {
                  console.log(err)
                })
        },
    //获取轮播图
        getLunboto(){
            this.$http({
                method: 'GET',
                url: $fn.apiHost +'web/news/list/'+1+"/"+this.limit,
              })
                .then((res)=>{
                  //console.log(res)
                  var zgh = []
                  zgh = res.data.result.records
                  zgh.forEach((e,i) => {
                     this.imageList.push(e)
                  });
                 
                })
                .catch(err=> {
                  console.log(err)
                })
        },
    //进入我的店铺
        goMyMall(){
            this.$router.push({path:'/my_mall'})
        }
        
    }
}
</script>

<style scoped>
.me{
    width: 100%;
    height: 100%;
}
    .top{
        width: 90%;
        height: 5.866rem;
        margin:0 auto;
        background: url('../assets/bg.png') no-repeat;
        background-size: 100% 100%;
        border-top-left-radius:5px;
        border-top-right-radius:5px;
       

    }
    .information{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.4rem 0;
    }
    .information img{
        width: 1.97rem;
        height: 1.97rem;
    }
    .information span{
        margin-top: 0.4rem;
        color:#fff;
    }
    .money img{
        width: 0.61rem;
        height: 0.61rem;
    }
    .order img{
        width: 0.546rem;
        height: 0.61rem;
    }
    .friend img{
        width: 0.76rem;
        height: 0.56rem;
    }
    .func{
        margin-top: 0.2667rem;
        display: flex;
        color:#fff;
    }
    .func div{
        flex:1;
    }
    .func span{
        margin-top: 0.2667rem;
    }
    .flex{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    /*轮播图*/
    .swipe{
        height:4rem;
        width: 90%;
        margin:0 auto;
    }
    .swipe img{
        height:4rem;
        width: 100%;
    }
    /*bottom*/
    .bottom{
        width: 90%;
        height:5.44rem;
        margin:0 auto 0.6rem auto;
        background: #fff;
        border-radius: 5px;
        box-shadow: 0 0 2px #cccccc; 
    }
    .store{
       display: flex;
       align-items: center;
       font-size: 14px;
       color:#495060;
    }
    .store img{
        width: 0.4rem;
        height: 0.4rem;
        margin: 0.4rem;
    }
    .progress{
        margin: 0.2667rem 0;
        display: flex;
        align-items: center;
    }
    .progress img{
        width: 0.2667rem;
        height: 0.4rem;
        vertical-align: middle;
    }
    .progress_flex{
        flex:1;
        display:flex;
        align-items: center;
        flex-direction: column;
    }
    .num{
        font-size: 24px;
    }
    .text{
        color: #495060;
    }
    .openStore{
       display: flex;
       justify-content: center;
       padding:0.266rem 0;
    }
    .openStore button{
        width: 3.04rem;
        height: 0.906rem;
        border-radius: 5px;
        background: #3dc5d1;
        outline: none;
        color:#fff;
        font-size: 14px;
    }
    .remind{
       height: 0.8rem; 
       line-height: 0.8rem;
        color:rgb(225,117,80);
        font-size: 12px;
        text-align: center;
    }
    /*had store*/
    .store_msg{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    .store_msg img{
        width: 1.33rem;
        height: 1.33rem;
    }
    .store_msg span{
        color:rgb(66,68,88);
        font-size: 16px;
        font-weight: bold;
        margin:0.2667rem 0 ;
    }
    .store_earn{
        display: flex;
        margin: 0.2667rem 0;
    }
    .earn{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex:1;
    }
    .count{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex:1
    }
    .num_count{
         color:rgb(66,68,88);
         font-size: 15px;
         font-weight: bold;
    }
    .bottom_height{
        height: 6.667rem;
    }
    .avatar{
        border-radius: 50%;
    }
    .nickname{
        font-size: 16px;
    }
</style>
