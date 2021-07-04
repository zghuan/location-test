<template>
    <div class="update">
        <div class="list">
            <span>门店名称</span>
            <input type="text" placeholder="必填" v-model="store_name">
        </div>
        <div class="list">
            <span>门店电话</span>
            <input type="text" placeholder="必填" v-model="store_phone">
        </div>
        <div class="list">
            <span>价格描述</span>
            <input type="text" placeholder="只做价格展示" v-model="store_price">
        </div>
        <div class="list">
            <span>经营品类</span>
            <input type="text" placeholder="必填" v-model="store_style">
        </div>
        <div class="list" @click="goStoreAddress">
            <span>门店地址</span>
            <span>{{address_show}}</span>
            <img src="../../../static/right.png" alt="">
        </div>
        <div class="list" @click="openStoreHeadPhoto()">
            <span>门头照片</span>
            <span v-if="headImageView.length==0">请上传至少一张店铺招牌照片</span>
            <span v-else>已上传{{headImageView.length}}张</span>
            <img src="../../../static/right.png" alt="">
        </div>
        <mt-popup
            v-model="popupSHP1"
            position="right"
            class="popup"
            popup-transition="popup-slide">
                <mt-header title="上传门头照片" style="background:#56dbd7">
                    <div slot="left" @click="closePopup">
                        <mt-button icon="back"></mt-button>
                    </div>
                </mt-header>
                <div class="add_image">
            <div class='border' v-for="(list,index) in headImageView" :key="list.id" :data-index="index">
                <img :src='list' class="view_image"  @click="imageView(index)">
                <img src='../../../static/del.png' v-if="headImageView.length>0"  class="del_img" @click='deleteImage1(index)'>
            </div>
            <div class="modal" v-show="isImageView" @click="closeImageView">
                <img :src="headImageView[this.index]" alt="">
            </div>
            <div class='border' v-if="showAdd">
                <img src='../../../static/add.png' style="width:24px;height:24px;">
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
                <div class="modal_complete">
                    <div class="submit complete">
                        <button @click="uploadImage1">完成</button>
                    </div>
                </div>
            </mt-popup>
        <div class="list" @click="openStoreHousePhoto()">
            <span>内景照片</span>
            <span v-if="houseImageView.length==0">请上传至少2张店铺内景照片</span>
            <span v-else>已上传{{houseImageView.length}}张</span>
            <img src="../../../static/right.png" alt="">
        </div>
        <mt-popup
            v-model="popupSHP2"
            position="right"
            class="popup"
            popup-transition="popup-slide">
                <mt-header title="上传内景照片" style="background:#56dbd7">
                    <div slot="left" @click="closePopup">
                        <mt-button icon="back"></mt-button>
                    </div>
                </mt-header>
                <div class="add_image">
            <div class='border' v-for="(list,index) in houseImageView" :key="list.id" :data-index="index">
                <img :src='list' class="view_image"  @click="imageView(index)">
                <img src='../../../static/del.png' v-if="houseImageView.length>0"  class="del_img" @click='deleteImage2(index)'>
            </div>
            <div class="modal" v-show="isImageView" @click="closeImageView">
                <img :src="houseImageView[this.index]" alt="">
            </div>
            <div class='border' v-if="showAdd">
                <img src='../../../static/add.png' style="width:24px;height:24px;">
                <span style="margin-top:5px;">添加照片</span>
                <input 
                    type="file" 
                    id="xdaTanFileImg"  
                    multiple 
                    accept="image/*"
                    name="file" 
                    @change="addImage2"/>
            </div>
        </div>
                <div class="modal_complete">
                    <div class="submit complete">
                        <button @click="uploadImage2">完成</button>
                    </div>
                </div>
            </mt-popup>
        <div style="height:8px;background:#f8f8f9"></div>
        <div class="list" @click="openIcPopup">
            <span>身份认证</span>
            <span v-if="name.length>0&&IC.length>0">{{write}}</span>
            <img src="../../../static/right.png" alt="">
        </div>
            <mt-popup
                v-model="popupIC"
                position="right"
                class="popup"
                popup-transition="popup-slide"
                >
                <mt-header title="实名认证" style="background:#56dbd7">
                    <div slot="left" @click="popupIC = false">
                        <mt-button icon="back"></mt-button>
                    </div>
                </mt-header>
                <div class="list">
                    <span>真实姓名</span>
                    <input type="text" placeholder="请填写姓名" v-model="name">
                </div>
                <div class="list">
                    <span>证件号码</span>
                    <input type="text" placeholder="请填写证件号码" v-model="IC">
                </div>
                <div class="submit" style="margin:20px auto">
                    <button @click="submitIc">提交</button>
                </div>
            </mt-popup>
        <div style="height:8px;background:#f8f8f9"></div>
        <div class="list">
            <span>店铺描述</span>
            <input type="text" placeholder="店铺的简单描述" v-model="desc">
        </div>
        <div class="submit">
            <button @click="submit">提交</button>
        </div>

    </div>
</template>

<script>
import { Indicator,Toast } from 'mint-ui';
export default {
    data(){
        return{
            params:new FormData(),
            files:null,
            write:'已填写',
            isImageView:false,
            index:0,
            popupSHP1:false,//照片popup
            popupSHP2:false,//照片popup
            showAdd:true,//照片add
            del:false,//照片删除
            desc:'',//描述
            popupIC:false,//身份认证popup
            store_name:'',//门店名
            store_phone:'',//门店电话
            store_price:'',//价格秒速
            store_style:'',//经营品类
            name:'', //真实姓名
            IC:'',//证件号码
            address_show:'',//城市
            userId:'',
            province:'',//省
            city:'',//市
            country:'',//区
            longitude:'',//进度
            latitude:'',//维度
            headImageView:[],//门头照片预览
            headImageData:[],//门头照片数组
            houseImageView:[],//内景照片预览
            houseImageData:[],//内景照片数组
            viewedPic: [], //
        }
    },
    created(){
        if(sessionStorage.getItem('city')){
            this.province = JSON.parse(sessionStorage.getItem('city')).myAddressProvince //省
            this.city = JSON.parse(sessionStorage.getItem('city')).myAddressCity //市
            this.country = JSON.parse(sessionStorage.getItem('city')).myAddresscounty //区
            this.address = JSON.parse(sessionStorage.getItem('detailAddress')) //详细地址
            this.address_show = this.province +'-'+this.city +'-'+this.country //页面暂时的拼接
            this.longitude = JSON.parse(sessionStorage.getItem('result')).lng //进度
            this.latitude = JSON.parse(sessionStorage.getItem('result')).lat //维度
        }
        this.userId = localStorage.getItem('userId');
        console.log(this.userId,'ghzgh')
    },
    methods:{
    //门店地址
        goStoreAddress(){
            this.$router.push({path:'/store_address'})
        },
    //门头照片弹窗
        openStoreHeadPhoto(){
            this.popupSHP1 = true
        },
     //内景照片弹窗
        openStoreHousePhoto(){
            this.popupSHP2 = true
        },
    //关闭门头/内景照片弹窗
        closePopup(){
             this.popupSHP1 = false;
             this.popupSHP2 = false;
        },
   //添加外景照片
        addImage1(e){
            this.files = e.target.files
                var that = this;
                for(var i=0;i<this.files.length;i++){
                    var reader = new FileReader();
                    reader.readAsDataURL(this.files[i]); 
                    this.params.append("exterior", this.files[i]);
                    this.viewedPic.push(this.files[i]);
                    reader.onload = function(e){
                        that.headImageView.push(e.target.result);                                 
                    };          
                } 
        },

    //添加内景照片
        addImage2(e){
            this.files = e.target.files
                var that = this;
                for(var i=0;i<this.files.length;i++){
                    var reader = new FileReader();
                    reader.readAsDataURL(this.files[i]); 
                    this.params.append("iterior", this.files[i]);
                     this.houseImageData.push(this.files[i]);
                    reader.onload = function(e){
                        that.houseImageView.push(e.target.result);                           
                    };           
                }      
        },
    
     //预览放大图片
        imageView(e){
            this.isImageView = true
            this.index = e
        }, 
    //关闭图片预览
        closeImageView(){
            this.isImageView = false
            console.log(this.files,'zzz')
        }, 
    //删除外景照片
        deleteImage1(i){
            this.headImageView.splice(i,1)
            this.viewedPic.splice(i,1)
           var zgh =  this.params.delete("exterior");
            for(var i=0;i<this.viewedPic.length;i++){
                this.params.append("exterior", this.viewedPic[i]);
            }
        },
    //删除内景照片
        deleteImage2(i){
            this.houseImageView.splice(i,1)
            this.houseImageData.splice(i,1)
            var zgh =  this.params.delete("iterior");
            for(var i=0;i<this.viewedPic.length;i++){
                this.params.append("iterior", this.houseImageData[i]);
            }
        },
    //关闭照片弹窗
        uploadImage1(){
            //console.log(this.headImageData,this.headImageData.length,typeof this.headImageData)
            this.popupSHP1 = false
            
        },
    //关闭照片弹窗
        uploadImage2(){
           this.popupSHP2 = false
        },
    //身份认证弹窗
        openIcPopup(){
            this.popupIC = true
        },
    //身份认证提交
        submitIc(){
            if(this.name == ''){
                Toast({
                    message: '姓名不能为空',
                    position: 'middle',
                    duration: 2000
                })
            }else if(this.IC == ''){
                Toast({
                    message: '身证件号码不能为空',
                    position: 'middle',
                    duration: 2000
                })
            }else{
                
                this.popupIC = false
            }
        },
    //营业执照
        goBusinessLicense(){
            this.$router.push({path:'/store_bussiness_license'})
        },
    //最终提交审核
        submit(){
            console.log(this.userId)
                this.params.append("userId", this.userId);
                this.params.append("name", this.store_name);
                this.params.append("phone", this.store_phone)
                this.params.append("price", this.store_price);
                this.params.append("category", this.store_style);
                this.params.append("province",this.province)
                this.params.append("city", this.city);
                this.params.append("country", this.country);
                this.params.append("address", this.address)
                this.params.append("longitude", this.longitude);
                this.params.append("latitude", this.latitude);
                this.params.append("identifyName", this.name);
                this.params.append("identifyNum", this.IC);
                this.params.append("desc", this.desc);
                //this.params.append("exterior", this.headImageData);
                //this.params.append("iterior", this.houseImageData);
                if(this.store_name == ''||this.store_phone==""||this.store_price==""
                ||this.store_style==""||this.province==""||this.city==""||this.country==""
                ||this.address==""||this.longitude==""||this.latitude==""||this.name==""
                ||this.IC == ''||this.desc==""){
                    Toast({
                        message: '请把信息填写完整',
                        position: 'middle',
                        duration: 2000
                    })
                }else{
                    this.sendFromData()
                }
                
                
        },
    //发送表单数据
        sendFromData(){
           Indicator.open('正在提交');
            this.$http.post($fn.apiHost +'merchant/add',this.params,
                {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    },
                }
              )
                .then((res)=>{
                    console.log(res)
                    if(res.data.code == 0){
                        Toast({
                            message: '填写营业执照',
                            position: 'middle',
                            duration: 2000
                        })
                        Indicator.close();
                        //跳转到营业执照
                        this.$router.push({path:'/store_bussiness_license'})
                    }else{
                        Toast({
                            message: res.data.msg,
                            position: 'middle',
                            duration: 2000
                        })
                    }
                })
                .catch(err=> {
                  
                })
        }
    }
}
</script>
<style scoped>
.store_information{
    margin-bottom: 100px;
}
    .list{
        height: 1.6rem;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #dddee1;
        background: #fff;
    }
    .list span{
        margin-left: 15px;
        flex:1;
        font-size: 16px;
    }
    .list span:nth-child(2){
        color:#cccccc;
        flex:auto;
        margin:0;
        font-size: 0.4rem;
    }
    .list input{
        flex:auto;
        border: 0;
        outline: none;
        font-size: 0.4rem;
        margin-right:15px;
    }
    .list input::-webkit-input-placeholder{
        color:#cccccc;
    }
    .list img{
        width: 8px;
        height: 14px;
        margin-right: 15px;
        float:right;
    }
    .submit{
        width: 90%;
        margin:0 auto;
        position: fixed;
        bottom:20px;
        left:0;right:0;
    }
    .submit button{
        width:9rem;
        height: 1.2rem;
        background: #3dc5d1;
        color:#fff;
        font-size: 0.4rem;
        border-radius: 5px;
    }
    .popup{
        width: 100%;
        height: 100%;
        background: #f8f8f9;
    }
    .modal_complete{
        width: 100%;
        position: absolute;
        bottom:20px;
    }
    .complete{
        margin:0 auto;
    }
    .add_image{
        width: 100%;
        padding-bottom: 18px;
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
        right: -10px;
        top:-10px;
        width:20px !important;
        height:20px !important;
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
   /*步骤条*/
   .step{
       font-size: 16px;
       text-align: center;
       padding: 10px;
       color:#3dc5d1;
       position: fixed;
       top:0;
       width: 100%;
       background: #f8f8f9;
   }
</style>
