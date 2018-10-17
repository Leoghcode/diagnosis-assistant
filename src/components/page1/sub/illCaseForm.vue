<template>
  <div>
    <el-dialog title="新建病例" :visible.sync="dialogOpen">
      <el-row>
        <el-col :span="16" :offset="4">
          <el-form :model="illCase" label-width="80px">
            <el-form-item label="病人">
              <el-col :span="10">
                <el-input v-model="illCase.name" clearable></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="时间">
              <div class="text-left">
                <el-date-picker v-model="illCase.datetime" type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </div>
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
            <el-form-item label="处方">
              <el-input type="textarea" v-model="illCase.prescription"
               :autosize="{minRows: 3, maxRows: 6}"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'illCaseForm',
    props: [
      'open'
    ],
    data() {
      return {
        dialogOpen: false,
        illCase: {
          name: '',
          datetime: '',
          prescription: ''
        }
      }
    },
    watch: {
      open: function(val) {
        if(val == true) {
          this.dialogOpen = true;
        }
      },
      dialogOpen: function(val) {
        if(val == false) {
          this.$emit('close');
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    },

  }
</script>

<style scoped>
  .text-left {
    text-align: left;
  }
</style>