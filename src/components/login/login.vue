<template>
  <div id="login">
    <div class="container">
      <header>
        <br>
        <br><br><br><br><br><br><br><br><br><br>
        <h1>欢迎来到<span>&nbspNAMI皮肤病医院</span></h1>

      </header>
    </div>
    <br><br><br><br><br><br><br><br>
    <div class="login-box" id="app" >
    <el-row>
      <el-col :span="4" :offset="10">
        <el-input id="name"  v-model="user" placeholder="请输入帐号">
          <template slot="prepend">帐号</template>
        </el-input> 
      </el-col>
    </el-row>
    <br><br><br>
    <el-row>
      <el-col :span="4" :offset="10">
        <el-input id="password" v-model="password" type="password" placeholder="请输入密码">
          <template slot="prepend">密码</template>
        </el-input>
      </el-col>
    </el-row>
    <br><br><br>
    <el-row>
      <el-col :span="4" :offset="10">
        <el-button type="primary" @click= "postrequest($event)">登录</el-button>
      </el-col>
    </el-row>
    </div> 
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: '',
      password: ''
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

