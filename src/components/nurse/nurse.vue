<template>
  <div id="nurse">
    <el-row class="padding-top-50">
      <el-col :lg="{span: 12, offset: 6}" :md="{span: 14, offset: 5}" :sm="{span: 16, offset: 4}">
        <el-card class="box-card" v-loading="submitLoading">
          <div slot="header">
            <h2 class="margin-0">新建实例</h2>
          </div>
          <el-form class="text-left" :model="instance" label-width="180px">
            <el-form-item label="病人">
              <el-col :span="10">
                <el-input v-model="instance.name" clearable></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="照片">
              <div class="text-left">
                <el-upload
                  action="http://localhost:8888/upload"
                  list-type="picture-card"
                  multiple>
                  <i class="el-icon-plus"></i>
                </el-upload>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">创建实例</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
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
          images: []
        },
        submitLoading: false
      }
    },
    methods: {
      onSubmit() {
        this.submitLoading = true;
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
</style>