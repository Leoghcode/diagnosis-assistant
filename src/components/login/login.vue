<template>
  <div id="login">
    <br><br><br><br><br><br>
    <el-col :span="16" :offset="9">
      <el-card class="box-card">
        <div class="clearfix">
          <br><br>
          <h1>欢迎来到<span>&nbspNAMI皮肤病医院</span></h1>
          <br><br>
        </div>
        <el-tabs v-model="activeName">
          <el-tab-pane label="登陆" name="first">
          <el-col :span="24">

          <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" label-width="100px" class="">
            <el-form-item prop="loginUsername">
              <el-input v-model="loginForm.loginUsername" placeholder="请输入用户名">
                <template slot="prepend">帐号</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="loginPassword">
              <el-input type="password" v-model="loginForm.loginPassword" autocomplete="off" placeholder="请输入密码">
                <template slot="prepend">密码</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="loginSubmit('loginForm')">登录</el-button>
              <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
          </el-form>
          </el-col>

          <!-- <div class="login-box" id="app" >
            <el-row>
            <br><br>
              <el-col :span="16" :offset="4">
                <el-input id="loginName"  v-model="user" placeholder="请输入帐号">
                  <template slot="prepend">帐号</template>
                </el-input> 
              </el-col>
            </el-row>
            <br><br><br>
            <el-row>
              <el-col :span="16" :offset="4">
                <el-input id="loginPassword" v-model="password" type="password" placeholder="请输入密码">
                  <template slot="prepend">密码</template>
                </el-input>
              </el-col>
            </el-row>
            <br><br><br>
            <el-row>
              <el-col :span="16" :offset="4">
                <el-button type="primary" @click= "login($event)">登录</el-button>
                <br><br>
              </el-col>
            </el-row>
          </div> -->
          </el-tab-pane>
          <el-tab-pane label="注册" name="second">

            <el-form :model="registerForm" status-icon :rules="registerRules" ref="registerForm" label-width="100px" class="">
              <el-form-item prop="registerUsername">
                <el-input v-model="registerForm.username" placeholder="请输入用户名">
                  <template slot="prepend">用户名</template>
                </el-input>
              </el-form-item>
              <el-form-item prop="registerPassword">
                <el-input type="password" v-model="registerForm.registerPassword" autocomplete="off" placeholder="请输入密码">
                  <template slot="prepend">密码</template>
                </el-input>
              </el-form-item>
              <el-form-item prop="registerConfirmPassword">
                <el-input type="password" v-model="registerForm.registerConfirmPassword" autocomplete="off" placeholder="请再次输入密码">
                  <template slot="prepend">确认密码</template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="registerSubmit('registerForm')">注册</el-button>
                <el-button @click="resetForm('registerForm')">重置</el-button>
              </el-form-item>
            </el-form>

            <!-- <div class="login-box" id="app" >
              <el-row>
              <br><br>
                <el-col :span="16" :offset="4">
                  <el-input id="registerName"  v-model="user" placeholder="请输入帐号">
                    <template slot="prepend">帐号</template>
                  </el-input> 
                </el-col>
              </el-row>
              <br><br><br>
              <el-row>
                <el-col :span="16" :offset="4">
                  <el-input id="registerPassword" v-model="password" type="password" placeholder="请输入密码">
                    <template slot="prepend">密码</template>
                  </el-input>
                </el-col>
              </el-row>
              <br><br><br>
              <el-row>
                <el-col :span="16" :offset="4">
                  <el-input id="confirmPassword" v-model="password2" type="password" placeholder="请确认密码">
                    <template slot="prepend">确认密码</template>
                  </el-input>
                </el-col>
              </el-row>
              <br><br><br>
              <el-row>
                <el-col :span="16" :offset="4">
                  <el-button type="primary" @click= "register($event)">注册</el-button>
                  <br><br>
                </el-col>
              </el-row>
            </div> -->
          </el-tab-pane>
        </el-tabs>
      </el-card> 
    </el-col>   
  </div>
</template>

<script>
export default {
  data() {
    var validateLoginPassword = (rule, value, callback) => {
      var self = this;
      if (!value) {
        callback(new Error('请输入密码'));
      } else {
        if (self.loginForm.loginPassword !== '') {
          self.$refs.loginForm.validateField('loginPassword');
        }
        callback();
      }
    };
    var validateLoginUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入用户名！'));
      } else {
        callback();
      }
    };
    var validateRegisterPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'));
      } else {
        if (this.registerForm.registerPassword !== '') {
          this.$refs.registerForm.validateField('registerPassword');
        }
        callback();
      }
    };
    var validateRegisterPassword2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validateRegisterUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('用户名不能为空！'));
      } else {
        callback();
      }
    };
    return {
      activeName: 'first',
      loginForm:{
        loginUsername: '',
        loginPassword: '',
      },
      registerForm: {
        registerUsername: '',
        registerPassword: '',
        registerConfrimPassword: ''
      },
      loginRules: {
        loginUsername: [
          { validator: validateLoginUsername, trigger: 'blur' }
        ],
        loginPassword: [
          { validator: validateLoginPassword, trigger: 'blur' }
        ]
      },
      registerRules: {
        registerUsername: [
          { validator: validateRegisterUsername, trigger: 'blur' }
        ],
        registerPassword: [
          { validator: validateRegisterPassword, trigger: 'blur' }
        ],
        registerConfirmPassword: [
          { validator: validateRegisterPassword2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    postrequest(event){
      this.$http.post('http://10.60.38.181:5310/register', {
        username: 'yzy',
        password: 'yzy'
      })
      .then(function (response) {
        console.log(response['data']['result']);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getrequest(event){
      this.$http.get('http://10.60.38.181:5310/hello?username=yzy')
      .then(function (response) {
        console.log(response['data']['result']);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    register(event){
      this.$axios({
        method: "post",
        url:"/api/register",
        data:{
          username: "小黄",
          password: "123456",
          idCard: "4502031000"
        }
      })
      .then(function (response) {
        console.log(response['data']['registerStatus']);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    login(event){
      var self = this;
      this.$axios({
        method: "post",
        url:"/api/login",
        data:{
          username: self.loginUsername,
          password: self.loginPassword
        }
      })
      .then(function (response) {
        console.log(response['data']['status']);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    loginSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var self = this;
          this.$axios({
            method: "post",
            url:"/api/register",
            data:{
              username: self.registerUsername,
              password: self.registerPassword,
              idCard: "4502031000"
            }
          })
          .then(function (response) {
            console.log(response['data']['registerStatus']);
          })
          .catch(function (error) {
            console.log(error);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    registerSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var self = this;
          this.$axios({
            method: "post",
            url:"/api/login",
            data:{
              username: self.user,
              password: self.password
            }
          })
          .then(function (response) {
            console.log(response['data']['status']);
          })
          .catch(function (error) {
            console.log(error);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>

