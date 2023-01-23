<template>
  <div id="homeMain">
  <div style="width: 100%; margin: 0 auto;">
    <!-- 头部 -->
    <div  style="background-color: white;width: 100%">
            <div id="typeList">
                <el-row type="flex">
                    <el-link :underline="true" @click="clickTag(1)">个人信息</el-link> 
                    <el-link :underline="true" @click="clickTag(2)">发布的领养</el-link> 
                    <el-link :underline="true" @click="clickTag(3)">发布的托管</el-link>
                    <el-link :undeline="true" @click="clickTag(4)">领养收藏</el-link>
                    <el-link :undeline="true" @click="clickTag(5)">托管收藏</el-link>
                    <el-link :undeline="true" @click="clickTag(6)">我的聊天</el-link>
                </el-row>
            </div>
        </div>

  </div>
    <router-view></router-view>

</div>
</template>

<script>
export default {
    name:'UserInfo',
    data() {
      return {
        activeName: 'second',
        underlineData:1,
      };
    },
    mounted(){

    },
    methods:{
          clickTag(index) {
            
               var elementById = document.getElementById('typeList');
               var elementsByTagName = elementById.getElementsByTagName('a');
               //console.log("-------"+index);
               for (var i = 0; i < 6; i++) {
                   if (i + 1 === index) {
                       elementsByTagName[i].style.color = '#409eff';
                   } else {
                       elementsByTagName[i].style.color = '#909090';
                   }
               }
               switch (index) {
                    case 1:
                        this.$router.push('userDetail');
                        break;
                    case 2:
                        this.$router.push('adoptPublish');
                        break;
                    case 3:
                        this.$router.push('lookPublish');
                        break;
                    case 4:
                        this.$router.push('adoptCollection');
                        break;
                    case 5:
                        this.$router.push('lookCollection');
                        break;
                    case 6:
                        this.$router.push('chat');
                        break;
                }


              },
    }
}
</script>

<style scoped src="./css/homeMainCss.css">



</style>