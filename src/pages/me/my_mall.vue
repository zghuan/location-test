<template>
	<div class="my_mall">
		<div class="name">
			<img :src="store_avatar" alt="" style="width:1.76rem;height:1.76rem;">
			<span>{{name}}</span>
		</div>
		<div class="address list">
			<img src="../../../static/address.png" alt="">
			<span>{{address}}</span>
		</div>
		<div class="phone list">
			<img src="../../../static/phone.png" alt="">
			<span>{{phone}}</span>
		</div>
		<div class="address list" style="align-items:start">
			<img src="../../../static/o2o.png" alt="">
			<span>
                {{desc}}
				<br><img src="../../../static/edit.png" alt="">
				<span style="color:#3dc5d1;margin:0" @click="openMallDeatil">编辑店铺描述</span>
			</span>
		</div>
        <mt-popup
                v-model="popupMall"
                position="right"
                class="popup"
                popup-transition="popup-slide"
                >
                <mt-header title="店铺描述" style="background:#56dbd7">
                    <div slot="left" @click="popupMall = false">
                        <mt-button icon="back"></mt-button>
                    </div>
                </mt-header>
                <div class="desc">
                    <div>店铺描述</div>
                    <textarea v-model="desc"></textarea>
                </div>
                <div class="submit" style="margin:0.533rem auto">
                    <button @click="submitMallDetail">完成</button>
                </div>
            </mt-popup>
		<div style="height:0.4rem;background:#f8f8f9;"></div>
		<div class="li" @click="openMallPrice">
			<span>热销商品价格</span>
			<div>
				<span>{{price}}GMCC</span>
				<img src="../../../static/right.png" alt="">
			</div>
			
		</div>
            <mt-popup
                v-model="popupPrice"
                position="right"
                class="popup"
                popup-transition="popup-slide"
                >
                <mt-header title="热销商品价格" style="background:#56dbd7">
                    <div slot="left" @click="popupPrice = false">
                        <mt-button icon="back"></mt-button>
                    </div>
                </mt-header>
                <div class="list" style="text-align:center">
                    <span>请输入</span>
                    <input v-model="price" style="height:50%;" placeholder="请输入价格">
                    <span>GMCC</span>
                </div>
                <div class="submit" style="margin:0.53rem auto">
                    <button @click="submitGoodsPrice">完成</button>
                </div>
            </mt-popup>
		<div style="height:0.4rem;background:#f8f8f9;"></div>
		<div class="text">
			<span>已上传商品</span>
		</div>
	<!-- 照片 -->
		<div class="add_image">
            <div class='border' v-for="(list,index) in headImageView" :key="list.id" :data-index="index">
                <img :src='list' class="view_image"  @click="imageView(index)">
                <img src='../../../static/del.png' v-if="index !== 0"  class="del_img" @click='deleteImage1(index)' >      
            </div>
             <!-- <div class="modal" v-show="isImageView" @click="closeImageView">
                <img :src="iterior[this.index]" alt="">
            </div>  -->
            <div class='border' v-if="showAdd">
                <img src='../../../static/add.png' style="width:0.64rem;height:0.64rem;">
                <span style="margin-top:5px;">添加照片</span>
                <input 
                    type="file" 
                    id="xdaTanFileImg"  
                    multiple 
                    accept="image/*"
                    name="file" 
                    @change="addImage1"/>
            </div>
        </div>
       <div class="update">
            <button @click="update">更新店铺信息</button>
        </div>
	</div>
</template>
<script>
import { Indicator, Toast } from 'mint-ui';

	export default {
    data(){
        return{
            zghzgh:true,
            params:new FormData(),
        	iterior:[],
           // headImageData:[],
            longitude:'',
            latitude:'',
        	isImageView:false,
        	showAdd:true,
            index:0,
            name:'',
            address:'',
            phone:'',
            desc:'',//描述
            price:'',
            popupPrice:false,
            popupMall:false,
            store_avatar:[], //门店第一张
            exterior:[], //
            files:[], //文件域
            headImageView:[], //渲染的内景照片
            newHeadImageData: [], //新增的图片file数组
        }
    },
    created(){
        this.userId = localStorage.getItem('userId');
    },
    mounted(){
        this.getMyMall()
    },
    methods:{
    //获取我的店铺
        getMyMall(){
            this.$http({
                method: 'POST',
                url: $fn.apiHost +'merchant/get',
                params:{userId:this.userId},
              })
                .then((res)=>{
                   // console.log(res)
                    var zgh = res.data.result.merchant.exterior.split('_');
                    zgh.splice(zgh.length-1,1);
                    this.exterior = zgh //外景照片保持不变
                    this.store_avatar =  zgh[0] //预览第一张
                    this.name = res.data.result.merchant.name
                    this.address = res.data.result.merchant.province+res.data.result.merchant.city+res.data.result.merchant.country+','+res.data.result.merchant.address
                    this.phone = res.data.result.merchant.phone
                    this.desc = res.data.result.merchant.desc
                    this.price = res.data.result.merchant.price
                        var zhy = res.data.result.merchant.iterior.split('_');
                        zhy.splice(zhy.length-1,1);
                    this.headImageView = zhy // 一开始渲染内景照片
                    this.iterior = zhy //最终发送的照片
                })
                .catch(err=> {
                  console.log(err)
                })
        },
    //添加照片
        addImage1(e){
            this.files = e.target.files
            var that = this;
            for(var i=0;i<this.files.length;i++){
                var reader = new FileReader();
                reader.readAsDataURL(this.files[i]); 
                //this.params.append("iterior", this.files[i]);
                this.newHeadImageData.push(this.files[i]);
                //this.iterior.push(this.files[i]);
                reader.onload = function(e){
                that.headImageView.push(e.target.result);                                    
                };          
            }      
        },
    //关闭图片预览
        closeImageView(){
            this.isImageView = false
        }, 
    //删除照片
        deleteImage1(i){
            if(this.headImageView[i].substring(0,4) == 'http') {
                //接口删除图片
                this.$http({
                    url: $fn.apiHost +'merchant/deletePicture',
                    method: 'POST',
                    params: {
                        userId: this.userId,
                        imgs: this.headImageView[i]
                    }
                }).then((res)=>{
                    if(res.data.code == 0){
                        Toast('已删除')
                    }
                })
                .catch(err=> {
                  Toast('删除失败');
                })
            }
            if(this.headImageView[i].substring(0,4) == 'data') {
                //只删除本地图片，不调接口，同时删除newHeadImageData里的同样的照片
                for (var j = 0, num = 0; j < this.headImageView.length; j++) {
                    this.headImageView[j]
                    if(this.headImageView[j].substring(0,4) == 'http') {
                        num++;
                    }
                }
                var index = i-num;
                this.newHeadImageData.splice(index,1);
            }
            this.headImageView.splice(i,1);
           // this.iterior.splice(i,1);
           // var zgh =  this.params.delete("iterior");
            // for(var i=0;i<this.iterior.length;i++){
            //     this.params.append("iterior", this.iterior[i]);
            // }
        },
    //预览放大图片
        imageView(e){
            this.isImageView = true
            this.index = e
        }, 
    //打开热销商品价格
    	openMallPrice(){
    		this.popupPrice = true
        },
    //提交热销商品价格
        submitGoodsPrice(){
            this.popupPrice = false
        },
    //打开店铺描述
        openMallDeatil(){
            this.popupMall = true
            //this.getMyMall()
        },
    //提交店铺描述
        submitMallDetail(){
             this.popupMall = false
        },
    //更新店铺信息
        update(){
            Indicator.open();
            if(this.headImageView.length == 0) {
                return Toast('请添加图片');
            }
                Indicator.close();
                this.params.append("userId", this.userId);
                this.params.append("phone", '');
                this.params.append("price", this.price);
                this.params.append("category", '');
                this.params.append("province",'');
                this.params.append("city", '');
                this.params.append("country", '');
                this.params.append("address", '');
                this.params.append("longitude", '');
                this.params.append("latitude", '');
                this.params.append("identifyName", '');
                this.params.append("identifyNum", '');
                this.params.append("desc", this.desc);
                //this.params.append("iterior",this.iterior);
                this.$http.post($fn.apiHost +'merchant/update',this.params,
                {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    },
                }
              )
                .then((res)=>{
                  //  console.log(res)
                    Indicator.close();
                    if(res.data.code == 0){
                        Toast({
                            message: '提交成功，正在审核',
                            position: 'middle',
                            duration: 2000
                        })
                        this.$router.go(-1)
                    }
                })
                .catch(err=> {
                  Indicator.close();

                  
                });
            this.updatePic();
        },
        updatePic() {
            //更新新增的图片到数据库
            if(this.newHeadImageData.length == 0)  return;
            var data = new FormData();
            data.append("userId", this.userId);
            for (var i = 0; i < this.newHeadImageData.length; i++) {
                data.append("imgs",this.newHeadImageData[i]);
            }
            this.$http({
                url: $fn.apiHost +'merchant/addPicture',
                method: 'POST',
                headers: {'Content-Type': 'multipart/form-data'},
                data: data
            }).then((res)=>{
                if(res.data.code == 0){
                    //Toast('已更新图片')
                }
            })
            .catch(err=> {
              Toast('新增图片失败');
            })
        }
    }
}
</script>
<style scoped>
.my_mall{
	background: #fff;
}
	.name{
		display: flex;
		align-items: center;
		padding: 0.4rem;
	}
	.name span{
		font-size: 16px;
		color:rgb(66,68,88);
		margin-left: 0.2667rem;
	}
	.list{
		padding: 0.133rem 0.4rem;
		display: flex;
		align-items: center;
	}
	.list img{
		width: 0.4rem;
		height: 0.4rem;
	}
	.list span{
		font-size: 16px;
		color:#495060;
		margin-left: 0.2667rem;
	}
	.li {
		height: 0.8rem;
	
		font-size: 16px;
		color:#495060;
		padding: 0.4rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.li img{
		width:0.2rem;
		height: 0.373rem;
	}
	.text{
		font-size: 14px;
		color:#495060;
		padding: 0.4rem;
		border-bottom: 1px solid #dddee1;
	}
/*预览图片*/
.add_image{
        width: 100%;
        padding-bottom: 0.48rem;
        display: flex;
        flex-wrap: wrap;
        background: #fff;
    }
    .border{
        width: 2.64rem;
        height: 2.64rem;
        color:#495060;
        font-size: 0.4rem;
        margin:0.48rem 0 0 0.48rem;
        border:1px solid #dddee1;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        position: relative;
    }
	.border img{
        width:100%;
        height:100%;
        overflow:hidden;
    }
    .del_img{
        position: absolute;
        right: -0.2667rem;
        top:-0.2667rem;
        width:0.533rem !important;
        height:0.533rem !important;
    }
     #xdaTanFileImg{
       position: absolute;
        width: 2.64rem;
        height: 2.64rem;
        left:0;top:0;
        opacity: 0;
   }
    /*图片预览*/
   .modal{
       width: 100%;
       height: 100%;
       position: fixed;
       z-index: 9999;
       background: rgba(0,0,0,1);
   }
   .modal img{
       max-width: 100%;
       max-height: 100%;
      position: absolute;
      margin:auto;
      left:0;right: 0;top: 0;bottom: 0;
   }
   /*热销商品价格*/
   .popup{
        width: 100%;
        height: 100%;
        background: #f8f8f9;
    }
    .popup .list{
        height: 1.2rem;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #dddee1;
        background: #fff;
    }
    .popup .list span{
       
        flex:1;
        font-size: 16px;
    }
    .submit{
        width: 90%;
        position: fixed;
        bottom:0.533rem;
        left:0;right:0;
        text-align: center;
    }
    .update{
       display: flex;
       justify-content: center;
    }
     .update button{
        width:9rem;
        margin:0 auto;
        height: 1.2rem;
        background: #3dc5d1;
        color:#fff;
        font-size: 0.4rem;
        border-radius: 5px;
    }
    .submit button{
        text-align: center;
        width:9rem;
        height: 1.2rem;
        background: #3dc5d1;
        color:#fff;
        font-size: 0.4rem;
        border-radius: 5px;
    }
    /*店铺描述*/
    .desc{
       padding:15px;
       font-size:16px;
       background:#fff;
       display: flex;
    }
    .desc div{
        flex:1
    }
    .desc textarea{
        width: 100%;
        height: 4rem;
        flex:3;
        color:#495060;
        border:0;
        outline: none;
    }
</style>