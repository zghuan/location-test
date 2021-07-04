<template>
    <div class="check">
        <div class="box" v-if="!isFail">
            <mt-header title="审核结果" style="background:#56dbd7">
                    <div slot="left" @click="closePopup">
                        <mt-button icon="back"></mt-button>
                    </div>
            </mt-header>
            <div style="height:18px;"></div>
            <ul>
                <li>
                    <img src="../../../static/successed.png" alt="">
                    <div class="list">
                        <span class="big">提交成功</span><br><br>
                        <span class="small">{{time}}</span>
                    </div>
                </li>
                <div class="left"></div>
                <li style="border:0;">
                    <img src="../../../static/success.png" alt="">
                    <div class="list">
                        <span class="big">等待审核</span><br><br>
                        <span class="small">我们将于<span style="color:orangered">1-3个工作日</span>完成处理，处理结果将通过&nbsp;&nbsp;
                        GMCC&nbsp;&nbsp;通知您，请留意通知</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="box" v-else>
            <div style="height:18px;"></div>
            <ul>
                <li>
                    <img src="../../../static/successed.png" alt="">
                    <div class="list">
                        <span class="big">提交成功</span><br><br>
                        <span class="small">{{time}}</span>
                    </div>
                </li>
                <div class="left"></div>
                <li style="border:0;">
                    <img src="../../../static/del_danger.png" alt="">
                    <div class="list">
                        <span class="big">审核失败</span><br><br>
                        <span class="small">
                            {{fail_text}}
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            isFail:false,
            time:'2018-01-01 00:00:00',
            fail_text:'失败原因'
        }
    },
    created(){
            var date = new Date
            var time = date.toLocaleString('chinese', { hour12: false })
            this.time = time.split(' ')[0] + ' '+time.split(' ')[1];
    },
    methods:{
        closePopup(){
            this.$router.push({path:'/me'})
        }
    }
}
</script>

<style scoped>
.check{
    width: 100%;
    height: 100%;
}
    .box{
        background: #fff;
        height: 4.88rem;
        width: 100%;
    }
    .box ul{
        margin:0 0.48rem 0.48rem 0.48rem;
    }
    .box li{
        border-left:0.0533rem solid #56dbd7;
        position: relative;
    }
    .box img{
        width: 0.533rem;
        height: 0.533rem;;
        position: absolute;
        left:-0.2667rem;
    }
    .list{
        margin-left: 0.533rem;;
    }
    .left{
        height:0.533rem;;
        border-left: 0.0533rem solid #dddee1;
    }
    .big{
        font-size: 16px;
    }
    .small{
        font-size: 14px;
        color:rgb(130,133,160);
    }
</style>
