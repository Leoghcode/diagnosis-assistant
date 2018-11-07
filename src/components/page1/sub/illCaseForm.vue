<template>
  <div>
    <el-dialog title="新建病例" width="70%" :visible.sync="dialogOpen">
      <el-row>
        <el-col :span="16" :offset="4">
          <el-form :model="illCase" label-width="80px">
            <el-form-item label="时间">
              <div class="text-left">
                <el-date-picker v-model="illCase.caseHistory.onset" type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="照片">
              <div class="text-left">
                <el-upload
                  action="/api/case-history/uploadPhotos"
                  list-type="picture-card"
                  name="photos"
                  :http-request="handleUpload"
                  :on-remove="handleRemove"
                  :auto-upload="true"
                  :file-list="localPreCaseData.preCaseImages"
                  multiple>
                  <i class="el-icon-plus"></i>
                </el-upload>
              </div>
            </el-form-item>
            <el-form-item label="病名">
              <div class="text-left">
                <el-select v-model="diseaseList" multiple filterable placeholder="请选择">
                  <el-option v-for="item in diseaseOptionList" :key="item.id" :label="item.disease" :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
            <!--  <el-form-item v-for="(ill, index) in illCase.diseaseList" :key="ill" :label="ill">
            </el-form-item> -->
            <el-form-item label="处方">
              <div class="text-left">
                <el-select v-model="presList" multiple filterable placeholder="请选择">
                  <el-option v-for="item in presOptionList" :key="item.id" :label="item.name" :value="item.name">
                  </el-option>
                </el-select>
                <!-- {{presOptionList}} -->
              </div>
            </el-form-item>

            <el-form-item label="药品">
              <medicine-table :medicines.sync="medicineList"></medicine-table>
            </el-form-item>
            <!-- <el-form-item v-for="(pres, presIndex) in presList" :label="pres.illName" :key="pres.illName">
              <div class="text-left">
                <el-select v-model="pres.presName" @change="getPresDetails($event, presIndex)" placeholder="请选择">
                  <el-option v-for="item in pres.presOptions" :key="item" :label="item" :value="item">
                  </el-option>
                </el-select>
                <el-card class="margin-top-5 padding-5">
                  <el-col :span="12" v-for="pres in pres.presDetails" :key="pres.medicine">
                    <el-form-item :label="pres.medicine">
                      <el-input size="small" :value="pres.number"></el-input>
                    </el-form-item>
                  </el-col>
                </el-card>
              </div>
            </el-form-item> -->
            <el-form-item label="备注">
              <el-input type="textarea" v-model="illCase.caseHistory.description"
               :autosize="{minRows: 3, maxRows: 6}"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="createNewCaseHistory">创建</el-button>
              <el-button @click="reset">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import options from '../../../assets/mock/mockDiseases';
import {presOptions,presDetails} from '../../../assets/mock/mockPresTemplates';
import medicineTable from './medicineRecord';

  export default {
    name: 'illCaseForm',
    props: [
      'open', 'patientId', 'preCaseData'
    ],
    components: {
      medicineTable: medicineTable
    },
    data() {
      return {
        dialogOpen: false,
        illCase: {
          caseHistory: {
            onset: '',
            description: ''
          }
        },
        imgList: [],

        diseaseOptionList: [],
        presCacheMap: {},
        presOptionList: [],

        diseaseList: [],
        presList: [],
        medicineList: [],

        // choose able data: the disease; the pres;
        // all the diseases from back
        options: options,
        // base on the diseaseList get the all pres from back.
        presOptions: presOptions,
        presDetails: presDetails,

        predImgList: [
          {'id': 2, 'name': 'ill-C', 'url': '/getimages/getPhoto?type=predictCase&photoId=42ef886c-c119-4878-a35d-18e08932dfab.jpg', 'predictResult': '皮肤病C'},
          {'id': 3, 'name': 'ill-B', 'url': '/getimages/getPhoto?type=predictCase&photoId=6f4930bf-96d2-4912-a7c0-894bffc51f60.jpg', 'predictResult': '皮肤病B'},
          {'id': 4, 'name': 'ill-A', 'url': '/getimages/getPhoto?type=predictCase&photoId=28b06241-fd35-4cb8-b92e-fe47ec09b084.jpg', 'predictResult': '皮肤病A'}
        ],

        localPreCaseData: {
          preCaseId: '',
          preCaseImages: []
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
          this.$emit('update:open', false);
        }
      },
      diseaseList: function(newList) {
        this.presList = [];
        this.presOptionList = [];
        for(var i = 0; i < newList.length; i++) {
          var presForDisease = this.presCacheMap[newList[i]];
          // 如果该病的处方模板已经从后端获取过了
          // presCacheMap = {illAId: [{id: 1, name: pres1, medicineList: [{}, {}]}], illB: []}
          if(presForDisease) {
            for(var j = 0; j < presForDisease.length; j++) {
              this.presOptionList.push(presForDisease[j]);
            }
          } else {
            // 从后端获取，然后放到presCacheMap
            this.ayncGetPresTemplate(newList[i]);
          }
        }
      },
      presList: function(newList) {
        if(newList.length == 0) return;
        var presName = newList[newList.length - 1];
        var medicineRecords = [];
        var flag = false;
        for(var key in this.presCacheMap) {
          var presForDisease = this.presCacheMap[key];
          for(var i = 0; i < presForDisease.length; i++) {
            if(presForDisease[i].name == presName) {
              medicineRecords = presForDisease[i].medicineTemplateRecords;
              flag = true; break;
            }
          }
          if(flag) break;
        }
        for(var j = 0; j < medicineRecords.length; j++) {
          var record = {
            medicine: medicineRecords[j].medicine,
            totalDose: medicineRecords[j].totalDose,
            instruction: medicineRecords[j].instruction,
            note: medicineRecords[j].note
          };
          this.medicineList.push(record);
        }
      },
      preCaseData: {
        handler: function(val) {
          this.localPreCaseData = val;
        }
      }
    },
    created: function() {
      this.getDiseaseOptions();
    },
    methods: {
      getPresOptions(illName) {
        return this.presOptions[illName];
      },
      getPresDetails(presName, presIndex) {
        console.log("getPresDetails");
        console.log(presName);
        this.presList[presIndex].presDetails = this.presDetails[presName];
      },
      reset() {
        this.illCase = {
          caseHistory: {
            onset: '',
            description: ''
          }
        };
        this.diseaseList = [];
        this.presList = [];
        this.dialogOpen = false;
      },
      handleRemove(file) {
        console.log(file);
      },
      handleUpload(file) {
        // console.log(file);
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
            self.imgList.push(imgToken);
          }
        }).catch(function(res) {

        });
      },


      getDiseaseOptions() {
        var self = this;
        self.$axios({
          method: 'get',
          url: '/api/disease/list'
        }).then(function(res) {
          self.diseaseOptionList = res.data.diseaseList;
        }).catch(function(res) {

        });
      },
      ayncGetPresTemplate(diseaseId) {
        var self = this;
        self.$axios({
          method: 'get',
          url: '/api/disease/getTemplate',
          params: {
            diseaseId: diseaseId
          }
        }).then(function(res) {
          var presTemp = res.data.medicineTemplateList;
          for(var j = 0; j < presTemp.length; j++) {
            self.presOptionList.push(presTemp[j]);
          }
          self.presCacheMap[diseaseId] = presTemp;
        }).catch(function(res) {

        });
      },
      createNewCaseHistory() {
        var self = this;
        self.$axios({
          method: 'post',
          url: '/api/case-history/add',
          data: {
            patientId: self.patientId,
            preCaseId: self.preCaseData.preCaseId,
            caseHistory: self.illCase.caseHistory,
            diseaseIds: self.diseaseList,
            medicineRecords: self.medicineList,
            photoNames: self.imgList
          }
        }).then(function(res) {
          console.log(res.data);
          // {id: 3, fee: 200, onset: null, dateTime: "43162", description: "情况严重"}
          var newCase = {
            id: res.data.caseId,
            fee: res.data.fee,
            onset: '',
            dateTime: '',
            description: ''
          }
          self.$emit('newcase', newCase);
        }).catch(function(res) {

        });
      }
    },

  }
</script>

<style scoped>
  .text-left {
    text-align: left;
  }
  .margin-top-5 {
    margin-top: 5px;
  }
  .padding-5 {
    padding: 5px;
  }
</style>