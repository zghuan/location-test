<template>
    <div class="detail">
        <div class="top">
            <span class="image"><img :src="img" alt=""></span>
            <span>{{orderName}}</span>
            <span style="color:#3dc5d1">{{amount}}GMCC</span>
        </div>
        <div class="content">
            <div class="near_text">
                <div style="flex:2;display:flex">
                    <span style="flex:1"></span>
                    <span style="flex:1"><hr></span>
                </div>
                <span>订单详情</span>
                <div style="flex:2;display:flex">
                    <span  style="flex:1"><hr></span>
                    <span style="flex:1"></span>
                </div>
		    </div>
            <div class="box">
                <div class="list">
                    <span>支付币种</span>
                    <span>{{coinType}}</span>
                </div>
                <div class="list">
                    <span>支付金额</span>
                    <span>{{amount}}</span>
                </div>
                <div class="list">
                    <span>手续费</span>
                    <span>{{fee}}GMCC</span>
                </div>
                <div class="list">
                    <span>付款时间</span>
                    <span>{{createTime}}</span>
                </div>
                <div class="list">
                    <span>订单号码</span>
                    <span style="overflow:auto;">{{orderSn}}</span>
                </div>
                <div class="list">
                    <span>支付钱包地址</span>
                    <span style="overflow:auto;">{{fromWallet}}</span>
                </div>
                <div class="list">
                    <span>到账钱包地址</span>
                    <span style="overflow:auto;">{{toWallet}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            img:'../../../static/store.png',
            orderName:'',
            amount:'',
            coinType:'',
            price:'',
            fee:'',
            createTime:'',
            orderSn:'',
            fromWallet:'',
            toWallet:'',
            orderId:'',
        }
    },
    created(){
        var url  = window.location.href
        this.orderId = url.substring(url.lastIndexOf('/')+1)
    },
    mounted(){
        this.getOrderDeatil()
    },
    methods:{
        getOrderDeatil(){
            this.$http({
                    method: 'POST',
                    url: $fn.apiHost +'order/details',
                    params:{
                        orderId:this.orderId,
                    },
                })
                    .then((res)=>{
                        console.log(res)
                        this.img = res.data.result.merchantImg.split('_')[0];
                        this.orderName = res.data.result.order.orderName,
                        this.amount = res.data.result.order.amount,
                        this.coinType = res.data.result.order.coinType,
                        this.price = res.data.result.order.price,
                        this.fee = res.data.result.order.fee,
                        this.createTime = res.data.result.order.createTime,
                        this.orderSn = res.data.result.order.orderSn,
                        this.fromWallet = res.data.result.order.fromWallet,
                        this.toWallet = res.data.result.order.toWallet;
                        
                    })
                    .catch(err=> {
                    console.log(err)
                    })
        },
    }
}
</script>

<style scoped>
    .top{
        padding: 0.4rem;
        display: flex;
        flex-direction: column;
       align-items: center;
       font-size: 16px;
       color:rgb(66,68,88);
    }
  .top span{
      padding: 5px;
  }
  .content{
      background: #fff;
      margin:0 0.533rem;
      border-radius: 0.2667rem;
      box-shadow: 0 0 2px #dddee1;
  }
  .near_text{
        padding-top: 0.533rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.near_text span{
        font-weight: bold;
		flex:1;
		text-align: center; 
        color:#495060;
	}
	.near_text hr{
	width: 1.33rem;
	text-align: center;
	margin:0 auto;
	}
    .box{
        padding: 0.4rem;
    }
    .list{
        padding: 5px 0;
        color:#495060;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
    }
    .image img{
        width: 1.76rem;
        height:  1.76rem;
    }
</style>
