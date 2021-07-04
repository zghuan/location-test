<template>
  <div id="app">
    
      <router-view>
      </router-view>
    <!-- 底部导航 -->
    <mt-tabbar :fixed="true" style="background:#f8f8f9;" v-if="isBottomNavShow">
			<router-link :to="list.routed" class="mint-tab-item" v-for="(list,index) in listData" :key="list.id" :data-index="index">
                <mt-tab-item>
                    <img slot="icon" :src="list.url">
                    <span>{{list.named}}</span>
                </mt-tab-item>
			</router-link>
		</mt-tabbar>
  </div>
</template>


<script>
const gmcc = require('../static/nav/gmcc.png');
const o2o = require('../static/nav/o2o.png');
const people = require('../static/nav/people.png');

const gmcced = require('../static/nav/gmcced.png');
const o2oed = require('../static/nav/o2oed.png');
const peopleed = require('../static/nav/peopleed.png');

export default {
  name: 'App',
  data(){
    return{
      isBottomNavShow:true,
      listData:[
          {routed:'/gmcc',url: gmcc, named:'GMCC'},
          {routed:'/store_information',url: o2o,named:'O2O'},
          {routed:'/me',url: people,named:'个人'},
        ]
    }
  },
  mounted(){
		window.addEventListener('load',this.loaded)
  },
  methods:{
    loaded(){
      this.showHidden(this.$route.path)
    },
    showHidden(path){
      if(path == '/gmcc'){
          this.listData[0].url = gmcced
        }else{
          this.listData[0].url = gmcc
        }
        if(path == '/o2o'){
          this.listData[1].url = o2oed
        }else{
          this.listData[1].url = o2o
        }
        if(path == '/me'){
          this.listData[2].url = peopleed
        }else{
          this.listData[2].url = people
        }
    },
  },
  watch:{
    $route(to,from){
        if(
          to.path == '/gmcc' 
          || to.path == '/o2o' 
          || to.path == '/me' 
        ) {
          this.isBottomNavShow = true
        }else{
          this.isBottomNavShow = false
        }
         if(to.path == '/gmcc'){
          this.listData[0].url = gmcced
        }else{
          this.listData[0].url = gmcc
        }
        if(to.path == '/o2o'){
          this.listData[1].url = o2oed
        }else{
          this.listData[1].url = o2o
        }
        if(to.path == '/me'){
          this.listData[2].url = peopleed
        }else{
          this.listData[2].url = people
        }
    },

  },
}
</script>

<style>
#app {
 width: 100%;
 height: 100%;
 background: #f8f8f9;
}
.mint-tab-item{
    padding: 3px 0;
}
.router-link-active a{
     color:#3dc5d1;
     text-decoration: none !important;
     }
.mint-tabbar{
  border-top: 1px solid #dddee1
}
a:link,a:visited,a:active,a:hover{
  text-decoration: none !important;
} 
</style>
