<template>
    <div style="width: 60%; margin: 0 auto;">
        <div class="lookAfter-main">
            <el-row v-loading="loading">
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
                            <el-col style="width:30%;height:100%">
                                <el-col style="width: 100%;">{{item.userName}}</el-col>
                                <el-col style="width: 100%;" class="meta-box">
                                    <!-- {{$moment(item.createTime).startOf("d").fromNow(true)+"前"}} -->
                                    {{ $moment(item.createTime).format('YYYY-MM-DD HH:mm') }}
                                </el-col>
                            </el-col>
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
                                        <el-button type="info" plain>开始日期：{{$moment(item.beginTime).format("YYYY年 M月D日")}}
                                        </el-button>
                                    </el-col>
                                    <el-col class="look-after-info">
                                        <el-button type="info" plain>截止日期：{{$moment(item.endTime).format("YYYY年 M月D日")}}
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
                        <el-row class="pin-bottom">
                            <el-col>
                                <div style="width: 30%; margin: 0 auto;"
                                     v-if="collectionClass.indexOf(item.lookId)===-1"
                                     @click="addCollection(item.userId,item.lookId)">
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
                                     @click="deleteColl(item.lookId)">
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
                                <div style="width: 30%; margin: 0 auto;" @click="clickComment(item.lookId)">
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
                                     v-else-if="noticeClass.indexOf(item.lookId)===-1"
                                     @click="addNotice(item.userId,item.lookId)">
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
                                     @click="deleteNotice(item.lookId)">
                                    <a href="javascript:void(0)" style="text-decoration: none">
                                        <img style="position: relative;top:5px;width: 25px; height: 25px;display: inline-block;"
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

            <!-- 评论用的对话框 -->
            <el-dialog
                title="评论"
                :visible.sync="CommentDialogVisible"
                width="55%"
                >
                <el-empty v-if="this.LookComment==null" description="描述文字"></el-empty>
            <!-- 这里存放评论的内容 -->
                <ul v-else style="background: #f4f5f5;">
                    
                    <li class="lookAfter-li" v-for="item in LookComment" :key="item.lookCommentId">
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
    /* eslint-disable */
    import API from "../config/api"
    import {getLook} from "../api"
    import {deleteLookC} from "../api"
    import {getLookCId} from "../api"
    import {addLookCollection} from "../api"
    import {gerLookComment} from "../api"
    import {addLookComment} from "../api"
    import {addLookNotice} from "@/api"
    import {deleteLookNotice} from "@/api"
    import {getLookNoticeList} from "@/api"
    export default {
        name: "lookAfterComponent",
        data() {
            return {
                info: [],
                loading: true,
                CommentDialogVisible:false,
                pagesize:10,
                total:10,
                nowsPageNum: 1,
                /*是否显示对话框*/
                dialogVisible: false,
                /*对话框信息*/
                dialogInfo: '',
                activeClass: [],
                //收藏的集合
                collectionClass:[],
                //接收的集合
                noticeClass:[],
                innerVisible:false,
                test:'',
                //评论的信息
                commentInfo:{
                    userId:1,
                    publishId:1,
                    pid:0,
                    commentContext:'',
                },
                LookComment:[
                    
                ]
            }
        },
        mounted() {
            // this.getNextInfo();
            this.getInfo(1);
           this.getLookC();
           this.getNotice();
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
            async addNotice(userId,lookId){
                if(this.$store.state.userInfo  == null){
                    this.showFaild('请先登录，才能使用该功能')
                    return ;
                }
                if(userId==this.$store.state.userInfo.userId){
                    this.showFaild('您无法接收自己的发布')
                    return ;
                }
                let res = await addLookNotice(lookId,this.$store.state.userInfo.userId);
                //console.log(res);
                if(res.data.state ==0){
                    this.showSuccess('成功向对方发送请求')
                    this.noticeClass.push(lookId)
                }else{
                    this.showFaild('发送接收信息失败')
                }
            },
            //删除发送接收请求
            async deleteNotice(lookId){
                let res = await deleteLookNotice(lookId,this.$store.state.userInfo.userId)
                
                if(res.data.state ==0){
                    this.showSuccess(res.data.message)
                    this.noticeClass.splice(this.noticeClass.indexOf(lookId),1)
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
                let res = await addLookComment(this.commentInfo)
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
                
                this.commentInfo.pid = 0;
                this.innerVisible = true;
            },
            openResCom(val){
               
                this.commentInfo.pid = val
                this.innerVisible = true;
            },
            //查看评论
            async clickComment(val){
                this.test =val;
                let res = await gerLookComment(val)
                this.LookComment =res.data.datas
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
                let res = await addLookCollection(val,this.$store.state.userInfo.userId)
                if(res.data.state ==0){
                    this.showSuccess(res.data.message)
                    this.collectionClass.push(val)
                }else{
                    this.showFaild(res.data.message)
                }
            },
            //移除收藏
            async deleteColl(val){
                let res = await deleteLookC(val,this.$store.state.userInfo.userId);
                if(res.data.state ==0){
                    this.showSuccess(res.data.message)
                    this.collectionClass.splice(this.collectionClass.indexOf(val),1)
                }else{
                    this.showFaild(res.data.message)
                }
            },

            becomeTheClient(id) {
                this.activeClass.push(id + 'get');
                this.$message({
                    type: 'success',
                    message: '消息已发送，用户等待确认'
                })
            },
            clickCard(info) {
                this.dialogInfo = info;
                this.dialogVisible = true;
            },
           async getLookC(){
            let res = await getLookCId(this.$store.state.userInfo.userId)
            //console.log(res);
            this.collectionClass = res.data;
           },
           async getNotice(){
                let res = await getLookNoticeList(this.$store.state.userInfo.userId)
                this.noticeClass = res.data;
           },  

            async getInfo(val){
                let res = await getLook(val,10)
                this.info = res.data.datas
                this.total=res.data.count
               
                this.loading = false;
            },
        }
    }
</script>

<style scoped src="./css/lookAfterCss.css"></style>