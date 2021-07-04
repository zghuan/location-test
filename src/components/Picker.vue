<template>
  <div class="overlayer">
        <mt-picker :slots="myAddressSlots" @change="onMyAddressChange"  class="picker">
        </mt-picker>
        <div class="submit">
            <button @click="confirm">完成</button>
        </div>
    </div>
</template>
<script>
import { Picker } from 'mint-ui';
import $ from 'jquery';
import myaddress from './../../static/city/city.json'     //引入省市区数据
export default {
  data(){
      return{
        picker:false,
        myAddressProvince:'省',
        myAddressCity:'市',
        myAddresscounty:'区/县',
        myAddressSlots: [
          {
            flex: 1,
            defaultIndex: 1,    
            values: Object.keys(myaddress),  //省份数组
            className: 'slot1',
            textAlign: 'center'
          }, 
          {
            divider: true,
            content: '-',
            className: 'slot2'
          }, 
          {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '-',
            className: 'slot4'
          },
          {
            flex: 1,
            values: [],
            className: 'slot5',
            textAlign: 'center'
          }
        ],
      }
  },
  props:['wsh'],

  methods:{
    //选择城市触发回调事件
      onMyAddressChange(picker, values){
            if(myaddress[values[0]]){  //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
                picker.setSlotValues(1,Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
                picker.setSlotValues(2,myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
                this.myAddressProvince = values[0];
                this.myAddressCity = values[1];
                this.myAddresscounty = values[2];
            }
        },
   
       //确定选择地址
        confirm(){
            this.$emit('zgh',this.picker,this.myAddressProvince,this.myAddressCity,this.myAddresscounty);
            var result = this.myAddressProvince+this.myAddressCity+this.myAddresscounty
            this.$emit('zhy',result,this.myAddresscounty)
            this.$emit('zzz',this.myAddressCity)
        },
  },
  created(){
       
},
   mounted(){
      this.$nextTick(() => { //vue里面全部加载好了再执行的函数  （类似于setTimeout）
        this.myAddressSlots[0].defaultIndex = 0    
        // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
        //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）

      });
    }
}
</script>
<style scoped>
      .picker{
        border-top: 1px solid #dddee1;
        position: fixed;
        bottom: 0;
        width: 100%;
        background: #f8f8f9;
        color:#495060;
        height: 250px;
    }
     .overlayer{
        position:fixed;
        left:0;
        top:0;
        width:100%;
        height:100%;
        z-index:10;
        background: rgba(0, 0, 0, 0.9)
    }
    .submit{
            z-index: 9999;
            width: 90%;
            margin:10px auto;
            position: absolute;
            left:0;right:0;
            bottom:5px;
            display: flex;

    }
    .submit button{
        width:9rem;
        height: 1.2rem;
        background: #3dc5d1;
        color:#fff;
        font-size: 0.4rem;
        border-radius: 5px;
    }
</style>
<style>
    .picker-items{
      background:#fff;
    }
</style>

