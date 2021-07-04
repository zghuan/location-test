<template>
    <div class="address">
        <div id="map" style="width: 100%;height: 100%;">
            
        </div>
        <div class="window">
            <span>{{address}}</span>
            <div class="triangle"></div>
        </div>
    </div>
</template>
<script>
import BMap from 'BMap';
import { Indicator,Toast} from 'mint-ui';
export default {
   data(){
       return{
           address:'',
           lng:0,
           lat:0
       }
   },
   created(){
        this.lng = sessionStorage.getItem('lng')
        this.lat = sessionStorage.getItem('lat')
        this.address = sessionStorage.getItem('address')
   },
     mounted() {
      this.ready();
  },
   methods:{
    //创建地图
        ready(){
            var map = new BMap.Map("map");
            var point = new BMap.Point(this.lng,this.lat)
                map.centerAndZoom(point,15); //创建一个中心点
                var mk = new BMap.Marker(point);//创建标注
                map.addOverlay(mk);//将标注显示在地图中
                map.disableDragging() //禁止拖拽
                
        },
   }

}
</script>
<style scoped>
    .address{
        width: 100%;
        height: 100%;
    }
    .window{
        background: #fff;
        border-radius: 0.266rem;
        box-shadow: 0 0 1.33rem #dddee1;
        width: 5.33rem;
        height: 2.133rem;
        position: absolute;
        margin:auto;
        left:0;right:0;top:0;bottom:5.33rem;
        z-index: 9999;
        font-size: 0.4rem;
        padding: 0.2667rem;
    }
   .triangle{
        margin: 0 auto;
        width: 0; 
        height: 0; 
        border-left: 0.8rem solid transparent; 
        border-right: 0.8rem solid transparent; 
        border-top: 1.6rem solid #fff; 
   }
</style>
<style>
  #map .BMap_bubble_content{
        font-size: 18px;
        color:#495060;
    }
</style>
