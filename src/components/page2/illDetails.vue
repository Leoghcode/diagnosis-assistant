<template>
  <div id="illDetails">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="图片库" name="image-tab">
        <el-row :gutter="20">
          <el-col :span="15">
            <image-viewer :img-list="images"></image-viewer>
          </el-col>
          <el-col :span="9">
            <el-card>
              <div slot="header">
                <span>图片备注</span>
              </div>
              <div class="margin-top-m20 text-left">
                <p><strong>拍摄时间:</strong> 2018-10-18 11:00:00 </p>
                <p><strong>人员：</strong> xxx</p>
                <p><strong>严重程度：</strong> xxx </p>
                <p><strong>备注：</strong> xxx,xxxx,xxx</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="病情资料" name="ill-tab">
        <div class="passage-box">
          <h1>皮肤病A</h1>
          <p class="passage">{{ descriptions }}</p>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
  import ImageViewer from '../common/ImageViewer';
  import images from '../common/FakeImageData';

  export default {
    name: 'illDetails',
    props: [],
    components: {
      ImageViewer: ImageViewer
    },
    data() {
      return {
        images: images,
        activeName: 'image-tab',
        descriptions: descriptions
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }

  const descriptions = "皮肤作为人体的第一道生理防线和最大的器官，时刻参与着机体的功能活动，维持着机体和自然环境的对立统一，机体的异常情况也可以在皮肤表面反映出来。皮肤具备着近乎完美的生理保护功能：如屏障作用、感觉作用、调节体温、吸收作用、分泌和排泄作用等，在维护机体的健康上，起到十分重要的作用。皮肤的生理功能受到损害，引起皮肤病。\
皮肤病中最常见到的致病因素是感染病与过敏性皮肤炎，不过随着老化的退行性变化，老年性皮肤病，皮肤癌等也是重要的皮肤病，另外需注意因药物治疗疾病而引起副作用的各种皮肤障碍。具体归纳为以下几类：\
1.理化因素\
压力与摩擦、局部温度变化过快、放射、光照、热辐射、化学试剂等因素均可引起皮肤病发生。有些因素可加重皮肤病。如过度搔抓继发感染；热水烫、肥皂水洗、用药不当加重湿疹病变；曝晒可加重光敏性疾病。\
2.生物因素\
昆虫叮咬、接触某些植物、寄生虫与微生物感染均为常见致病因素，如病毒感染引起的各种病毒性皮肤病。\
3.食物与其他疾病\
有些食物如虾等易致过敏性疾病发生。内脏病变、局部感染、血液与淋巴循环障碍等可引起相关皮肤病，如糖尿病患者易患瘙痒症，局部感染引起传染性湿疹样皮炎，循环障碍可致紫绀、橡皮肿等。\
4.遗传\
有些疾病有明显的家族史，如鱼鳞病、白化病等。\
5.神经精神因素\
神经损伤可引起营养性溃疡；压力与紧张和斑秃、慢性单纯性苔藓等发病密切相关。\
6.代谢与内分泌因素\
代谢障碍可引起皮肤淀粉样变、黄色瘤等，Cushing′s综合征则易发生痤疮、多毛等。";
</script>

<style type="text/css">
  #illDetails {
    margin-left: 40%;
    width: 50%;
    height: 50%;
    padding: 10px;
    /*background-color: cyan;*/
  }
  .passage-box {
    height: 300px;
    overflow: auto;
  }
  .passage {
    text-align: left;
    margin: 5px 30px;
    line-height: 1.5em;
    text-indent: 2em;
  }
  .margin-top-m20 {
    margin-top: -20px;
  }
  .text-left {
    text-align: left;
  }
</style>