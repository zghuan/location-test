<template>
    <div class="store_information">
        <!-- <div class="step">第一步，填写基本信息</div> -->
        <div class="list" style="margin-top:1.2rem;">
            <span>门店名称</span>
            <input type="text" placeholder="必填" v-model="store_name">
        </div>
        <!-- <div class="list">
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
        </div> -->
        <div class="list" @click="goStoreAddress">
            <span>门店地址</span>
            <span>{{address_show}}</span>
            <img src="../../../static/right.png" alt="">
        </div>
        <!-- <div class="list" @click="openStoreHeadPhoto()">
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
                <img src='../../../static/add.png' style="width:0.64rem;height:0.64rem;">
                <span style="margin-top:0.133rem;">添加照片</span>
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
                <img src='../../../static/add.png' style="width:0.64rem;height:0.64rem;">
                <span style="margin-top:0.133rem;">添加照片</span>
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
                <div class="submit" style="margin:0.533rem auto;">
                    <button @click="submitIc">完成</button>
                </div>
            </mt-popup>
        <div style="height:8px;background:#f8f8f9"></div> -->
        <!-- <div class="list" @click="goBusinessLicense">
            <span>营业执照</span>
            <span>请上传营业执照</span>
            <img src="../../../static/right.png" alt="">
        </div> -->
        <div class="list">
            <span>店铺描述</span>
            <input type="text" placeholder="店铺的简单描述" v-model="desc">
        </div>
        <div class="submit">
            <button @click="submit">完成</button>
        </div>
    <!-- 地图 -->
        <mt-popup
            v-model="addressModal"
            position="right"
            class="address_popup"
            popup-transition="popup-slide"
        >
         <mt-header title="选择地址" style="background:#56dbd7">
                    <div slot="left" @click="addressModal = false">
                        <mt-button icon="back"></mt-button>
                    </div>
        </mt-header>
            <div class="address">
                <div class="list" @click="openAddressChoose">
                    <span style="flex:1">省/市/区</span>
                    <span style="flex:3.5;margin-left:0">{{a}}-{{b}}-{{c}}</span>
                    <img src="../../../static/right.png" alt="">
                </div>
                <div class="list">
                    <span>详细地址</span>
                    <input type="text" placeholder="必填，续写清楚道路及门牌号" v-model="address_text">
                </div>
                <div class="remind">
                    请在地图上标出门店地址，方便顾客准确导航到店
                </div>
                <div id="map" style="width: 100%;height:15rem;"></div>
                <div class="submit_address"><button @click="goBackAndSubmit">OK</button></div>
            </div>
        </mt-popup>
    <!-- 地址选择模态框 -->
        <mt-popup
            class="picker_popup"
            v-model="picker"
            position="bottom"
            popup-transition="popup-fade">
            <mt-picker id="pickers" @zgh="acceptCityData" :wsh="cityData" @zhy="acceptCityTextData"></mt-picker>
        </mt-popup>
    </div>
</template>

<script>
import { Indicator,Toast } from 'mint-ui';
import $ from 'jquery';
import BMap from 'BMap';
import Picker from '../../components/Picker.vue'
export default {
    components: {
    'mt-picker': Picker
    },
    data(){
        return{
            //------------------
            addressModal:false,
            picker:false,
            address_text:'',
            lng:'',//精度
            lat:'',//维度
            near_build:'',
            a:'',
            b:'',
            c:'',
            cityData:[],
            city:'上海市',
            //-------------------
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
        this.getAddress()
       
    },
    methods:{
        getAddress(){
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
        
        },
    //门店地址
        goStoreAddress(){
           this.addressModal = true
           this.ready();
        },
    //创建地图
        ready(){
            // 百度定位，ios没问题，android个别机型不准，并且要https环境，http天河区全都定位到越秀区了
            var that = this
            var map = new BMap.Map("map");
            map.centerAndZoom('广州市',14); //创建一个中心点
            var geolocation = new BMap.Geolocation();
                geolocation.enableSDKLocation();
                geolocation.getCurrentPosition(function(r){
                    if(this.getStatus() == BMAP_STATUS_SUCCESS){
                        var mk = new BMap.Marker(r.point);//创建标注
                        map.addOverlay(mk);//将标注显示在地图中
                        map.panTo(r.point);//地图中心移动
                        Indicator.close();
                        //用所定位的经纬度查找所在地省市街道等信息
                        that.lng = r.point.lng
                        that.lat = r.point.lat
                        that.checkAddress(r.point.lng,r.point.lat)
                    }else {
                        alert(this.getStatus())
                        console.log('failed'+this.getStatus());
                    }        
                },{enableHighAccuracy: true})
            // html5定位
            // var that = this
            // var marker = null
            // navigator.geolocation.getCurrentPosition(function(a){
            //     console.log(a)
            //     var gpsPoint = new BMap.Point(a.coords.longitude,a.coords.latitude)
            //     var convertor = new BMap.Convertor();//这个类就是转换的对象
            //     var ar = []
            //     ar.push(gpsPoint)
            //     convertor.translate(ar, 1, 5, function(res){
            //         console.log(res,' huhuhuh')
            //         var map = new BMap.Map("map");
            //         map.centerAndZoom('广州市',15); //创建一个中心点
            //          marker  = new BMap.Marker(new BMap.Point(res.points[0].lng,res.points[0].lat));//创建标注
            //         map.addOverlay(marker);//将标注显示在地图中
            //         map.panTo(res.points);//地图中心移动
            //         Indicator.close();
            //         that.lng = res.points[0].lng
            //         that.lat = res.points[0].lat
            //         that.checkAddress(res.points[0].lng,res.points[0].lat)
            //     })//通过调用回调函数来进行转换
            // }, function(err) {
            //     alert(err)
            // })
            // marker.enableDragging();//标注可拖拽
            // marker.addEventListener("dragend", function (e) { //拖拽事件
            //     var x = e.point.lng; //经度
            //     var y = e.point.lat; //纬度
            //     that.checkAddress(x,y)
            //     this.lng = x
            //     this.lat = y
            // });
        },
    //根据经维度查找详细地址
        checkAddress(x,y){
            var that = this
            var point = new BMap.Point(x,y);//用所定位的经纬度查找所在地省市街道等信息
                var gc = new BMap.Geocoder();
                gc.getLocation(point, function(rs){
                that.address_text = rs.surroundingPois.length && rs.surroundingPois[0].address + rs.surroundingPois[0].title || rs.address
                that.a = rs.addressComponents.province
                that.b = rs.addressComponents.city
                that.c = rs.addressComponents.district
                that.cityData.push(rs.addressComponents.district,rs.addressComponents.city,rs.addressComponents.province)
                console.log(rs,'zghzghzgh')
                })
            },
    //根据城市查找经纬度
        checkLngLagData(a,b){
            //Indicator.open();
            var that = this
            var myGeo = new BMap.Geocoder();      
            // 将地址解析结果显示在地图上，并调整地图视野    
            myGeo.getPoint(a, function(e){  
                //console.log(e,'zzzggghhh')    
                var map = new BMap.Map("map");          // 创建地图实例  
                var point = new BMap.Point(e.lng, e.lat);  // 创建点坐标  
                map.centerAndZoom(point, 12);        
                var mk = new BMap.Marker(point);//创建标注
                    that.lng = e.lng
                    that.lat = e.lat
                   // console.log(that.lng,that.lat,'zgh')
                    map.addOverlay(mk);//将标注显示在地图中
                    map.panTo(point);//地图中心移动
                    Indicator.close();
                    that.checkAddress(e.lng, e.lat)
                        mk.enableDragging();//标注可拖拽
                        mk.addEventListener("dragend", function (e) { //拖拽事件
                            var x = e.point.lng; //经度
                            var y = e.point.lat; //纬度
                            this.lng = x
                            this.lat = y
                            console.log(this.lng,this.lat,'hhh')
                            that.checkAddress(x,y)
                        });
                }, 
            b);
        },
    //打开城市三级联动选择器
        openAddressChoose(){
            this.picker = true

       },
    //地址选择中途触发事件
        onValuesChange(a,b){
           // console.log(a,b)
        },
    //接收子组件传过来的数据
        acceptCityData(mark,a,b,c){
            console.log(mark,a,b,c)
            this.picker = mark
            this.a = a
            this.b = b
            this.c = c
        },
    //接收子组件传过来的城市数据
        acceptCityTextData(a,b){
            this.checkLngLagData(a,b)
        },
    //最终--提交地址选择
        goBackAndSubmit(){
            var obj = {
                lng:this.lng,
                lat:this.lat
            }
            var city = {
                myAddressProvince:this.a,
                myAddressCity:this.b,
                myAddresscounty:this.c,
            }
            if(this.address_text == ''){
                Toast({
                      message: '详细地址不能为空 ×',
                      position: 'middle',
                      duration: 2000
                    })
            }else{
                window.sessionStorage.setItem('city',JSON.stringify(city));
                window.sessionStorage.setItem('result',JSON.stringify(obj));
                window.sessionStorage.setItem('detailAddress',JSON.stringify(this.address_text));
                    this.addressModal = false
                    this.getAddress()
                    Toast({
                      message: '选择成功 ✔',
                      position: 'middle',
                      duration: 2000
                    })
               
            }
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
           // console.log(this.files,'zzz')
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
            for(var i=0;i<this.houseImageData.length;i++){
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
           // console.log(this.userId)
                this.params.append("userId", this.userId);
                this.params.append("name", this.store_name);
                this.params.append("phone", this.store_phone);
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
            Indicator.open()
            this.$http.post($fn.apiHost +'merchant/add',this.params,
                {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    },
                }
              )
                .then((res)=>{
                  //  console.log(res)
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
                        Indicator.close();
                        Toast({
                            message: res.data.msg,
                            position: 'middle',
                            duration: 2000
                        })
                    }
                })
                .catch(err=> {
                    Toast({
                            message: '网络不稳定，请再来一次',
                            position: 'middle',
                            duration: 2000
                        })
                  Indicator.close();
                })
        }
    }
}
</script>
<style scoped>
.store_information{
    width: 100%;
    margin-bottom: 2.666rem;
}
    .list{
        height: 1.6rem;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #dddee1;
        background: #fff;
    }
    .list span{
        margin-left: 0.4rem;
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
        margin-right:0.4rem;
    }
    .list input::-webkit-input-placeholder{
        color:#cccccc;
    }
    .list img{
        width: 8px;
        height: 14px;
        margin-right: 0.4rem;
        float:right;
    }
    .submit{
        width: 90%;
        margin:0 auto;
        position: fixed;
        bottom:0.533rem;
        left:0;right:0;
        text-align: center;
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
        bottom:0.533rem;
    }
    .complete{
        margin:0 auto;
    }
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
   /*地图*/
    .address .list{
        height: 1.2rem;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #dddee1;
        background: #fff;
    }
   .address .list span{
        margin-left: 0.4rem;
        flex:1;
        font-size: 16px;
    }
    .address .list span:nth-child(2){
        color:#495060;
    }
    .address .list input{
        flex:auto;
        border: 0;
        outline: none;
        font-size: 0.4rem;
        margin-right:0.4rem;
        color:#495060;
    }
    .address .list input::-webkit-input-placeholder{
        color:#cccccc;
    }
   .address .list img{
        width: 0.213rem;
        height: 0.373rem;
        margin-right: 0.4rem;
        float:right;
    }
    .address .remind{
        text-align: center;
        color:#fff;
        background: #3dc5d1;
        height: 1rem;
        line-height: 1rem;
        font-size: 12px;
    }
    .address_popup{
        width: 100%;
        height: 100%;
        border-top-left-radius:10px;
        border-top-right-radius:10px;
        border-bottom-right-radius:0;
        border-bottom-left-radius:0;
    }
    .picker_popup{
        width: 100%;
        border-top-left-radius:10px;
        border-top-right-radius:10px;
        border-bottom-right-radius:0;
        border-bottom-left-radius:0;
    }
    .picker_btn{
    border:1px solid #dddee1;padding:5px;
    border-radius:10px;
    border-bottom-right-radius:0;
    border-bottom-left-radius:0;
}
.submit_address{
    width: 100%;
    height: 0.8rem;
    position: fixed;
    z-index: 999;
    bottom: 1.33rem;
    text-align: center;
}
    .submit_address button{
        color:#fff;
        background: #3dc5d1;
        outline: none;
        padding:0.2667rem 0.533rem;
        border-radius: 5px;
    }
</style>
<style>
    #pickers .picker-center-highlight{
    background:#3dc5d1;
    color:#fff;
    }

  #pickers .picker-slot{
      z-index: 999;
  }
 #pickers .picker-items{
     width: 90%;
     margin:0 auto;
 }
 .picker  .picker-selected{
      color:#fff;
    }
</style>