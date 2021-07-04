<template>
    <div class="o2o">
    	<div class="header">
			<div class="address" @click="openAddressChoose">
				<img src="../../static/write_address.png" alt="" style="width:0.32rem;height:0.426rem;">
				<span style="color:#fff;font-size:0.4rem;margin:0 0.2667rem;">{{b}}</span>
				<img src="../../static/select_address.png" alt="" style="width:0.186rem;height:0.186rem;">
			</div>
			<div class="search">
				<form action="javascript:return false"> 
					<mt-search
					v-model="search"
					id="search"
					cancel-text="取消"
					@keyup.native.enter="searching(search)"
					placeholder="输入商家名称">
					</mt-search>
				</form>
			</div>
		</div>
		<mt-popup
	            class="popup"
	            v-model="picker"
	            position="bottom"
	            popup-transition="popup-slide">
	            <mt-picker id="pickers" @zgh="acceptCityData" :wsh="cityData" @zzz="acceptCityTextData" @zhy="acceptAddress"></mt-picker> 
        	</mt-popup>
		<div class="banner">
			<img src="../../static/banner.jpg" alt="">
		</div>
		<div class="near_text">
			<div style="flex:2;display:flex">
				<span style="flex:1"></span>
				<span style="flex:1"><hr></span>
			</div>
			<span style="color:#495060">附近商家</span>
			<div style="flex:2;display:flex">
				<span  style="flex:1"><hr></span>
				<span style="flex:1"></span>
			</div>
		</div>
		
		<div class="tab">
			<div class="choose">
				<span @click="chooseDistance" :class="{'current':active == 'distance'}">距离</span>
				<span @click="chooseSales" :class="{'current':active == 'sales'}" style="margin-left:0.533rem;">销量</span>
			</div>
				<mt-tab-container v-model="active" id="tab">
				  <mt-tab-container-item id="distance">
				    	<div class="cont">
				    		<ul v-if="listData.length !== 0">
								<li  v-for="list in listData" :key="list.id">
									<router-link :to="/store/+list.merchant.userId+'&'+list.distance" class="router">
										<div class="image">
											<img src="../../static/store_1.png" alt="" v-if="list.imgUrls == null">
											<img :src="list.imgUrls[0]" alt="" v-else>
										</div>
										<div class="box">	
											<div class="name">
												{{list.merchant.name}}
											</div>
											<div class="count space-between">
												<span>销量{{list.merchant.sales}}</span>
												<span>距离＜{{list.distance | filterDistance}}</span>
											</div>
										</div>
									 </router-link> 
								</li>
				    		</ul>
							<div v-if="listData.length == 0"  style="margin:0.2667rem auto;text-align:center;color:#495060;">
								<span>附近暂无商家</span>
							</div>
				    	</div>
				  </mt-tab-container-item>
				  <mt-tab-container-item id="sales">
				    	<div class="cont">
				    		<ul v-if="listData.length !== 0">
								<li  v-for="list in listData" :key="list.id">
									<router-link :to="/store/+list.merchant.userId+'&'+list.distance" class="router">
										<div class="image">
											<img src="../../static/store_1.png" alt="" v-if="list.imgUrls == null">
											<img :src="list.imgUrls[0]" alt="" v-else>
										</div>
										<div class="box">	
											<div class="name">
												{{list.merchant.name}}
											</div>
											<div class="count space-between">
												<span>销量{{list.merchant.sales}}</span>
												<span>距离＜{{list.distance | filterDistance}}</span>
											</div>
										</div>
									</router-link> 
								</li>
				    		</ul>
							<div v-if="listData.length == 0"  style="margin:0.2667rem auto;text-align:center;color:#495060;">
								<span>附近暂无商家</span>
							</div>
				    	</div>
				  </mt-tab-container-item>
				</mt-tab-container>
		</div>
    </div>
</template>
<script>
import Picker from '../components/Picker.vue'
import { Indicator,Toast} from 'mint-ui';
import $ from 'jquery';
export default {
	components: {
    	'mt-picker': Picker
    },
    watch:{
    	search(news,olds){
    		//console.log(news)
    		if(news.length ==0){
    			this.getNearStore()
    		}
    	}
    },
	data(){
		return{
			search:'',
			mallId:'123456',
			active:'distance',
			sales:500,
			distance:0,
			picker:false,
			cityData:[],
			lng:'',//进度
			lat:'',//维度
			a:'',//省
			b:'',//市
			c:'',//区
			name:'', //商家名称
			type:0,//tab切换类型 0为距离 1为销量
			page:1,
			limit:20,
			listData:[]
		}
	},
	created(){
		var url = window.location.href;
            this.userId = url.split('=')[1];
            //console.log(this.userId,'获取userId')
			localStorage.setItem('userId',this.userId);
		//this.ready(); //定位当前市
		
	},
	mounted(){
		const that = this
		navigator.geolocation.getCurrentPosition(function(a){
			console.log(a.coords.longitude,a.coords.latitude, '未转换前的经纬度')
			var gpsPoint = new BMap.Point(a.coords.longitude,a.coords.latitude)
			var convertor = new BMap.Convertor();//这个类就是转换的对象
			var ar = []
			ar.push(gpsPoint)
			convertor.translate(ar, 1, 5, function(res){
				that.checkAddress(res.points[0].lng,res.points[0].lat)
				console.log(res.points[0].lng,res.points[0].lat, '经纬度')
			})//通过调用回调函数来进行转换
		})
	},
	methods:{
	//定位当前市
        ready(){
            var that = this
            if (navigator.geolocation){ 
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function(r){
                    if(this.getStatus() == BMAP_STATUS_SUCCESS){
                        that.lng = r.point.lng
						that.lat = r.point.lat
						console.log(that.lng,that.lat,'zzzzz')
						//that.tranlate(that.lmg,that.lat)
						
                    }else {
                        console.log('failed'+this.getStatus());
                    }        
                },{enableHighAccuracy: true})
            }else{
                Toast({
                      message: '定位失败',
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
                that.a = rs.addressComponents.province
                that.b = rs.addressComponents.city
                that.c = rs.addressComponents.district
				console.log(that.a,that.b,that.c, rs, '获取省市区')
				that.getNearStore() //获取附近商家
				})
				
			},
	//根据省市区查找经纬度
        checkLngLagData(a,b){
            var that = this
            var myGeo = new BMap.Geocoder();      
            // 将地址解析结果显示在地图上，并调整地图视野    
            myGeo.getPoint(a, function(e){  
                    that.lng = e.lng
                    that.lat = e.lat
                    console.log(that.lng,that.lat,'zgh')
                }, 
			b);
			this.getNearStore()
        },
	//获取附近的商家
		getNearStore(){
			this.$http({
                method: 'POST',
                url: $fn.apiHost +'merchant/index',
                params:{
					userId:this.userId,
					name:this.search,
					longtitude:this.lng,
					latitude:this.lat,
					province:this.a,
					city:this.b,
					type:this.type,
					//distance:this.distance
				},
              })
                .then((res)=>{
					this.listData = res.data.result
					console.log(this.listData)
                })
                .catch(err=> {
                  	console.log(err)
                })
		},
	//tab切换选择距离
		chooseDistance(){
			this.active = 'distance'
			this.type = 0 //距离
			this.getNearStore()
		},
	//tab切换选择销量
		chooseSales(){
			this.active = 'sales'
			this.type= 1 //销量
			this.getNearStore()
		},
	//打开城市三级联动选择器
        openAddressChoose(){
            this.picker = true
	   },
    //接收子组件传过来的省市区数据
        acceptCityData(mark,a,b,c){
            //console.log(mark,a,b,c)
            this.picker = mark
            this.a = a
            this.b = b
			this.c = c
		},
    //接收子组件传过来的城市数据
        acceptCityTextData(a){
           this.city = a //城市
		},
	//接收地址数据
		acceptAddress(a,b){
			this.checkLngLagData(a,b) //获取经纬度
		},
	//进入店铺详情页
		// storeDetail(a,b){
		// 	sessionStorage.setItem('distance',b)
		// 	this.$router.push({path:"/store/"+a})
		// },
	//搜索附近商家
		searching(e){
			this.$http({
                method: 'POST',
                url: $fn.apiHost +'merchant/index',
                params:{
					userId:this.userId,
					name:e,
					longtitude:this.lng,
					latitude:this.lat,
					province:this.a,
					city:this.b,
					type:this.type,
				},
              })
                .then((res)=>{
				//	console.log(res)
					this.listData = res.data.result
                })
                .catch(err=> {
                  	console.log(err)
                })
		}
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
.o2o{
	background: #fff;
	height: 100%;
	width: 100%;
}
	.header{
		height:1.33rem;
		display: flex;
	}
	.address{
		width:3.1rem;
		background: #3dc5d1;
		display: flex;
		align-items: center;
		justify-content: center;
		border:1px solid #3dc5d1;
		margin-right: -1px;
	}
	#search{
		width: 7.2rem;
		height: 1.33rem;
		
	}
	.search{
		width:7.2rem;
		height: 1.33rem;
	}
	.banner{
		display: flex;
		justify-content: center;
		align-items: center;
		margin:0.4rem auto;
	}
	.banner img{
		width: 9.06rem;
		height: 3.73rem;
		border-radius: 0.16rem;
	}
	.near_text{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.near_text span{
		flex:1;
		text-align: center; 
	}
	.near_text hr{
	width: 1.33rem;
	text-align: center;
	margin:0 auto;
	}
	.tab{
		width: 100%;
		height: 9.46rem;
		margin-top: 0.2667rem
	}
	.mint-tab-container{
    	width: 100%;
    	height:9.46rem;
    }
	.choose{
		width: 90%;
		margin:0 auto;
		color:#495060;
		font-size: 15px;
		border-bottom: 1px solid #cccccc;
		
	}
	.current{
		color:#3dc5d1;
		border-bottom: 2px solid #3dc5d1;
	}
	.cont .router{
		display: flex;
		padding: 0.4rem;
		border-bottom: 1px solid #dddee1;
	}
	.image{
		flex:1;
	}
	.image img{
		width:1.76rem;
		height: 1.76rem;
		border-radius:0.05rem;
	}
	.box{
		flex:3;
		display: flex;
		flex-direction: column;
		padding: 0.21rem 0 ;
	}
	.name{
	
		font-size: 16px;
		color:rgb(66,68,88);
		font-weight: bold;
		flex:2.5;
	}
	.count{
		
		flex:1;
		font-size:13px;
		color:rgb(130,133,160);
	}
	.popup{
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
</style>
<style>
	#search .mint-searchbar{
		background: #3dc5d1;
		width: 100%;
		height: 100%;
	}
	#search .mint-searchbar-cancel{
		color:#fff;
	}
	#search .mint-searchbar-inner .mintui-search{
		font-size: 16px;
	}
	#search input::-webkit-input-placeholder {
           font-size: 12px;
		   line-height:normal;
        }
 	#tab .mint-tab-container-wrap{
    	width: 100%;
    	height:100%;
    }
    #tab .mint-tab-container-item{
    	overflow: auto;
    	
    }
</style>