<template>
  <div>
    <el-dialog title="新建病例" :visible.sync="dialogOpen">
      <el-row>
        <el-col :span="16" :offset="4">
          <el-form :model="illCase" label-width="80px">
            <el-form-item label="姓名">
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
            <el-form-item label="病名">
              <div class="text-left">
                <el-select v-model="illList" multiple filterable placeholder="请选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
           <!--  <el-form-item v-for="(ill, index) in illCase.illList" :key="ill" :label="ill">

            </el-form-item> -->
            <el-form-item v-for="(pres, presIndex) in prescriptions" :label="pres.illName" :key="pres.illName">
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
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="illCase.note"
               :autosize="{minRows: 3, maxRows: 6}"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">创建</el-button>
              <el-button @click="reset">取消</el-button>
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
          note: ''
        },
        illList: [],
        prescriptions: [],


        options: options,
        presOptions: presOptions,
        presDetails: presDetails
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
      },
      illList: function(newList) {
        console.log(newList);
        if(this.prescriptions.length == 0) {
          for(var i = 0; i < newList.length; i++) {
            var prescription = {
              illName: newList[i],
              presName: '',
              presOptions: this.getPresOptions(newList[i]),
              presDetails: []
            };
            this.prescriptions.push(prescription);
          }
          return;
        }
        if(newList.length == 0) {
          this.prescriptions = [];
          return;
        }
        // delete
        for(var i = 0; i < this.prescriptions.length; i++) {
          var illName = this.prescriptions[i].illName;
          for(var j = 0; j < newList.length; j++) {
            if(illName == newList[j]) break;
            else if(j == newList.length - 1) {
              this.prescriptions.splice(i, 1);
            } else {
              continue;
            }
          }
        }
        // add
        for(var i = 0; i < newList.length; i++) {
          for(var j = 0; j < this.prescriptions.length; j++) {
            var illName = this.prescriptions[j].illName;
            console.log("" + i + " " + j + " " + illName);
            if(illName == newList[i]) break;
            else if(j == this.prescriptions.length - 1) {
              var prescription = {
                illName: newList[i],
                presName: '',
                presOptions: this.getPresOptions(newList[i]),
                presDetails: []
              };
              this.prescriptions.push(prescription);
            } else {
              continue;
            }
          }
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      getPresOptions(illName) {
        return this.presOptions[illName]
      },
      getPresDetails(presName, presIndex) {
        console.log("getPresDetails");
        console.log(presName);
        this.prescriptions[presIndex].presDetails = this.presDetails[presName];
      },
      reset() {
        this.illCase = {
          name: '',
          datetime: '',
          note: ''
        };
        this.illList = [];
        this.prescriptions = [];
        this.dialogOpen = false;
      }
    },

  }


  const options = [
    {
      value: '病A',
      label: '病A'
    }, {
      value: '病B',
      label: '病B'
    }, {
      value: '病C',
      label: '病C'
    }, {
      value: '病D',
      label: '病D'
    }, {
      value: '病E',
      label: '病E'
    }
  ];
  const presOptions = {
    '病A': ['处方A-1', '处方A-2', '处方A-3'],
    '病B': ['处方B-1', '处方B-2'],
    '病C': ['处方C-1', '处方C-2', '处方C-3'],
    '病D': ['处方D-1'],
    '病E': ['处方E-1', '处方E-2']
  };
  const presDetails = {
    '处方A-1': [
      {medicine: '药A', number: '12g'},
      {medicine: '药B', number: '6片'},
      {medicine: '药C', number: '2瓶'},
      {medicine: '药D', number: '1盒'}
    ],
    '处方A-2': [
      {medicine: '药D', number: '2.5g'},
      {medicine: '药B', number: '3片'},
      {medicine: '药C', number: '1瓶'}
    ],
    '处方A-3': [
      {medicine: '药A', number: '15g'},
      {medicine: '药C', number: '1瓶'}
    ],
    '处方B-1': [
      {medicine: '药A', number: '12g'},
      {medicine: '药B', number: '6片'},
      {medicine: '药C', number: '2瓶'},
      {medicine: '药D', number: '1盒'}
    ],
    '处方B-2': [
      {medicine: '药D', number: '2.5g'},
      {medicine: '药B', number: '3片'},
      {medicine: '药C', number: '1瓶'}
    ],
    '处方C-1': [
      {medicine: '药A', number: '12g'},
      {medicine: '药B', number: '6片'},
      {medicine: '药C', number: '2瓶'},
      {medicine: '药D', number: '1盒'}
    ],
    '处方C-2': [
      {medicine: '药D', number: '2.5g'},
      {medicine: '药B', number: '3片'},
      {medicine: '药C', number: '1瓶'}
    ],
    '处方C-3': [
      {medicine: '药A', number: '15g'},
      {medicine: '药C', number: '1瓶'}
    ],
    '处方D-1': [
      {medicine: '药A', number: '12g'},
      {medicine: '药B', number: '6片'},
      {medicine: '药C', number: '2瓶'},
      {medicine: '药D', number: '1盒'}
    ],
    '处方E-1': [
      {medicine: '药D', number: '2.5g'},
      {medicine: '药B', number: '3片'},
      {medicine: '药C', number: '1瓶'}
    ],
    '处方E-2': [
      {medicine: '药A', number: '15g'},
      {medicine: '药C', number: '1瓶'}
    ],
  };
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