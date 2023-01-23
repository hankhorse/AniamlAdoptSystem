<template>
    <div id="inBox">
        <el-row type="flex" justify="space-between">
            <!--页面导航-->
            <el-col id="leadBox" :span="9" style="height: 60px">
                <el-link :underline="false" @click="clickTag(1)">首页</el-link>
                <el-link :underline="false" @click="clickTag(2)">托管</el-link>
                <el-link :underline="false" @click="clickTag(3)">领养</el-link>
                <el-link  :underline="false" @click="clickTag(4)">个人</el-link>
                <!-- <el-link :underline="false" @click="clickTag(4)">话题</el-link> -->
            </el-col>

            <!--搜索输入框-->
            <el-col :span="6" style="height: 60px">
                <!-- <el-input v-model="topSearch" placeholder="请输入关键字" :suffix-icon="'el-icon-search'"></el-input> -->
            </el-col>

            <!--发布消息按钮-->
            <el-col :span="3" style="height: 60px">
                <el-dropdown @command="handleCommand">
                    <el-button type="primary">
                        我要发布<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">待领养宠物</el-dropdown-item>
                        <el-dropdown-item command="b">待托管宠物</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <!--发布消息是的对话框-->
            <!--领养-->
            <el-dialog
  title="请填写领养信息"
  :visible="dialogVisible==='a'"
  width="50%"
  
  :before-close="handleClose">
  <!-- 琛ㄥ崟椤甸潰 -->
  <el-form ref="adoptUploadData" :model="adoptUploadData" label-width="100px" >
    <el-form-item label="发布标题:" prop="adoptTitle">
      <el-input v-model="adoptUploadData.adoptTitle"></el-input>
    </el-form-item>
    <el-form-item label="联系地址:" prop="adoptAddress">
      <el-input v-model="adoptUploadData.adoptAddress"></el-input>
    </el-form-item>
    <el-form-item label="文章内容:" prop="adoptContext">
        <wysiwyg v-model="adoptUploadData.adoptContext"/>
    </el-form-item>
    <el-form-item label="上传图片:">
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
  <!-- <el-input v-model="adoptUploadData.adoptImg" disabled></el-input> -->
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取消</el-button>
    <el-button type="primary" @click="adoptConfirm()">提交</el-button>
  </span>
</el-dialog>



            <!--托管-->
            <el-dialog
                    :visible="dialogVisible==='b'"
                    title="请填写待托管信息"
                    width="55%" :before-close="handleClose">
                <el-input v-model="lookUploadData.lookTitle" style="width: 70%">
                    <template slot="prepend">托管标题：</template>
                </el-input>
                <el-input v-model="lookUploadData.lookAddress" style="width: 70%">
                    <template slot="prepend">详细地址：</template>
                </el-input>
                <el-row style="width: 1000%;margin-top: 8px;line-height: 40px">
                    <div class="el-input-group__prepend" style="display: inline-table;">托管日期：</div>
                    <el-date-picker
                            style="border-radius:0px;margin-top:1px;width: 443px;height: 42px;"
                            v-model="timeValue"
                            type="daterange"
                            value-format="yyyy-MM-dd"
                            format="yyyy 年 MM 月 dd 日"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-row>
                <el-input v-model="lookUploadData.lookPrice" style="width: 70%;margin-top:15px">
                    <template slot="prepend">预期交易价格/天：</template>
                </el-input>
                <h3>上传封面图片</h3>
                <el-upload
                  class="avatar-uploader"
                  action="http://localhost:5000/file/upload"
                name="a"
                  :show-file-list="true"
                  :on-success="handleLook"
                :before-upload="onBeforeUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
        <!-- <el-input v-model="lookUploadData.lookImg" disabled></el-input> -->
                <el-divider></el-divider>
                <h2>宠物详细情况介绍说明</h2>
                <!--富文本-->
                <wysiwyg v-model="lookUploadData.lookContext"/>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="lookAfterConfire">确 定</el-button>
                </span>
            </el-dialog>


            <!--消息图标，以及人物头像-->
            <el-col :span="3" class="userInfoClass">
                <!-- <el-col :span="8">
                    <i class="el-icon-message-solid"></i>
                </el-col> -->
                <el-col :span="24" style="height: 50px;margin: 5px auto;text-align: center;">
                    <el-avatar shape="square" :size="50" :src="checkUserIcon"></el-avatar>
                </el-col>
            </el-col>

        </el-row>
    </div>
</template>

<script>
    /* eslint-disable */
    import API from '../config/api'
    import {addLook} from '../api'
    import {addAdopt} from '../api'


    export default {
        components: {},
        name: "topGuideComponent",
        data() {
            return {
                timeValue: '',
                dialogVisible: '',
                topSearch: '',
                fileList: [],
                imageUrl: '',
                adoptUploadData: {
                    adoptTitle:'',
                    adoptImg:'',
                    adoptContext:'',
                    adoptAddress:'',
                    userId:'',
                },
                lookUploadData: {
                    lookTitle:'',
                    lookImg:'',
                    lookContext:'',
                    lookAddress:'',
                    lookPrice:'',
                    beginTime:'',
                    endTime:'',
                    userId:'',
                },
            };
        },
        mounted() {
        },
        computed: {
            checkUserIcon() {
                var _this = this;
                if (_this.$store.state.userInfo !== null) {
                    return _this.$store.state.userInfo.userIcon;
                } else {
                    return "";
                }
            },
        },
        methods: {
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
      handleClose(done) {
        this.$confirm('确定要退出嘛')
          .then(_ => {
            this.dialogVisible='';
          })
          .catch(_ => {});
      },
            
            /*确认领养按钮*/
            async adoptConfirm() {
                // console.log(this.adoptUploadData);
                //判断条件
                if (this.adoptUploadData.adoptTitle==''||this.adoptUploadData.adoptAddress==''||
                    this.adoptUploadData.adoptImg==''||this.adoptUploadData.adoptContext=='') {
                    this.$message({
                        message: '请填写全部信息',
                        type: 'error'
                    });
                    return;
                }


                this.adoptUploadData.userId= this.$store.state.userInfo.userId;
                let res = await addAdopt(this.adoptUploadData);
                console.log(res);
                if(res.data.state==0){
                this.open1();
                }else{
                 this.open2();
                }
                this.dialogVisible='';
            },
            async lookAfterConfire(){
               
                this.lookUploadData.beginTime=this.timeValue[0]
                this.lookUploadData.endTime=this.timeValue[1]
                //判断条件
                if (this.lookUploadData.beginTime==''||this.lookUploadData.endTime==''||this.lookUploadData.lookAddress==''||
                    this.lookUploadData.lookContext==''||this.lookUploadData.lookImg==''||this.lookUploadData.lookPrice==''||
                    this.lookUploadData.lookTitle=='') {
                    this.$message({
                        message: '请填写全部信息',
                        type: 'error'
                    });
                    return;
                }

                this.lookUploadData.userId= this.$store.state.userInfo.userId;
                
                //时间判断
                var nowdate = new Date().valueOf();
                let startTime = new Date(
                this.timeValue[0] + " 00:00:00"
                ).valueOf();
                 if(nowdate>startTime){
                    this.$notify({
                        title: '警告',
                        message: '发布的时间不应该过去',
                        type: 'warning'
                        });
                        return ;
                 }
               
                let res = await addLook(this.lookUploadData)
                if(res.data.state==0){
                this.open1();
                }else{
                this.open2();
                }
                this.dialogVisible='';
            },
            handleAvatarSuccess(res, file) {
            
             this.imageUrl=res;
            this.adoptUploadData.adoptImg=res;
       
            },
            // look添加图片
            handleLook(res){
                this.imageUrl=res;
                this.lookUploadData.lookImg=res;
            },
      //文件上传前
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
            /*产生随机字符*/
            randomWord(randomFlag, min, max) {
                var str = "",
                    range = min,
                    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
                    pos;
                // 随机产生
                if (randomFlag) {
                    range = Math.round(Math.random() * (max - min)) + min;
                }
                for (var i = 0; i < range; i++) {
                    pos = Math.round(Math.random() * (arr.length - 1));
                    str += arr[pos];
                }
                return 'a' + str;
            },
            /*上传前的检查*/
            beforeUpload(file) {
                let _this = this;
                if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                    _this.$message({
                        type: 'error',
                        message: '上传格式必须为jpeg/png',
                    });
                    return false;
                }
                if (file.size >= 1024000) {
                    _this.$message({
                        type: 'error',
                        message: '上传大小不能超过1M',
                    });
                    return false;
                }
            },
            /*点击不同的菜单项*/
            handleCommand(command) {
                let _this = this;
                if (_this.$store.state.userInfo === null) {
                    _this.$message({
                        type: "error",
                        message: '请先登录',
                    });
                    return;
                }
                this.dialogVisible = command;
            },
            /*点击路由到不同页面*/
            clickTag(index) {
                var _this = this
                if(index ===4 && this.$store.state.userInfo==null){
                    this.$router.push('/signin')
                }else{
                
                var elementById = document.getElementById('inBox');
                var elementsByTagName = elementById.getElementsByTagName('a');
               //console.log("-------"+index);
                for (var i = 0; i < 4; i++) {
                    if (i + 1 === index) {
                        elementsByTagName[i].style.color = '#409eff';
                    } else {
                        elementsByTagName[i].style.color = '#909090';
                    }
                }
                //console.log("-------"+index);
                switch (index) {
                    case 1:
                        _this.$router.push('home');
                        break;
                    case 2:
                        _this.$router.push('lookafter');
                        break;
                    case 3:
                        _this.$router.push('adopt');
                        break;
                    case 4:
                        _this.$router.push('user');
                        break;
                }

            }

            },
            
        },
    }
</script>
<style scoped>
    @import "~vue-wysiwyg/dist/vueWysiwyg.css";

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
    .userInfoClass .el-col:first-child i {
        font-size: 1.6rem;
        line-height: 60px;
        color: #71777c;
    }

    .userInfoClass .el-col:first-child {
        text-align: center;
    }

    .userInfoClass {
        height: 60px
    }

    #inBox {
        height: 100%;
        width: 75%;
        line-height: 60px;
        margin: 0 auto;
    }

    #leadBox .el-link {
        line-height: 60px;
        font-size: 1.2rem;
        padding: 0 1.5rem;
        color: #909090;;
    }
   
    #leadBox a:nth-child(1) {
        padding-left: 0;
        color: #409eff;
    }
</style>