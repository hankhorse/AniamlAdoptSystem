import Vue from 'vue'
import VueRouter from "vue-router";
/**
 * 主页面
 * */
import signInPage from "@/page/signInPage";
import homePage from "@/page/homePage";
/**
 * 组件
 * */
import homeMainComponent from "@/components/homeMainComponent";
import lookAfterComponent from "@/components/lookAfterComponent";
import adoptComponent from "@/components/adoptComponent";
import topicComponent from "@/components/topicComponent";
// import userInfoComponent from ""
import UserInfo from "@/components/UserInfo"
import UserDetail from "@/components/UserInfoChild/UserDetail"
import AdoptCollection from "@/components/UserInfoChild/AdoptCollection"
import AdoptPublish from "@/components/UserInfoChild/adoptPublish"
import LookPublish from "@/components/UserInfoChild/LookPublish"
import LookCollection from "@/components/UserInfoChild/LookCollection"
import Chat from "@/components/UserInfoChild/Chat"
//import { component } from 'vue/types/umd';
Vue.use(VueRouter)


const routes = [
    // 路由原则为，同时满足条件的路由，谁在前匹配谁
    //登录页面
    {
        path: '/signin', component: signInPage
    },
    //主页面路由
    {
        path: '', component: homePage,
        redirect:'/home',
        children: [
            {
                path: '/home', component: homeMainComponent
            },
            {
                path: "/lookafter", component: lookAfterComponent
            },
            {
                path: "/adopt", component: adoptComponent
            },
            {
                path: "/topic", component: topicComponent
            },
            {
                path:"/user",               
                component: UserInfo,
                redirect:'/userDetail',
                children:[
                  {
                    path: "/userDetail",
                    component: UserDetail
                  },
                  {
                    path:"/adoptPublish",
                    component: AdoptPublish
                  },
                  {
                    path:"/adoptCollection",
                    component: AdoptCollection
                  },
                  {
                    path:"/lookPublish",
                    component: LookPublish
                  },
                  {
                    path:"/lookCollection",
                    component: LookCollection
                  },
                  {
                    path:"/chat",
                    component: Chat
                  }
                ]
            }
        ]
    },
    //首页，错误导航
    {
        path: '/*', component: homePage,
        children: [
            {
                path: '', component: homeMainComponent,
            }
        ]
    }
];

/* eslint-disable */
const router = new VueRouter({
    routes, // (缩写) 相当于 routes: routes
    mode: 'history',
});

export default router;