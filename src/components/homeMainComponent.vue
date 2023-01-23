<template>
    <div id="homeMain">
        <!--资讯分类栏-->
        <div style="background-color: white;width: 100%">
            <div id="typeList">
                <el-row type="flex">
                    <el-link :underline="false" v-for="item in category"
                             :key="item.id"
                             @click="clickCateTag(item.id)">
                        {{item.typeName}}
                    </el-link>
                </el-row>
            </div>
        </div>
        <!--下面的文章以及信息-->
        <div style="width:83%;margin:17px auto 0 auto;" id="infoBox">
            <el-row type="flex" justify="space-between">
                <!--文章遍历-->
                <el-col :span="17" id="newsInfo" style="background-color:#ffffff" v-loading="false">
                    <!-- <el-row>
                        <el-col :span="12" :offset="9"><h1>让动物有个新的家</h1></el-col>
                    </el-row> -->
                     <el-carousel :interval="4000" type="card" height="200px">
                            <el-carousel-item >
                                <el-image
                                :src="imgone"
                                ></el-image>
                            </el-carousel-item>
                            <el-carousel-item >
                                <el-image
                                :src="imgtwo"
                                ></el-image>
                            </el-carousel-item>
                            <el-carousel-item >
                                <el-image
                                :src="imgthree"
                                ></el-image>
                            </el-carousel-item>
                            </el-carousel>
                            <!-- 卡片跳转 -->
                        <!-- <el-row>
                            <el-col :span="6" :offset="6">
                                <el-card :body-style="{ padding: '0px' }">
                                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                                <div style="padding: 14px;">
                                    <span>好吃的汉堡</span>
                                    <div class="bottom clearfix">
                                    <time class="time">{{ currentDate }}</time>
                                    <el-button type="text" class="button">操作按钮</el-button>
                                    </div>
                                </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6" :offset="3">
                                <el-card :body-style="{ padding: '0px' }">
                                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                                <div style="padding: 14px;">
                                    <span>好吃的汉堡</span>
                                    <div class="bottom clearfix">
                                    <time class="time">{{ currentDate }}</time>
                                    <el-button type="text" class="button">操作按钮</el-button>
                                    </div>
                                </div>
                                </el-card>
                            </el-col>
                        </el-row> -->
                    <!-- <ul>
                        骨架占位
                        <li v-if="loading" style="height: 200px"></li>
                        文章内容
                        <div v-if="!loading">
                            <li v-for="item in news" :key="item.id" style="padding-bottom: 0">
                                <h2 class="commontitle">{{item.title}}</h2>
                                <div class="innerconent">


                                    显示简介
                                    <div v-if="activenews.indexOf(item.id)===-1">
                                        左边图片
                                        <div class="RichContent-cover">
                                            <el-image style="width: 100%;height: 100%;" :src="item.frontPicture">
                                            </el-image>
                                        </div>
                                        右边文章内容
                                        <div class="RichContent-inner">
                                            {{item.author}}：
                                            <div v-html="item.body"></div>
                                        </div>
                                        阅读更多按钮
                                        <el-row type="flex" justify="space-between">
                                            <el-col :span="2" style="text-align: center">
                                                ......
                                            </el-col>
                                            <el-col :span="5" v-on:click.native="activenews.push(item.id)">
                                                <el-link style="color: #175199;" :underline="false">
                                                    阅读全文
                                                    <i class="el-icon-view el-icon--right"></i></el-link>
                                            </el-col>
                                        </el-row>
                                    </div>


                                    显示全文内容
                                    <div v-else>
                                        第一行显示图片以及作者信息
                                        <el-row class="innerAuthorBox">
                                            <el-image
                                                    style="width: 24px; height: 24px"
                                                    src="http://pet.jutu.xyz/author.jpg"
                                                    :fit="fit">
                                                <div slot="error" class="image-slot">
                                                    <i class="el-icon-picture-outline"></i>
                                                </div>
                                            </el-image>
                                            <el-col :span="3"
                                                    style="margin-left: 10px;font-weight: 600;color: #444;line-height:2.1">
                                                {{item.author}}
                                            </el-col>
                                        </el-row>
                                        <el-row style="color: #8590a6;font-size: 14px;line-height: 1.67;text-align: start;margin-top: 10px;margin-bottom: -4px;">
                                            {{item.likePeopleNumber}} 人喜欢了该文章
                                        </el-row>
                                        文章内容
                                        <div v-html="item.body"></div>
                                    </div>


                                    <div class="footer">
                                        底部操作栏
                                        <el-row type="flex" justify="space-between" style="line-height: 2.6rem;">
                                            喜欢按钮
                                            <el-col :span="8">
                                                <el-button type="primary" class="likeButton" icon="el-icon-caret-top">
                                                    喜欢&nbsp;{{item.likePeopleNumber}}
                                                </el-button>
                                                <el-button
                                                        class="likeButton" type="primary" icon="el-icon-caret-bottom">
                                                </el-button>
                                            </el-col>
                                            <el-col :span="6">
                                                <el-link icon="el-icon-edit" style="margin-right: 40px">评论</el-link>
                                                <el-link icon="el-icon-star-off">收藏</el-link>
                                            </el-col>
                                            <el-col :span="5">
                                                <el-link icon="el-icon-arrow-up" @click="activenews.pop(item.id)">
                                                    收起
                                                </el-link>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </li>
                        </div>
                    </ul> -->
                </el-col>
                <!--个人信息简介以及推荐-->
                <el-col :span="6" id="userInfo" style="background-color: white;max-width: 248px;height: fit-content;">
                    <!--个人信息-->
                    <div class="profile-box" v-if="this.$store.state.userInfo!==null">
                        <el-row class="profile">
                            <el-avatar :src="$store.state.userInfo.userIcon"
                                       style="width: 70px;height: 70px;">
                            </el-avatar>
                            <el-col style="width: auto;line-height: 60px;margin-left: 20px;">
                                {{$store.state.userInfo.userName}}
                            </el-col>
                        </el-row>
                        <el-row class="stat-list" type="flex" justify="space-between">
                            <el-col>
                                <span style="color: #909090">
                                    联系方式：
                                </span>
                                <span>
                                    {{$store.state.userInfo.userPhone}}
                                </span>

                            </el-col>
                        </el-row>
                      
                        <el-row  class="stat-list" type="flex" justify="space-between">
                            <el-col>
                            <el-button type="text" @click="signout()">退出登录</el-button>
                        </el-col>
                        </el-row>
                    </div>
                    <!--未登录时的占位-->
                    <div class="profile-box" style="height:160px;text-align: center" v-else>
                        <el-row type="flex" justify="center" style="margin-top: 75px">
                            <el-col :span="7">你还未登录,</el-col>
                            <el-col :span="6" v-on:click.native="$router.push('/signin')">
                                <el-link class="profileSignIn">
                                    立即登录
                                </el-link>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
            <el-row style="margin-top:20px">
                <el-col :span="6" :offset="1" shadow="always">
                    <el-card :body-style="{ height:'250px'}" style="padding-left:14px;border-radius:15px" >
                    <img  src="https://pic.hankhorse.online/images/2022/12/22/08cb72240cbe1fec7546c139ce0c29e5499c2d0b03f9176d.jpg">
                    <el-button type="primary" icon="el-icon-share" style="width:255px" @click="goToA()">前往领养</el-button>
                </el-card>
                </el-col>
                <el-col :span="6" :offset="3" shadow="always">
                    <el-card :body-style="{ height:'250px' }" style="padding-left:14px;border-radius:15px">
                    <img  src="https://pic.hankhorse.online/images/2022/12/22/07eecd8afd8e3bdc94aece3d034d90b014a99f00dfdf90c1.jpg" >
                    <el-button type="primary" icon="el-icon-share" style="width:255px" @click="goToB()">前往托管</el-button>
                    </el-card>
                </el-col>   
            </el-row>
        </div>
    </div>
</template>


<script>
    /* eslint-disable */
    import API from '../config/api';
    import api from '@/api';

    export default {
        name: "HomeMainComponent",
        data() {
            return {
                category: [],
                nowPageNum: 1,
                loading: true,
                news: [],
                activenews: [],
                imgone:'https://pic.hankhorse.online/images/2022/12/22/4e64af1df947c9ecf8748ee2f9e72531.jpg',
                imgtwo:'https://pic.hankhorse.online/images/2022/12/22/bc5b0f2f3bc2102510e7b65588d07d1d.jpg',
                imgthree:'https://pic.hankhorse.online/images/2022/12/22/b1380fbf23ad7b7fa2477ef31bce4882.jpg'
            }
        },
        mounted() {
            
        },
        methods: {
            signout(){
                this.$store.state.userInfo = null;
                this.$router.push('signin')
            },
            goToA(){
                this.$router.push('adopt')
            },
            goToB(){
                this.$router.push('lookafter')
            },

        }
    }
</script>

<style scoped src="./css/homeMainCss.css"></style>