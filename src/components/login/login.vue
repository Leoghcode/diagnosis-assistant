<template>
  <div id="login">
    <br><br><br><br><br><br>
    <el-card class="box-card" center="true">
      <div class="clearfix">
        <br><br>
        <h1>欢迎来到<span>&nbspNAMI皮肤病医院</span></h1>
        <br><br>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="登陆" name="first">
        <div class="login-box" id="app" >
          <el-row>
          <br><br>
            <el-col :span="16" :offset="4">
              <el-input id="name"  v-model="user" placeholder="请输入帐号">
                <template slot="prepend">帐号</template>
              </el-input> 
            </el-col>
          </el-row>
          <br><br><br>
          <el-row>
            <el-col :span="16" :offset="4">
              <el-input id="password" v-model="password" type="password" placeholder="请输入密码">
                <template slot="prepend">密码</template>
              </el-input>
            </el-col>
          </el-row>
          <br><br><br>
          <el-row>
            <el-col :span="16" :offset="4">
              <el-button type="primary" @click= "postrequest($event)">登录</el-button>
              <br><br>
            </el-col>
          </el-row>
        </div>
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">
          <div class="login-box" id="app" >
            <el-row>
            <br><br>
              <el-col :span="16" :offset="4">
                <el-input id="name"  v-model="user" placeholder="请输入帐号">
                  <template slot="prepend">帐号</template>
                </el-input> 
              </el-col>
            </el-row>
            <br><br><br>
            <el-row>
              <el-col :span="16" :offset="4">
                <el-input id="password" v-model="password" type="password" placeholder="请输入密码">
                  <template slot="prepend">密码</template>
                </el-input>
              </el-col>
            </el-row>
            <br><br><br>
            <el-row>
              <el-col :span="16" :offset="4">
                <el-input id="password" v-model="confirmpassword" type="password" placeholder="请确认密码">
                  <template slot="prepend">确认密码</template>
                </el-input>
              </el-col>
            </el-row>
            <br><br><br>
            <el-row>
              <el-col :span="16" :offset="4">
                <el-button type="primary" @click= "postrequest($event)">注册</el-button>
                <br><br>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>    
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: '',
      password: '',
      activeName: 'first'
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

