<template>
    <div class="order">
        <div class="cont">
            <ul>
                <li v-for="list in orderList" :key="list.id" @click="goToDetail(list.id)" v-if="orderList.length>0">
                    <div class="image">
                        <img :src="list.merchantImg | filterImg" alt="">
                    </div>
                    <div class="box">	
                        <div class="name">
                            {{list.merchantName}}
                        </div>
                        <div class="time">
                            <span>下单时间：</span>
                            <span>{{list.createTime}}</span>
                        </div>
                        <div class="price">
                            <span>订单总价：</span>
                            <span>{{list.amount}}GMCC</span>
                        </div>
                    </div>
                </li>
                 <div v-if="orderList.length==0" class="no_order">暂无订单</div>
            </ul>
            <div class="submit" v-if="orderList.length >10">
                <button @click="loadMore">加载更多</button>
            </div>
        </div>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui';
export default {
    data(){
        return{
            orderId:'123132',
            limit:10,
            page:1,
            img:'../../../static/store.png',
            orderList:[
                // {
                //     id:'123',
                //     orderName:'',
                //     orderId:'123',
                //     img:'../../../static/store.png',
                //     desc:'新福西饼生日蛋糕',
                //     createTime:'2018-18-10',
                //     amount:'100',
                // }
            ],
        }
    },
    created(){
        this.userId = localStorage.getItem('userId');
        sessionStorage.setItem('page',this.page);
    },
    mounted(){
        Indicator.open();
        this.page = sessionStorage.getItem('page')
        this.getOrderList(this.page)
    },
    filters:{
        filterImg(e){
            return e.split('_')[0];
        }
    },
    methods:{
        getOrderList(page){
            this.$http({
                method: 'POST',
                url: $fn.apiHost +'order/index',
                params:{
                    userId:this.userId,
                    limit:this.limit,
                    page:page
                },
            })
                .then((res)=>{
                    Indicator.close();
                    this.orderList = [];
                        for(var i=0;i<res.data.result.length;i++) {
                            var arr = res.data.result[i];
                            var obj = Object.assign({},
                            {merchantImg:arr.merchantImg},
                            {merchantName:arr.merchantName},
                            arr.order)
                        }
                        this.orderList.push(obj)
                       // console.log(this.orderList)
                    })
                    .catch(err=> {
                        Indicator.close();
                        console.log(err)
                    })
                },
            //进入订单详情
                goToDetail(e){
                    this.$router.push({path:'/order_detail/'+e})
                },
            //加载更多
                loadMore(){
                    this.page++
                    sessionStorage.setItem('page',this.page);
                    this.page = sessionStorage.getItem('page');
                    this.getOrderList(this.page)
                    //console.log(this.page,'ggg')
                }
        }
}
</script>
<style scoped>
.order,.cont{
    background: #fff;
    width: 100%;
    height: 100%;
}
    .cont li{
		display: flex;
		padding: 15px;
		border-bottom: 1px solid #dddee1;
	}
	.image{
		flex:1;
	}
	.box{
		flex:3;
		display: flex;
		flex-direction: column;
	}
	.name{
		font-size: 16px;
		color:rgb(66,68,88);
		font-weight: bold;
		flex:3;
	}
	.count{
		flex:1;
		font-size:13px;
		color:rgb(130,133,160);
	}
    .time{
        
		font-size:13px;
		color:rgb(130,133,160);
    }
    .price{
      
		font-size:13px;
		color:rgb(130,133,160);
    }
    .no_order{
        margin:10px auto;
        color:#495060;
        text-align: center;
        font-size: 16px;
    }
    .submit{
        width: 90%;
        margin:10px auto;
        text-align: center;
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
    .image img{
        width:  1.76rem;
        height:  1.76rem;
    }
</style>
