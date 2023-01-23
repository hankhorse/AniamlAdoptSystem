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
                                           :src="item.userIcon"></el-avatar>
                            </el-col>
                            <el-col style="width:10%;height:100%">
                                <el-col style="width: 100%;">{{item.userName}}</el-col>
                                <el-col style="width: 100%;" class="meta-box">
                                    {{$moment(item.createTime).startOf("d").fromNow(true)+"前"}}
                                </el-col>
                            </el-col>
                            <el-row style="padding-left:574px"> 
                                <el-button  type="danger" round @click="deleteL(item.lookId)">取消收藏</el-button>
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
                        <!---->
                        <!-- <el-row class="pin-bottom">
                            <el-col>
                                <div style="width: 30%; margin: 0 auto;"
                                     v-if="activeClass.indexOf(item.id+'like')===-1"
                                     @click="activeClass.push(item.id+'like')">
                                    <a href="javascript:void(0)" style="text-decoration: none">
                                        <img style="position: relative;top:5px;width: 25px; height: 25px;display: inline-block;"
                                             src="../assets/收藏.png" alt="">
                                        <span style="font-size: 13px;font-weight: 500;color: #8a93a0;">
                                            喜欢
                                        </span>
                                    </a>
                                </div>
                                <div style="width: 30%; margin: 0 auto;"
                                     v-else
                                     @click="activeClass.pop(item.id+'like')">
                                    <a href="javascript:void(0)" style="text-decoration: none">
                                        <img style="position: relative;top:5px;width: 25px; height: 25px;display: inline-block;"
                                             src="../assets/收藏 (1).png" alt="">
                                        <span style="font-size: 13px;font-weight: 500;color: #1296db;">
                                            喜欢
                                        </span>
                                    </a>
                                </div>
                            </el-col>
                            <div style="height: 50%;width: 3px;background-color: #ebebeb;margin-top: 13px"></div>

                            <el-col>
                                <div style="width: 30%; margin: 0 auto;">
                                    <a href="javascript:void(0)" style="text-decoration: none">
                                        <img style="position: relative;top:5px;width: 25px; height: 25px;display: inline-block;"
                                             src="../assets/评论.png" alt="">
                                        <span style="font-size: 13px;font-weight: 500;color: #8a93a0;">
                                        评论
                                    </span>
                                    </a>
                                </div>
                            </el-col>
                            <div style="height: 50%;width: 3px;background-color: #ebebeb;;margin-top: 13px"></div>

                            <el-col>
                                <div style="width: 30%; margin: 0 auto;"
                                     v-if="(item.state!=0)"
                                    > 
                                    <a href="javascript:void(0)" style="text-decoration: none">
                                        <img style="position: relative;top:5px;width: 25px; height: 25px;display: inline-block;"
                                             src="../assets/完成.png" alt="">
                                        <span style="font-size: 13px;font-weight: 500;color: #8a93a0;">
                                            已完成
                                        </span>
                                    </a>
                                </div>
                                <div style="width: 30%; margin: 0 auto;"
                                     v-else-if="activeClass.indexOf(item.id+'get')===-1"
                                     @click="becomeTheClient(item.id)">
                                    <a href="javascript:void(0)" style="text-decoration: none">
                                        <img style="position: relative;top:5px;width: 25px; height: 25px;display: inline-block;"
                                             src="../assets/单手.png" alt="">
                                        <span style="font-size: 13px;font-weight: 500;color: #8a93a0;">
                                            接受
                                        </span>
                                    </a>
                                </div>
                                <div style="width: 30%; margin: 0 auto;"
                                     v-else
                                     @click="activeClass.pop(item.id+'get')">
                                    <a href="javascript:void(0)" style="text-decoration: none">
                                        <img style="position: relative;top:5px;width: 25px; height: 25px;display: inline-block;"
                                             src="../assets/单手 (1).png" alt="">
                                        <span style="font-size: 13px;font-weight: 500;color: #1296db;">
                                            接受
                                        </span>
                                    </a>
                                </div>
                            </el-col>
                        </el-row> -->
                    </li>
                </ul>
            </el-row>

            
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
import{getLookCollection} from '@/api'
import {deleteLookC} from '@/api'
export default {
    data() {
            return {
                info: [],
                loading: true,
               
                /*是否显示对话框*/
                dialogVisible: false,
                /*对话框信息*/
                dialogInfo: '',
                activeClass: [],
            }
        },
        mounted() {
            // this.getNextInfo();
            this.getInfo();
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
            clickCard(info) {
                this.dialogInfo = info;
                this.dialogVisible = true;
            },
           
            async getInfo(){
                let res = await getLookCollection(this.$store.state.userInfo.userId)
                this.info = res.data.datas
                
                
                this.loading = false;
            },
            async deleteL(val){
                let res = await deleteLookC(val,this.$store.state.userInfo.userId);
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