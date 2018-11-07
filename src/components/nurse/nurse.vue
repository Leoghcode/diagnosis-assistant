<template>
  <div id="nurse">
    <el-row class="padding-top-50" type="flex" justify="center">
      <el-col :lg="{span: 10}" :md="{span: 14}" :sm="{span: 16}">
        <el-card class="box-card" v-loading="submitLoading">
          <div slot="header">
            <h2 class="margin-0">{{ isNewPatient ? '完善新病人信息' : '新建实例'}}</h2>
          </div>
          <el-row type="flex" justify="center">
            <el-col :lg="{span: 16}" :sm="{span: 16}" :xs="{span: 18}">
              <div v-show="!isNewPatient">
                <el-form class="text-left" :model="patient" label-width="60px">
                  <el-form-item label="医师">
                    <el-col :md="16">
                      <el-select v-model="doctor" placeholder="请选择">
                        <el-option v-for="item in doctorList" :key="item.id" :label="item.username" :value="item.id"></el-option>
                      </el-select>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="姓名">
                    <el-col  :md="16">
                      <el-input v-model="patient.name" clearable></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="手机号">
                    <el-col :md="16">
                      <el-input v-model="patient.phone" clearable></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="照片">
                    <div class="text-left">
                      <el-upload
                        ref="uploadphoto"
                        action="http://192.168.1.116:8888/upload"
                        list-type="picture-card"
                        multiple
                        :http-request="handleUpload"
                      >
                        <i class="el-icon-plus"></i>
                      </el-upload>
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="createPreCase">创建实例</el-button>
                    <el-button @click="reset">取消</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <div v-show="isNewPatient">
                <el-form class="text-left" :model="newPatient" label-width="60px">
                  <el-form-item label="年龄">
                    <el-col :md="16">
                      <el-input v-model="newPatient.age" clearable></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="性别">
                    <el-col :md="16">
                      <el-input v-model="newPatient.gender" clearable></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="性别">
                    <el-col :md="16">
                      <el-input v-model="newPatient.address" clearable></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="completePatientInfo">完善信息</el-button>
                    <el-button @click="resetNewPatient">取消</el-button>
                  </el-form-item>
                </el-form>
              </div>
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
        patient: {
          name: '',
          phone: ''
        },
        imgList: [],
        submitLoading: false,
        doctor: '',
        doctorList: [],
        isNewPatient: false,
        newPatient: {
          id: '',
          age: '',
          gender: '',
          address: ''
        }
      }
    },
    created: function() {
      this.getDoctorList();
    },
    methods: {
      getDoctorList() {
        var self = this;
        self.$axios({
          method: 'get',
          url: '/api/users'
        }).then(function(res){
          if(res.data.status == 'success') {
            self.doctorList = res.data.userList;
          }
        }).catch(function(res){

        });
      },
      handleUpload(file) {
        var formData = new FormData();
        formData.append('photos', file.file);
        var self = this;
        self.$axios({
          method: 'post',
          url: '/api/case-history/uploadPhotos',
          headers: {
           'Content-Type': 'multipart/form-data'
          },
          data: formData
        }).then(function(res) {
          if(res.data.status == 'success') {
            file.onSuccess('upload success');
            var imgToken = res.data.fileNames[0];
            var predRes = ['皮肤病A', '皮肤病B', '皮肤病C'];
            var resIndex = Math.floor(Math.random() * 3);
            self.imgList.push({'imageUrl': imgToken, 'predictResult': predRes[resIndex]});
          }
        }).catch(function(res) {

        });
      },
      createPreCase() {
        var self = this;
        self.submitLoading = true;
        self.$axios({
          method: 'post',
          url: '/api/case-history/createPreCase',
          data: {
            patient: self.patient,
            user: {
              id: self.doctor
            },
            symptomFigureList: self.imgList
          }
        }).then(function(res) {
          self.submitLoading = false;
          if(res.data.status == 'success') {
            self.reset();
            if(typeof res.data.message == "object") {
              self.newPatient.id = res.data.message.id;
              self.isNewPatient = true;
            }
          }
        }).catch(function(res) {

        });

      },
      reset() {
        this.patient = {
          name: '',
          phone: ''
        };
        this.imgList = [];
        this.$refs.uploadphoto.clearFiles();
      },
      completePatientInfo() {
        var self = this;
        self.newPatient.gender = self.newPatient.gender == '男' ? 1 : 0;
        self.$axios({
          method: 'post',
          url: '/api/patient/edit',
          data: self.newPatient
        }).then(function(res) {
          console.log(res);
          self.resetNewPatient();
        }).catch(function(res) {

        });
      },
      resetNewPatient() {
        this.newPatient = {
          id: '',
          age: '',
          gender: '',
          address: ''
        };
        this.isNewPatient = false;
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
    /*background-color: silver;*/
  }

  .div-center {
    width: 600px;
    margin: 0 auto;
  }
</style>