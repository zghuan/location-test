<template>
    <div class="address">
         <div class="list" @click="openAddressChoose">
            <span style="flex:1">省/市/区</span>
            <span style="flex:3.5;margin-left:0">{{a}}-{{b}}-{{c}}</span>
            <img src="../../../static/right.png" alt="">
        </div>
        <mt-popup
            class="popup"
            v-model="picker"
            position="bottom"
            popup-transition="popup-slide">
            <mt-picker id="pickers" @zgh="acceptCityData" :wsh="cityData" @zhy="acceptCityTextData"></mt-picker>
            
        </mt-popup>
        <div class="list">
            <span>详细地址</span>
            <input type="text" placeholder="必填，续写清楚道路及门牌号" v-model="address_text">
        </div>
        <div class="remind">
            请在地图上标出门店地址，方便顾客准确导航到店
        </div>
        <div id="map" style="width: 100%;height: 500px;"></div>
        <div  class="submit_address"><button @click="goBackAndSubmit">OK</button></div>
    </div>
</template>
<script>
import BMap from 'BMap';
import Picker from '../../components/Picker.vue'
import { Indicator,Toast} from 'mint-ui';
export default {
    components: {
    'mt-picker': Picker
    },
 props: {},
   data(){
       return{
            picker:false,
            address_text:'',
            lng:'',//精度
            lat:'',//维度
            near_build:'',
            a:'',
            b:'',
            c:'',
            cityData:[],
            city:'上海市'
       }
   },
   mounted() {
      this.ready();
  },
   created(){
    Indicator.open();
       
   },
   methods:{
    //创建地图
        ready(){
            var that = this
            var map = new BMap.Map("map");
                map.centerAndZoom('广州市',12); //创建一个中心点
            if (navigator.geolocation){ 
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function(r){
                    if(this.getStatus() == BMAP_STATUS_SUCCESS){
                        var mk = new BMap.Marker(r.point);//创建标注
                        map.addOverlay(mk);//将标注显示在地图中
                        map.panTo(r.point);//地图中心移动
                        Indicator.close();
                        //用所定位的经纬度查找所在地省市街道等信息
                        that.lng = r.point.lng
                        that.lat = r.point.lat
                        //console.log(that.lng,that.lat,'zzz')
                        that.checkAddress(r.point.lng,r.point.lat)
                        mk.enableDragging();//标注可拖拽
                        mk.addEventListener("dragend", function (e) { //拖拽事件
                            var x = e.point.lng; //经度
                            var y = e.point.lat; //纬度
                            that.checkAddress(x,y)
                            this.lng = x
                            this.lat = y
                            //console.log(this.lng,this.lat,'ggg')
                        });
                    }else {
                        console.log('failed'+this.getStatus());
                    }        
                },{enableHighAccuracy: true})
            }else{
                Toast({
                      message: '您的手机不支持该定位方式，请直接输入具体地址！',
                      position: 'middle',
                      duration: 3000
                    })
            }
        },
    //根据经维度查找详细地址
        checkAddress(x,y){
            var that = this
            var point = new BMap.Point(x,y);//用所定位的经纬度查找所在地省市街道等信息
                var gc = new BMap.Geocoder();
                gc.getLocation(point, function(rs){
                console.log(rs, 666)
                that.address_text = rs.surroundingPois[0].address
                that.a = rs.addressComponents.province
                that.b = rs.addressComponents.city
                that.c = rs.addressComponents.district
                that.cityData.push(rs.addressComponents.district,rs.addressComponents.city,rs.addressComponents.province)
                //console.log(rs,'zghzghzgh')
                })
            },
    //根据城市查找经纬度
        checkLngLagData(a,b){
            Indicator.open();
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
                    console.log(that.lng,that.lat,'zgh')
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
            console.log(a,b)
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
                Indicator.open();
                window.sessionStorage.setItem('city',JSON.stringify(city));
                window.sessionStorage.setItem('result',JSON.stringify(obj));
                window.sessionStorage.setItem('detailAddress',JSON.stringify(this.address_text));
                //window.sessionStorage.setItem('near_build',this.near_build);
                setTimeout((res)=>{
                    Indicator.close();
                    this.$router.go(-1);
                    Toast({
                      message: '选择成功 ✔',
                      position: 'middle',
                      duration: 2000
                    })
                },2000)
            }
        }
   }

}
</script>
<style scoped>
   .address .list{
        height: 1.6rem;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #dddee1;
        background: #fff;
    }
   .address .list span{
        margin-left: 15px;
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
        margin-right:15px;
        color:#495060;
    }
    .address .list input::-webkit-input-placeholder{
        color:#cccccc;
    }
   .address .list img{
        width: 8px;
        height: 14px;
        margin-right: 15px;
        float:right;
    }
    .address .remind{
        text-align: center;
        color:#fff;
        background: #3dc5d1;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
    }
    .address_popup{
        width: 100%;
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
    height: 30px;
    position: fixed;
    z-index: 999;
    bottom: 20px;
    
    text-align: center;
}
    .submit_address button{
        color:#fff;
        background: #3dc5d1;
        outline: none;
        padding:10px 20px;
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