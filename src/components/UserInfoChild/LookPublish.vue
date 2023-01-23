<template>
  <div style="width: 60%; margin: 0 auto;">
        <div class="lookAfter-main">
            <el-row v-loading="loading">
                <el-empty v-if="this.info==null" description="没有收藏"></el-empty>
                <ul style="background: #f4f5f5;">

                    <!--骨架屏占位-->
                    <el-row style="width: 100%;height: 200px;background-color: #ffffff" v-if="loading"></el-row>

                    <!--加载完成后数据-->
                    <li class="lookAfter-li" v-for="item in info" :key="item.lookId" v-else>
                        <!--人物以及相关信息-->
                        <el-row class="pin-header" type="flex" justify="start">
                            <el-col style="width:10%">
                                <el-avatar size="medium" style="width: 45px;height: 45px"
                                           :src="$store.state.userInfo.userIcon"></el-avatar>
                            </el-col>
                            <el-col style="width:10%;height:100%">
                                <el-col style="width: 100%;">{{$store.state.userInfo.userName}}</el-col>
                                <el-col style="width: 100%;" class="meta-box">
                                    {{$moment(item.createTime).startOf("d").fromNow(true)+"前"}}
                                </el-col>
                            </el-col>
                            <el-row style="padding-left:574px"> 
                                <el-button  type="danger" round @click="deleteL(item.lookId)">删除发布</el-button>
                            </el-row>
                        </el-row>
                        <!--托管告示的正文内容-->
                        <el-row class="pin-content-row">
                            <!--标题-->
                            <h3>
                                {{item.lookTitle}}
                            </h3>
                            <!--卡片信息-->
                            <el-card :body-style="{ padding: '10px' }" style="margin: 20px 0"
                                     v-on:click.native="clickCard(item)">
                                <el-col style="width:55%;height: 250px;">
                                    <img :src="item.lookImg" style="width: 23rem;">
                                </el-col>
                                <el-row>
                                    <el-col class="look-after-info">
                                        <el-button type="info" plain>开始日期：{{$moment(item.beginTime).format("YYYY-M月D日")}}
                                        </el-button>
                                    </el-col>
                                    <el-col class="look-after-info">
                                        <el-button type="info" plain>截止日期：{{$moment(item.endTime).format("YYYY-M月D日")}}
                                        </el-button>
                                    </el-col>
                                    <!-- <el-col class="look-after-info" v-if="item.lastTime!==null">
                                        <el-button type="success" plain>托管时长：{{item.lookUser}}天{{item.state}}</el-button>
                                    </el-col> -->
                                    <el-col class="look-after-info">
                                        <el-button type="warning" plain>预算：{{item.lookPrice}}/天</el-button>
                                    </el-col>
                                    <el-col class="look-after-info">
                                        <el-button plain type="danger">交易地址：{{item.lookAddress}}</el-button>
                                    </el-col>
                                </el-row>
                            </el-card>
                            <!--操作-->
                        </el-row>
                        <el-row class="pin-bottom">
                            <el-col :span="24"> 
                                <el-button v-if="(item.state==0)" @click="getNoticeUser(item.lookId)" icon="el-icon-s-unfold" style="border:none;width: 100%;">查看申请的用户</el-button>
                                <el-button v-else type="success" icon="el-icon-check" circle style="position:relative;left:410px"><a>已完成</a></el-button>
                                </el-col> 
                        </el-row>
                        <!---->
                        
                    </li>
                </ul>
            </el-row>
            <!-- 具体申请的用户 -->
            <el-drawer
                title="请您于通过申请前，主动联系对方！"
                :visible.sync="drawer"
                :direction="direction"
                
                size="70%">
                <el-col :span="19" :offset="4" v-for="item in noticeUser" :key="item.userId">
                    <el-descriptions title="申请用户信息">
                            <template slot="extra">
                                <el-button type="danger" size="small" @click="deleteNoticeUser(item.userId)">删除</el-button>
                                <el-button type="primary" size="small" @click = "LookAnimal2(item.userId)">同意</el-button>
                            </template>
                            <el-descriptions-item label="用户名">{{ item.userName }}</el-descriptions-item>
                            <el-descriptions-item label="手机号">{{ item.userPhone }}</el-descriptions-item>
                            <el-descriptions-item label="联系地址">{{ item.userAddress }}</el-descriptions-item>
                            <el-descriptions-item label="微信号">{{ item.userChat }}</el-descriptions-item>
                            <el-descriptions-item label="联系邮箱">{{ item.userEmail }}</el-descriptions-item>
                    </el-descriptions>
                    <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
                </el-col>
            </el-drawer>
             <!--对话框，点击卡牌时弹出-->
             <el-dialog
                    :visible.sync="dialogVisible"
                    width="40%">
                <h3 style="margin-top: -30px;margin-bottom: 30px;color: #909090;">标题：{{dialogInfo.lookTitle}}</h3>
                <el-divider></el-divider>
                <p > <b>宠物图片：</b></p>
                <el-image
                style="width: 250px; height: 200px;margin-top: 10px;"
                 :src="dialogInfo.lookImg"
                ></el-image>
                <el-divider></el-divider>
                <h3>宠物介绍：</h3>
                <div style="margin-top:15px" v-html="dialogInfo.lookContext"></div>
            </el-dialog>
        </div>
       
    </div>
</template>

<script>
import {getMyLook} from '@/api'
import {deleteLook} from '@/api'
import{getLookNoticeUser} from '@/api'
import {LookAnimal} from '@/api'
import{deleteLookNotice} from '@/api'
export default {
    data() {
            return {
                info: [],
                loading: true,
                nowLookId:0,
                noticeUser:[],
                drawer: false,
                direction:'btt',
                pagesize:10,
                total:10,
                nowsPageNum: 1,
                /*是否显示对话框*/
                dialogVisible: false,
                /*对话框信息*/
                dialogInfo: '',
                activeClass: [],
            }
        },
        mounted() {
            
            this.getInfo()
        },
        methods:{
            open1() {
                this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success'
                });
            },
            open2() {
                this.$notify({
                title: '警告',
                message: '操作失败',
                type: 'warning'
                });
            },
            showSuccess(val){
                this.$message({
                    type: 'success',
                    message: val
                })
            },
            showFaild(val){
                this.$message.error(val);
            },
            //接收托管
            async LookAnimal2(userId){
                let res = await LookAnimal(this.nowLookId,userId);
                if(res.data.state ==0){
                    this.showSuccess(res.data.message)
                    this.drawer =false
                    location. reload()
                    this.$router.go(0)
                }else{
                    this.showFaild(res.data.message)
                }
            },
            //删除申请的用户
            async deleteNoticeUser(userId){
                let res = await deleteLookNotice(this.nowLookId,userId);
                if(res.data.state ==0){
                    this.showSuccess(res.data.message)
                    this.drawer =false
                }else{
                    this.showFaild(res.data.message)
                }
            },
            //获取申请的用户
            async getNoticeUser(val){
                this.nowLookId = val;
                let res = await getLookNoticeUser(val)
                
                if(res.data.state==0){
                    this.noticeUser = res.data.datas
                    this.drawer =true
                }else{
                    this.$notify({
                    title: '很可惜',
                    message: '目前没有申请的人',
                    type: 'warning'
                    });
                }
            },
            clickCard(info) {
                this.dialogInfo = info;
                this.dialogVisible = true;
            },
            async getInfo(){
                let res = await getMyLook(this.$store.state.userInfo.userId)
                this.info = res.data.datas 
                this.loading=false;
            },
            async deleteL(val){
                let res = await deleteLook(val)
                if(res.data.state==0){
                this.open1();
                }else{
                this.open2();
                }
            }
        }
}
</script>

<style scoped src="../css/lookAfterCss.css">

</style>