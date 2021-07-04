<template>
	<div class="store">
		<mt-swipe :auto="auto" @change="handleChange" ref="swipe">
		  	<mt-swipe-item v-for="(list,index) in listData" :key="list.id" :data-index="index">
				  <img :src="list" alt="" style="width:100%;height:100%" >
			</mt-swipe-item>
			<mt-swipe-item v-if="listData == null">
				  <img src="../../../static/no_store.png" alt=""  style="width:100%;height:100%">
			</mt-swipe-item>
		  	<mt-swipe-item v-for="list in listData" :key="list.id" v-else>
	 			<div class="iamge_view_wsh" @click="openImageView" :style="{'background':'url('+list+') no-repeat','width':'100%','height':'100%','background-position':'center','background-size':'cover'}"></div>
				<!-- <img :src="list" alt=""  style="width:100%;height:100%" > -->
			</mt-swipe-item>
		</mt-swipe>
		<!-- 图片预览 -->
		<mt-popup v-model="imageView" popup-transition="popup-fade">
			<span v-if="listData == null"></span>
			<img :src="listData[this.index]" v-else alt="" class="view_image" @click="closeImageView" @touchmove="changeImage2" @touchstart="changeImage1">
		</mt-popup>
		<div class="box">
			<span style="font-size:0.4rem;color:rgb(66,68,88)">{{name}}</span>
			<span style="font-size:0.37rem;color:rgb(225,11,80)">{{price}}GMCC</span>
		</div>
		<div class="address">
			<div class="address_zgh" @click="checkAddress">
				<img src="../../../static/address.png" alt="" style="width:0.32rem;height:0.4267rem;float:left;">
				<span style="font-size:0.37rem;color:rgb(66,68,88);">&nbsp;&nbsp;距离</span>
				<span style="font-size:0.42rem;color:rgb(66,68,88);">{{distance | filterDistance}}</span>
				<div style="width:2px;height:100%;display:inline-block;background:#000;"></div>
				<div class="detail_address">
						{{result}}
				</div>
			</div>
			<div class="address_phone" @click="checkPhone">
				<img src="../../../static/phone.png" alt="" style="width:0.48rem;height:0.48rem;">
			</div>
		</div>
		<div style="height:0.266rem;background:#f8f8f9;"></div>
		<div class="text">店铺描述</div>
		<div class="content">
		 	{{desc}}
		</div>
			<div class="openStore">
                <button @click="transfer">向商家转账</button>
            </div>
		
	</div>
</template>
<script>
import { Indicator,Toast,MessageBox  } from 'mint-ui';
import $ from 'jquery';
export default {
	
    data(){
        return{
			auto:4000,
			imageView:false,
			index:0,
		   phone:21313213132,
		   userId:'',
		   name:'',
		   price:'',
		   distance:'',
		   listData:'',
		   result:'',
		   desc:'',
		   wallet_address:'',
		   startX:0,
		   endX:0,
        }
	},
	created(){
		var url = window.location.href
		var z = url.substring(url.lastIndexOf('/')+1)
		this.userId = z.split('&')[0]
		this.distance = z.split('&')[1]
		//console.log(this.userId)
		//this.distance = sessionStorage.getItem('distance')
	},
	mounted(){
		this.storeDeatil()
	},
	methods:{
	//进入店铺详情
		storeDeatil(){
            this.$http({
                method: 'POST',
                url: $fn.apiHost +'merchant/get',
                params:{userId:this.userId},
              })
                .then((res)=>{
					//console.log(res)
					 this.listData = res.data.result.iterior
					 this.name = res.data.result.merchant.name
					 this.price = res.data.result.merchant.price
					 this.result = res.data.result.merchant.province+ res.data.result.merchant.city+ res.data.result.merchant.country+res.data.result.merchant.address
					 this.desc = res.data.result.merchant.desc
					 this.phone = res.data.result.merchant.phone
					 this.wallet_address = res.data.result.merchant.walletAddress
					 sessionStorage.setItem('lng',res.data.result.merchant.longitude)
					 sessionStorage.setItem('lat',res.data.result.merchant.latitude)
					 sessionStorage.setItem('address',this.result)
					 //console.log(this.wallet_address)
                })
                .catch(err=> {
                  console.log(err)
                })
		},
	//查看商家电话
		checkPhone(){
			MessageBox({
				confirmColor:'#3dc5d1',
				title: '商家电话',
				message: this.phone,
				showCancelButton: false
				})
			// .then(a => {
			// 		window.webkit.messageHandlers.ToPhone.postMessage({phone: this.phone});
			// 	});
		},
	//查看地址
		checkAddress(){
			this.$router.push({path:'/opened_address'})
		},
	//向商家转账
		transfer(){
			var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if(isAndroid==true){
				window.android.transfer(this.wallet_address)
            }else if(isiOS == true){
              window.webkit.messageHandlers.ToTransfer.postMessage({transferAddress: this.wallet_address});
            }
		},
	//打开图片预览
		openImageView(){
			this.imageView = true
			this.$refs.swipe.clearTimer()
		},
	//关闭图片预览
		closeImageView(){
			this.imageView = false
			this.$refs.swipe.initTimer()
		},
	//切换图片
		changeImage1(e){
			this.startX = e.touches[0].pageX
		},
		changeImage2(e){
			this.endX = e.touches[0].pageX
			console.log(this.endX > this.startX)
			if(this.endX > this.startX){
				this.$refs.swipe.prev()
			}else{
				this.$refs.swipe.next()
			}
		},
	//轮播图index
		handleChange(i) {
			this.index = i
  		},
	},
	filters:{
		filterDistance(e){
			if(e>=1000){
				return  parseFloat(e/1000).toFixed(2) + 'km'
			}else{
				return e+'m'
			}
		}
	}
   
}
</script>
<style scoped>
.store{
	background: #fff;
	height: 100%;
}
	.mint-swipe{
		height: 6.28rem;
	}
	.box{
		height: 1.6rem;
		display: flex;
		flex-direction: column;
		padding: 0.4rem;
	}
	.box span{
		flex:1;
		line-height: 0.8rem;
	}
	.text{
		padding: 0.32rem;
		border-bottom: 0.5px solid rgba(0,0,0,0.12);
		font-size:12px;
		color:#495060;
	}
	.address{
		padding: 0 0.4rem;
		display: flex;
		align-items: center;
	}
	.address_zgh{
		flex:10;
		width: 94%;
		padding: 0.13rem 0;
	}
	.address_phone{
		flex:1;
		display: flex;
		justify-content: flex-end;
		border-left: 0.5px solid rgba(0,0,0,0.12);
		height: 0.8rem;
		align-items: center;
	}
	.content{
		padding: 0.4rem;
		color:rgb(66,68,88);
		font-size: 0.4rem;
		margin-bottom: 2.13rem;
	}
	.openStore{
       	display: flex;
       	justify-content: center;
		position: fixed;
		bottom:0.53rem;left:0;right:0;
		text-align: center;
    }
    .openStore button{
        width: 4.8rem;
        height: 1.173rem;
        border-radius: 0.133rem;
        background: #3dc5d1;
        outline: none;
        color:#fff;
        font-size: 0.37rem;
	
    }
    .detail_address{
    	-webkit-line-clamp: 1;
        display: -webkit-box;
        -webkit-box-orient:vertical;
      	font-size:0.37rem;
      	color:rgb(66,68,88);
      	width:100%;
      	overflow: hidden;
    }
<<<<<<< HEAD
 .modal{
       width: 100%;
       height: 100%;
       position: fixed;
       z-index: 99999;
       background: rgba(0,0,0,1);
   }
  .modal img{
       max-width: 100%;
       max-height: 100%;
      position: absolute;
      margin:auto;
      left:0;right: 0;top: 0;bottom: 0;
   }
</style>
=======
	.view_image{
		max-width: 100%;
		max-height: 100%;
      position: absolute;
      margin:auto;
      left:0;right: 0;top: 0;bottom: 0;
	}
	.mint-popup{
		width: 100%;
		height: 100%;
		background: #000;
	}
	.change_page{
		
		color: #fff;
	}
	.image_view_wsh{
		width:100%;height:100%;background-position:center;background-size:cover;
	}
</style>
<style>
	.mint-msgbox-confirm{
		color:#3dc5d1;
	}
</style>
>>>>>>> 4e01c6b50849905c61b3570d7872597ebd3eb97d
