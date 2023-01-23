<template>
  <div style="width:60%;margin: 0 auto;overflow: auto;margin-top:15px">
    <div id="userDetailMain">
    <!-- 头部模块 -->
        <div style="height:100px;width:70%;margin-left: 15%;" >
          <!-- 轮播图 别删 -->
            <!-- <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item >
                <el-image
                :src="imgone"
                ></el-image>
            </el-carousel-item>
            <el-carousel-item >
                <el-image
                :src="imgone"
                ></el-image>
            </el-carousel-item>
            <el-carousel-item >
                <el-image
                :src="imgone"
                ></el-image>
            </el-carousel-item>
            </el-carousel> -->
            <h1 style="padding-top:15px">修改你的个人信息</h1>
        </div>
    <!-- 输入框模块 -->
        <div style="width:60%;margin-left:20%">
            <el-form ref="userForm" :model="userForm" label-width="80px">
            <el-form-item label="用户昵称">
            <el-input v-model="userForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="用户密码">
            <el-input v-model="userForm.userPassword"></el-input>
            </el-form-item>
            <el-form-item label="用户邮箱">
            <el-input v-model="userForm.userEmail"></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
            <el-input v-model="userForm.userPhone"></el-input>
            </el-form-item>
            <el-form-item label="联系微信">
            <el-input v-model="userForm.userChat"></el-input>
            </el-form-item>
            <el-form-item label="居住地址">
            <el-input v-model="userForm.userAddress"></el-input>
            </el-form-item>
            <el-form-item label="更改头像">
                <el-upload
                  class="avatar-uploader"
                  action="http://localhost:5000/file/upload"
                name="a"
                  :show-file-list="true"
                  :on-success="handleAvatarSuccess"
                :before-upload="onBeforeUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <!-- <el-input v-model="userForm.userIcon" disabled></el-input> -->
            </el-form-item>
        </el-form>
        </div>
        <el-button type="primary" style="width:25%;margin-left:250px" @click="updateU()">更新</el-button>
    </div>
  </div>
</template>

<script>
import {updateUser} from '@/api'
export default {
    data(){
        return{
            userForm:{
                
            },
            //imgone:'http://42.194.222.130:8080/usr/download/spring/158263ae-4410-41cc-95ff-c845cd1f74be.jpg'
            imageUrl:'',

        }
    },
    mounted(){
        this.userForm  = this.$store.state.userInfo;
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
      //上传图片前
      onBeforeUpload(file){
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 1;
    
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
        }
        return isJPG && isLt2M;
      },
      handleAvatarSuccess(res) {
            this.imageUrl=res;
           this.userForm.userIcon=res;
      
           },

      //更新用户
      async updateU(){
        
        let res = await updateUser(this.userForm)
        
        if(res.data.state==0){
                this.open1();
                this.$store.commit("setUserInfo", this.userForm);
                
        }else{
          this.$notify({
          title: '警告',
          message: res.data.message,
          type: 'warning'
        });
        }
      }
      
    }
}
</script>

<style>

#userDetailMain{

    background-color: white;
    height: 800px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }



</style>