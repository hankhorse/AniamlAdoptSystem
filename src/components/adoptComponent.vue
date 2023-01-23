<template>
    <div style="width: 60%; margin: 0 auto;overflow: auto;" class="top">
        <div class="lookAfter-main">
            <el-row v-loading="loading">
                <ul style="background: #f4f5f5;">

                    <!--骨架屏占位-->
                    <el-row style="width: 100%;height: 200px;background-color: #ffffff" v-if="loading"></el-row>

                    <!--加载完成后数据-->
                    <li class="lookAfter-li" v-for="item in info" :key="item.adoptId" v-else>
                        <!--人物以及相关信息-->
                        <el-row class="pin-header" type="flex" justify="start">
                            <el-col style="width:10%">
                                <el-avatar size="medium" style="width: 45px;height: 45px"
                                           :src="item.userIcon"></el-avatar>
                            </el-col>
                            <el-col style="width:30%;height:100%">
                                <el-col style="width: 100%;">{{item.userName}}</el-col>
                                <el-col style="width: 100%;" class="meta-box">
                                    {{$moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}}
                                </el-col>
                            </el-col>
                        </el-row>
                        <!--托管告示的正文内容-->
                        <el-row class="pin-content-row">
                            <!--标题-->
                            <h3>
                                {{item.adoptTitle}}
                            </h3>
                            <!--卡片信息-->
                            <el-card :body-style="{ padding: '10px' }" style="margin: 20px 0"
                                     v-on:click.native="clickCard(item)">
                                <el-col style="width:55%;height: 250px;">
                                    <img :src="item.adoptImg" style="width: 23rem;height: 100%;">
                                </el-col>
                                <el-row>
                                    <el-col class="look-after-info">
                                        <el-button plain type="danger">交易地址：{{item.adoptAddress}}</el-button>
                                    </el-col>
                                    <el-col class="look-after-info">
                                        <el-button plain type="danger">发布时间：{{$moment(item.createTime).format('YYYY-MM-DD')}}</el-button>
                                    </el-col>
                                </el-row>
                            </el-card>
                            <!--操作-->
                        </el-row>
                        <!---->
                        <el-row class="pin-bottom">
                            <el-col>
                                <div style="width: 30%; margin: 0 auto;"
                                     v-if="collectionClass.indexOf(item.adoptId)===-1"
                                     @click="addCollection(item.userId,item.adoptId)">
                                    <a href="javascript:void(0)" style="text-decoration: none">
                                        <img style="width: 25px; height: 25px;display: inline-block;"
                                             src="../assets/收藏.png" alt="">
                                        <span style="font-size: 13px;font-weight: 500;color: #8a93a0;">
                                            收藏
                                        </span>
                                    </a>
                                </div>
                                <div style="width: 30%; margin: 0 auto;"
                                     v-else
                                     @click="deleteColl(item.adoptId)">
                                    <a href="javascript:void(0)" style="text-decoration: none">
                                        <img style="width: 25px; height: 25px;display: inline-block;"
                                             src="../assets/收藏 (1).png" alt="">
                                        <span style="font-size: 13px;font-weight: 500;color: #1296db;">
                                            收藏
                                        </span>
                                    </a>
                                </div>
                            </el-col>
                            <div style="height: 50%;width: 3px;background-color: #ebebeb;margin-top: 13px"></div>

                            <el-col>
                                <div style="width: 30%; margin: 0 auto;" @click="clickComment(item.adoptId)"> 
                                    <a href="javascript:void(0)" style="text-decoration: none">
                                        <img style="width: 25px; height: 25px;display: inline-block;"
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
                                     v-else-if="noticeClass.indexOf(item.adoptId)===-1"
                                     @click="addNotice(item.userId,item.adoptId)">
                                    <a href="javascript:void(0)" style="text-decoration: none">
                                        <img style="width: 25px; height: 25px;display: inline-block;"
                                             src="../assets/单手.png" alt="">
                                        <span style="font-size: 13px;font-weight: 500;color: #8a93a0;">
                                            接受
                                        </span>
                                    </a>
                                </div>
                                <div style="width: 30%; margin: 0 auto;"
                                     v-else
                                     @click="deleteNotice(item.adoptId)">
                                    <a href="javascript:void(0)" style="text-decoration: none">
                                        <img style="width: 25px; height: 25px;display: inline-block;"
                                             src="../assets/单手 (1).png" alt="">
                                        <span style="font-size: 13px;font-weight: 500;color: #1296db;">
                                            接受
                                        </span>
                                    </a>
                                </div>
                            </el-col>
                        </el-row>
                    </li>
                </ul>
            </el-row>

            <!--对话框，点击卡牌时弹出-->
            <el-dialog
                    :visible.sync="dialogVisible"
                    width="40%">
                <h3 style="margin-top: -30px;margin-bottom: 30px;color: #909090;">标题：{{dialogInfo.adoptTitle}}</h3>
                <el-divider></el-divider>
                <p > <b>宠物图片：</b></p>
                <el-image
                style="width: 250px; height: 200px;margin-top: 10px;"
                 :src="dialogInfo.adoptImg"
                ></el-image>
                <el-divider></el-divider>
                <h3>宠物介绍：</h3>
                <div style="margin-top:15px" v-html="dialogInfo.adoptContext"></div>
            </el-dialog>

            <el-dialog
                title="评论"
                :visible.sync="CommentDialogVisible"
                width="55%"
                >
                <el-empty v-if="this.AdoptComment==null" description="描述文字"></el-empty>
            <!-- 这里存放评论的内容 -->
                <ul v-else style="background: #f4f5f5;">
                    
                    <li class="lookAfter-li" v-for="item in AdoptComment" :key="item.adoptCommentId">
                        <!-- 头部内容 -->
                        
                        <el-row class="pin-header" type="flex" justify="start">
                            <el-col style="width:15%">
                                <el-avatar size="medium" style="width: 45px;height: 45px"
                                           :src="item.commentUserIcon"></el-avatar>
                            </el-col>
                            <el-col style="width:30%;height:100%">
                                <el-col style="width: 100%;">{{item.commentUserName}}</el-col>
                                <el-col v-if="item.pid!=0" style="width: 100%;" class="meta-box">
                                    回复{{item.responseUserName}}
                                </el-col>
                            </el-col>
                            <el-col style="position:relative;left:500px">
                                <el-button  type="text" @click="openResCom(item.userId)">回复</el-button>
                            </el-col>
                        </el-row>
                        <el-row >
                            <el-col style="font-size: large;width:100%;background:#ffffff;padding-left: 10%;margin-top: 10px;">
                                {{item.commentContext}}
                            </el-col>
                        </el-row>

                    </li>

                </ul>
                <!-- 内层对话框 -->
                <el-dialog
                    width="55%"
                    title="请输入评论内容"
                    :visible.sync="innerVisible"
                    append-to-body>
                    <el-input type="textarea" v-model="commentInfo.commentContext"></el-input>
                    <span slot="footer" style="padding-right:45%">
                    <el-button type="primary"  @click="addCom()">发布</el-button>
                    </span>
                </el-dialog>

                <span slot="footer" style="padding-right:45%">
                    <el-button type="primary"  @click="openCom()">发布评论</el-button>
                </span>

            </el-dialog>

        </div>
        
        <el-pagination
        class="fenye"
        background
        layout="prev, pager, next"
        :page-size="this.pagesize"
        @current-change="getInfo"
        :total="this.total">
        </el-pagination>
    </div>
    
</template>

<script>
   //import {addAdoptCollection} from "@/api"
    import { getAdopt } from "../api";
    import {getAdoptCId} from "@/api";
    import {addAdoptCollection} from "../api";
    import {deleteAdoptC} from "@/api";
    import {getAdoptComment} from "@/api"
    import {addAdoptComment} from "@/api"
    import {addAdoptNotice} from "@/api"
    import {deleteAdoptNotice} from "@/api"
    import {getAdoptNoticeList} from "@/api"
    export default {
        name: "adoptComponent",
        data() {
            return {
                info: [],
                loading: true,
                pagesize:10,
                total:10,
                nowsPageNum: 1,
                /*是否显示对话框*/
                dialogVisible: false,
                /*对话框信息*/
                dialogInfo: '',
                activeClass: [],
                collectionClass:[],
                noticeClass:[],
                CommentDialogVisible:false,
                innerVisible:false,
                
                //评论的信息
                commentInfo:{
                    userId:1,
                    publishId:1,
                    pid:0,
                    commentContext:'',
                },
                AdoptComment:[
                    
                ]
            }
        },
        mounted() {
           // this.getNextInfo();
           this.getInfo(1);
           this.getAdoptIdC()
           this.getNotice()
        },
        computed: {},
        methods: {
            showSuccess(val){
                this.$message({
                    type: 'success',
                    message: val
                })
            },
            showFaild(val){
                this.$message.error(val);
            },
            //发送接收请求
            async addNotice(userId,adoptId){
                if(this.$store.state.userInfo  == null){
                    this.showFaild('请先登录，才能使用该功能')
                    return ;
                }
                if(userId==this.$store.state.userInfo.userId){
                    this.showFaild('您无法接收自己的发布')
                    return ;
                }
                let res = await addAdoptNotice(adoptId,this.$store.state.userInfo.userId);
                //console.log(res);
                if(res.data.state ==0){
                    this.showSuccess('成功向对方发送请求')
                    this.noticeClass.push(adoptId)
                }else{
                    this.showFaild('发送接收信息失败')
                }
            },
            //删除发送接收请求
            async deleteNotice(adoptId){
                let res = await deleteAdoptNotice(adoptId,this.$store.state.userInfo.userId)
               
                if(res.data.state ==0){
                    this.showSuccess(res.data.message)
                    this.noticeClass.splice(this.noticeClass.indexOf(adoptId),1)
                }else{
                    this.showFaild(res.data.message)
                }
            },
            
            //添加评论
            async addCom(){
                if(this.$store.state.userInfo  == null){
                    this.showFaild('请先登录，才能使用该功能')
                    return ;
                }
                this.commentInfo.userId = this.$store.state.userInfo.userId
                let res = await addAdoptComment(this.commentInfo)
                if(res.data.state ==0){
                    this.showSuccess(res.data.message)
                    this.commentInfo.commentContext='';
                    this.innerVisible = false;
                    this.CommentDialogVisible = false;

                }else{
                    this.showFaild(res.data.message)
                }
            },
            // 打开普通评论窗
            openCom(){
                if(this.$store.state.userInfo  == null){
                    this.showFaild('请先登录，才能使用该功能')
                    return ;
                }
                this.commentInfo.pid = 0;
                this.innerVisible = true;
            },
            openResCom(val){
                if(this.$store.state.userInfo  == null){
                    this.showFaild('请先登录，才能使用该功能')
                    return ;
                }
                this.commentInfo.pid = val
                this.innerVisible = true;
            },
            //查看评论
            async clickComment(val){
                
                let res = await getAdoptComment(val)
                this.AdoptComment =res.data.datas
                this.commentInfo.publishId = val
                this.CommentDialogVisible = true;
            },
            //添加收藏
            async addCollection(userId,val){
                if(this.$store.state.userInfo  == null){
                    this.showFaild('请先登录，才能使用该功能')
                    return ;
                }
                if(userId==this.$store.state.userInfo.userId){
                    this.showFaild('您无法收藏自己的发布')
                    return ;
                }
                let res = await addAdoptCollection(val,this.$store.state.userInfo.userId)
                if(res.data.state ==0){
                    this.showSuccess(res.data.message)
                    this.collectionClass.push(val)
                }else{
                    this.showFaild(res.data.message)
                }
            },
            //移除收藏
            async deleteColl(val){
                let res = await deleteAdoptC(val,this.$store.state.userInfo.userId);
                if(res.data.state ==0){
                    this.showSuccess(res.data.message)
                    this.collectionClass.splice(this.collectionClass.indexOf(val),1)
                }else{
                    this.showFaild(res.data.message)
                }
            },
            
            clickCard(info) {
                this.dialogInfo = info;
                this.dialogVisible = true;
            },
            async getAdoptIdC(){
            let res = await getAdoptCId(this.$store.state.userInfo.userId)
            //console.log(res);
            this.collectionClass = res.data;
            
           },
           async getNotice(){
                let res = await getAdoptNoticeList(this.$store.state.userInfo.userId)
                this.noticeClass = res.data;
           },  
            async getInfo(val){
                let res = await getAdopt(val,10)
                this.info = res.data.datas
                this.total=res.data.count
                // console.log("这个是res--");
                // console.log(res);
                // console.log(this.info);
                this.loading = false;
            },
        }
    }
</script>

<style scoped src="./css/adoptCss.css"></style>