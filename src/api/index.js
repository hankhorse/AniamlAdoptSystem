import request from './request';

//-------User模块-------User模块-------User模块-------User模块-------User模块-------User模块
//发送邮箱
export const sendcode = (userEmail)=>request.post(`/user/getemailcode/${userEmail}`)
//注册
export const regiest = (params)=>request({
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    method:'post',
    url:'/user/register',
    params,
})
//登录
export const login = (userNameOrEmail,userPassword) =>request.get(`/user/login/${userNameOrEmail}/${userPassword}`)
//更新个人信息
export const updateUser = (params)=>request({
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    method:'put',
    url:'/user/updateUserInfo',
    params,
}) 

// -----ADOPT模块-------------ADOPT模块-----ADOPT模块-----ADOPT模块-----ADOPT模块--ADOPT模块
export const getAdopt=(current,limit)=>request.get(`/feign/pageAdopt/${current}/${limit}`)
export const deleteAdopt=(adoptId)=>request.delete(`/adopt/delelteAdopt/${adoptId}`)
export const addAdoptTwo = (params)=>request.get(`/adopt/publicAdopt`,params)
export const addAdopt = (data)=>request({
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    method:'post',
    url:'/adopt/publicAdopt',
    data,
})
//获取领养收藏
export const getAdoptCollection = (userId)=>request.get(`/feign/adoptCollection/${userId}`)
//查看我的发布
export const findByUserId = (userId)=>request.get(`/adopt/findByUserId/${userId}`)
//取消收藏
export const deleteAdoptC=(adoptId,userId)=>request.delete(`/adopt/deleteCollection/${adoptId}/${userId}`)
//添加收藏
export const addAdoptCollection=(adoptId,userId)=>request.post(`/adopt/adoptCollection/${adoptId}/${userId}`)
//获取收藏adoptId
export const getAdoptCId = (userId)=>request.get(`/adopt/getCollectionAdoptId/${userId}`)
//查看评论
export const getAdoptComment = (adoptId)=>request.get(`/feign/adoptComment/${adoptId}`)
//添加评论
export const addAdoptComment = (params)=>request({
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    method:'post',
    url:'/adopt/adoptComment',
    params,
})
//查看申请的用户
export const getAdoptNoticeUser = (adoptId)=>request.get(`/feign/getAdoptNotice/${adoptId}`)
//发送接受请求
export const addAdoptNotice = (adoptId,userId)=>request.post(`/adopt/adoptNotice/${adoptId}/${userId}`)
//取消接受请求
export const deleteAdoptNotice = (adoptId,userId)=>request.delete(`/adopt/deleteAdoptNotice/${adoptId}/${userId}`)
//查看当前用户的发送请求 集合
export const getAdoptNoticeList=(userId)=>request.get(`/adopt/getNoticeList/${userId}`)
//领养宠物
export const adoptAnimal = (adoptId,userId) => request.put(`/adopt/adoptAnimal/${adoptId}/${userId}`)

//------------------Look模块--------------Look模块--------------Look模块--------------Look模块
export const getLook = (current,limit)=>request.get(`/feign/pageLook/${current}/${limit}`)
//添加托管
export const addLook = (data)=>request({
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    method:'post',
    url:'/look/publicLook',
    data,
})
//删除托管
export const deleteLook = (LookId)=>request.delete(`/look/delelteLook/${LookId}`)
//查看我的发布托管
export const getMyLook = (userId)=>request.get(`/look/findByUserId/${userId}`)
//获取托管收藏
export const getLookCollection = (userId)=>request.get(`/feign/lookCollection/${userId}`)
//取消托管收藏
export const deleteLookC=(lookId,userId)=>request.delete(`/look/deleteLookCollection/${lookId}/${userId}`)
//获取收藏lookid
export const getLookCId = (userId)=>request.get(`/look/getCollectionlookId/${userId}`)
//添加收藏
export const addLookCollection = (lookId,userId)=>request.post(`/look/lookCollection/${lookId}/${userId}`)
//查看评论
export const gerLookComment = (lookId)=>request.get(`/feign/lookComment/${lookId}`)
//添加评论
export const addLookComment = (params)=>request({
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    method:'post',
    url:'/look/lookComment',
    params,
})
//查看申请的用户
export const getLookNoticeUser = (lookId)=>request.get(`/feign/getLookNotice/${lookId}`)
//发送接受请求
export const addLookNotice = (lookId,userId)=>request.post(`/look/lookNotice/${lookId}/${userId}`)
//取消接受请求
export const deleteLookNotice = (lookId,userId)=>request.delete(`/look/deleteLookNotice/${lookId}/${userId}`)
//查看当前用户的发送请求 集合
export const getLookNoticeList=(userId)=>request.get(`/look/getNoticeList/${userId}`)
//接收托管
export const LookAnimal  =(lookId,userId) => request.put(`/look/lookAnimal/${lookId}/${userId}`)
