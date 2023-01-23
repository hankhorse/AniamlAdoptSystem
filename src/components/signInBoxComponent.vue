<template>
    <div id="box">
        <el-tabs type="border-card">
            <el-tab-pane label="登录" class="box-card">
                <el-input v-model="userSignIn.name" placeholder="请输入用户名或者邮箱"></el-input>
                <el-input v-model="userSignIn.password" placeholder="请输入密码"></el-input>
                <el-button type="primary" style="width: 100%;margin-top: 40px" @click="signIn">登录</el-button>
            </el-tab-pane>
            <el-tab-pane label="邮箱注册" class="box-card">
                <el-input v-model="userSignUp.userName" placeholder="请输入账号"></el-input>
                <el-input v-model="userSignUp.userPassword" placeholder="请输入密码"></el-input>
                <el-input v-model="userSignUp.userPhone" placeholder="请输入联系方式"></el-input>
                <el-input v-model="userSignUp.userEmail" placeholder="请输入邮箱地址"></el-input>
                <el-row>
                    <el-input v-model="userSignUp.code" placeholder="请输入验证码"
                              style="display: inline-block;width: 40%"></el-input>
                    <el-button type="primary" style="display: inline-block;width: 40%;margin-left: 20%"
                               @click="sendCode()" :loading="load" >获取验证码
                    </el-button>
                </el-row>
                <el-button type="primary" style="width: 100%;margin-top: 40px" @click="signUpbut()" >注册</el-button>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
  
    import {login} from '../api'
    import {sendcode} from '../api'
    import {regiest} from '@/api'
    /* eslint-disable */
    export default {
        name: "signInBoxComponent.vue",
        data() {
            return {
                userSignIn: {
                    name: '',
                    password: '',
                },
                userSignUp: {
                    userName: '',
                    userPassword: '',
                    userEmail:'',
                    userPhone:'',
                    code: ''
                },
                count: 0, //倒计时 计数器
                 msg: '', //如果msg为空是蓝色，点击之后变灰色
                load:false,
            }
        },
        methods: {
            async signIn() {
                let res = await login(this.userSignIn.name,this.userSignIn.password)
               
                if(res.data.state ===0){
                    this.$notify({
                    title: '成功',
                    message: '操作成功',
                    type: 'success'
                    });
                    this.$store.commit("setUserInfo", res.data.data);
                    console.log(this.$store.state.userInfo);
                    this.$router.push('/home')
                }else{
                    this.$notify({
                    title: '警告',
                    message: '登录失败，请验证账号密码',
                    type: 'warning'
                    });
                }
               
            },

            //发送邮箱
            async sendCode() {
                var _this = this;
                if (_this.userSignUp.userEmail === ''||_this.userSignUp.userName===''||_this.userSignUp.userPhone===''||_this.userSignUp.userPassword==='') {
                    _this.$message({
                        message: '请将全部信息填写完毕',
                        type: 'error'
                    });
                    return;
                }
                
                var reg = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,5}$/;
                if (!reg.test(_this.userSignUp.userEmail)) {
                    _this.$message({
                        message: '邮箱格式错误',
                        type: 'error'
                    });
                    return;
                }
                var phoneReg = /^[1][3-9][0-9]{9}$/;
                if (!phoneReg.test(_this.userSignUp.userPhone)) {
                    _this.$message({
                        message: '电话格式错误',
                        type: 'error'
                    });
                    return;
                }
                //----------------------------------------------------------------------------
                
                //----------------------------------------------------------------------------
                let res = await sendcode(this.userSignUp.userEmail)
                console.log(res);
                if(res.data.status ===200){
                    this.$notify({
                    title: '成功',
                    message: res.data.msg,
                    type: 'success'
                    });
                    
                }else{
                    this.$notify({
                    title: '警告',
                    message: res.data.msg,
                    type: 'warning'
                    });
                    return ;
                }
                this.load=true;
                this.count = 7; //赋值3秒
                var times = setInterval(() => {
                    this.count--; //递减
                    if (this.count <= 0) {
                    // <=0 变成获取按钮
                    this.load = false;
                    clearInterval(times);
                    }
                }, 1000); //1000毫秒后执行

            },
            //注册按钮
            async signUpbut() {
                var _this = this;
                if (_this.userSignUp.userName === "" ||
                _this.userSignUp.code === "" ||
                    _this.userSignUp.userPassword === "" ||
                    _this.userSignUp.userPhone === ""||
                    _this.userSignUp.userEmail===''
                    ) {
                    _this.$message({
                        message: '请填写全部信息',
                        type: 'error'
                    });
                    return;
                }
                var reg = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,5}$/;
                if (!reg.test(_this.userSignUp.userEmail)) {
                    _this.$message({
                        message: '邮箱格式错误',
                        type: 'error'
                    });
                    return;
                }
                var phoneReg = /^[1][3-9][0-9]{9}$/;
                if (!phoneReg.test(_this.userSignUp.userPhone)) {
                    _this.$message({
                        message: '电话格式错误',
                        type: 'error'
                    });
                    return;
                }

                let res = await regiest(this.userSignUp)
                this.userSignUp.userName=''
                this.userSignUp.userEmail=''
                this.userSignUp.userPassword=''
                this.userSignUp.userPhone=''
                this.userSignUp.code=''

                if(res.data.status ===200){
                    this.$notify({
                    title: '成功',
                    message: res.data.msg,
                    type: 'success'
                    });
                    
                }else{
                    this.$notify({
                    title: '警告',
                    message: res.data.msg,
                    type: 'warning'
                    });
                }
               
            },
        }
    }
</script>

<style scoped>
    #box {
        width: 500px;
        padding: 0 50px;
        height: 376px;
        opacity: 0.8;
    }

    .box-card {
        width: 400px;
        margin: auto;
    }

    .el-input {
        margin: 10px 0;
    }
</style>