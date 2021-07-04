<template>
    <div class="bussiness">
        <div class="step">第二步，上传营业执照</div>
        <div class="add_image">
            <div class='border' v-for="(list,index) in imageList" :key="list.id" :data-index="index">
                <img :src='list' class="view_image"  @click="imageView(index)">
                <img src='../../../static/del.png' v-if="imageList.length>0"  class="del_img" @click='deleteImage(index)'>
            </div>
            <div class="modal" v-show="isImageView" @click="closeImageView">
                <img :src="imageList[this.index]" alt="">
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
                    @change="addImage"/>
            </div>
        </div>
        <div class="desc">
            <span>需上传至少1张营业执照原件照片</span>
        </div>
        <div style="height:10px;background:#f8f8f9;"></div>
        <div class="switch space-between">
            <span>长期有效</span>
            <mt-switch v-model="value" @change="switchChange"></mt-switch>
        </div>
        <div class="switch space-between" style="border-bottom:0" @click="chooseDate">
            <span>有效期至</span>
            <span style="color:#56dbd7">{{result}}</span>
        </div>
        <mt-datetime-picker
            ref="picker"
            :startDate="startDate"
            type="date"
            v-model="picker"
            @confirm="confirm"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            id="picker"
            >
        </mt-datetime-picker>
        <!-- <div class="submit submit_confirm" v-show="isConfirm">
            <button @click="confirm">确定</button>
        </div> -->
        <div class="list" style="border-bottom:0">
            <span>注册号</span>
            <input type="text" placeholder="请与营业执照上保持一致" v-model="register_number">
        </div>
        <div class="register_text">
            <span style="color:#f6403f;">
                请按照营业执照上的信息填写，仅支持数字、字母、汉字。
                如：410883000018227（1-1），请输入：410883000018227
            </span>
        </div>
        <div class="list" style="border-bottom:0;border-top:1px solid #dddee1;margin-top:0.4rem;">
            <span>字号名称</span>
            <input type="text" placeholder="请填写营业执照上字号名称" v-model="font_name">
        </div>
        <div class="register_text">
            <span style="color:#f6403f;">
                如果个体户的营业执照没有名称，名称中请填写经营者姓名。企业执照请填写法人代表、个体户执照请填写经营者姓名
            </span>
        </div>
        <div class="submit">
            <button @click="submited">完成</button>
        </div>
    </div>
</template>
<script>
import $ from 'jquery';
import { Indicator,Toast } from 'mint-ui';
export default {
    data(){
        return{
            params:new FormData(),
            isImageView:false,
            startDate:new Date(),
            imageList:[],//照片数组
            showAdd:true,//照片add
            index:0,//图片放大预览
            del:false,//照片删除
            value:true,//开关
            switch:'',//开关值
            picker:false,
            date:false,//时间
            register_number:'',//注册号
            font_name:'',//字号名称
            result:'请选择',
            viewedPic: [], //
        }
    },
    created(){
        this.userId = localStorage.getItem('userId');
    },
    methods:{
    //添加照片
        addImage(e){
           this.files = e.target.files
            var that = this;
                for(var i=0;i<this.files.length;i++){
                    var reader = new FileReader();
                    reader.readAsDataURL(this.files[i]);
                    this.params.append("licensePic", this.files[i]);//提交的图片文件域
                    this.viewedPic.push(this.files[i]);
                    reader.onload = function(e){
                    that.imageList.push(e.target.result); 
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
        },
    //删除照片
        deleteImage(i){
            this.imageList.splice(i,1)
            this.viewedPic.splice(i,1)
            var zgh =  this.params.delete("licensePic");
                for(var i=0;i<this.viewedPic.length;i++){
                    this.params.append("licensePic", this.viewedPic[i]);
                }
        },
    
    //开关
        switchChange(e){
            if(e==true){
                 this.switch = false
            }else{
                this.switch = true
            }
           // console.log(this.switch)
        },
    //打开时间选择器
        chooseDate(){
            this.$refs.picker.open();
            this.isConfirm = true
        },
    //确认时间选择
        confirm(e){
            this.$refs.picker.close();
           // console.log(this.result)
            this.switchTime(this.$refs.picker.currentValue)
        },
    //时间补0
        formatTen(num){ 
            return num > 9 ? (num + "") : ("0" + num); 
        },
    //转化时间
        switchTime(date){  
            var year = date.getFullYear(); 
            var month = date.getMonth() + 1; 
            var day = date.getDate(); 
            var hour = date.getHours(); 
            var minute = date.getMinutes(); 
            var second = date.getSeconds(); 
            return this.result = year + "-" + this.formatTen(month) + "-" + this.formatTen(day);
        },
    //最终提交
        submited(){
            if(this.viewedPic.length == 0){
                Toast({
                    message: '至少需上传一张营业执照原件照片',
                    position: 'middle',
                    duration: 2000
                })
            }else if(this.result == '请选择'){
                Toast({
                    message: '请选择有效期时间',
                    position: 'middle',
                    duration: 2000
                })
            }else if(this.register_number == ''){
                Toast({
                    message: '注册号不能为空',
                    position: 'middle',
                    duration: 2000
                })
            }else if(this.font_name == ''){
                Toast({
                    message: '字号名称不能为空',
                    position: 'middle',
                    duration: 2000
                })
            }else {
                this.license()
               
            }
            
        },
    //上传营业执照接口
        license(){
                Indicator.open('正在提交');
                this.params.append("userId", this.userId);
                this.params.append("licenseVali", this.result);
                this.params.append("licenseNum", this.register_number)
                this.params.append("licenseLegal", this.font_name);
            this.$http.post($fn.apiHost +'merchant/license',this.params,
                {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    },
                }
              )
                .then((res)=>{
                    Indicator.close();
                    //console.log(res)
                    if(res.data.code ==0){
                        this.$router.push({path:'/submit_check'})
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
    },
}

</script>
<style scoped>
.bussiness{
    background: #fff;
    width: 100%;
    height: 100%;
}
  .bussiness  .add_image{
        width: 100%;
        margin-top: 1.2rem;
        padding-bottom: 0.48rem;
        display: flex;
        flex-wrap: wrap;
        background: #fff;
    }
 .bussiness   .border{
        width: 2.64rem;
        height: 2.64rem;
        color:#495060;
        font-size: 0.4rem;
        box-shadow: 0 0 2px #dddee1;
        margin:0.48rem 0 0 0.48rem;
        border:1px solid #dddee1;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        position: relative;
    }
   
 .bussiness   .border img{
        width:100%;
        height:100%;
        overflow:hidden;
    }
   .bussiness .del_img{
        position: absolute;
        right: -0.2667rem;
        top:-0.2667rem;
        width:0.533rem !important;
        height:0.533rem !important;
    }
  .bussiness  .desc{
        color:gray;
        font-size: 12px;
        margin:0.2667rem 0 0.48rem 0.48rem;
    }
   .bussiness .switch{
        display: flex;
        height: 1.6rem;
        align-items: center;
        margin: 0 0.48rem;
        font-size: 16px;
        border-bottom: 1px solid #dddee1;
    }
   .bussiness .list{
        margin: 0 0.48rem;
        height: 1.6rem;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #dddee1;
        background: #fff;
    }
   .bussiness .list span{
        flex:1;
        font-size: 16px;
    }
   .bussiness .list input{
        flex:auto;
        border: 0;
        outline: none;
        font-size: 0.4rem;
      
    }
   .bussiness .list input::-webkit-input-placeholder{
        color:#cccccc;
    }
  .bussiness  .register_text{
        margin:0 0.48rem;
        background: #f8f8f9;
        border-radius: 10px;
        padding: 0.2667rem;
        font-size: 12px;
    }
   .bussiness .submit{
        width: 90%;
        margin:0.48rem auto;
    }
   .bussiness .submit button{
        width:9rem;
        height: 1.2rem;
        background: #3dc5d1;
        color:#fff;
        font-size: 0.4rem;
        border-radius: 5px;
    }
   .bussiness .v-modal{
        position: relative;
    }
  .bussiness #xdaTanFileImg{
       position: absolute;
        width: 2.64rem;
        height: 2.64rem;
        left:0;top:0;
        opacity: 0;
   }
   /*图片预览*/
  .bussiness .modal{
       width: 100%;
       height: 100%;
       position: fixed;
       z-index: 9999;
       background: rgba(0,0,0,1);
   }
  .bussiness .modal img{
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
       padding: 0.2667rem;
       color:#3dc5d1;
       position: fixed;
       top:0;
       width: 100%;
       background: #f8f8f9;
   }
</style>
<style>
#picker .mint-datetime-action{
    color:#56dbd7;
}
     .mint-switch-input:checked + .mint-switch-core{
        border-color:#56dbd7 !important;
        background-color:#56dbd7 !important;
    }
   #picker .picker-item.picker-selected{
       color:#56dbd7;
   }
</style>
