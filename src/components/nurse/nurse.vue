<template>
  <div id="nurse">
    <el-row class="padding-top-50" type="flex" justify="center">
      <el-col :lg="{span: 10}" :md="{span: 14}" :sm="{span: 16}">
        <el-card class="box-card" v-loading="submitLoading">
          <div slot="header">
            <h2 class="margin-0">新建实例</h2>
          </div>
          <el-row type="flex" justify="center">
            <el-col :lg="{span: 16}" :sm="{span: 16}" :xs="{span: 18}">
              <el-form class="text-left" :model="instance" label-width="60px">
                <el-form-item label="姓名">
                  <el-col  :md="16">
                    <el-input v-model="instance.name" clearable></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="手机号">
                  <el-col :md="16">
                    <el-input v-model="instance.phone" clearable></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="照片">
                  <div class="text-left">
                    <el-upload
                      action="http://192.168.1.116:8888/upload"
                      list-type="picture-card"
                      multiple>
                      <i class="el-icon-plus"></i>
                    </el-upload>
                  </div>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">创建实例</el-button>
                  <el-button @click="reset">取消</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'nurse',
    data() {
      return {
        instance: {
          name: '',
          phone: '',
          images: []
        },
        submitLoading: false
      }
    },
    methods: {
      onSubmit() {
        this.submitLoading = true;
      },
      reset() {
        this.instance = {
          name: '',
          phone: '',
          images: []
        };
      }
    }
  }
</script>

<style scoped>
  .margin-0 {
    margin-top: 0;
    margin-bottom: 0;
  }

  .text-left {
    text-align: left;
  }

  .padding-top-50 {
    padding-top: 50px;
  }

  #nurse {
    height: 100%;
    background-color: silver;
  }

  .div-center {
    width: 600px;
    margin: 0 auto;
  }
</style>