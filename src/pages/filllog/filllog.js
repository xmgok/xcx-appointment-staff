const app = getApp();
let utils = require("../../utils/util.js");
let api = utils.apiList.apipath;
let showToast = utils.showToast;
Page({
  data: {
    textarea: '',
    logId: '',
    nologFlag: true,
    temporany:[],//暂时存放recorderlist
    resLabelList: [{
        id: 0,
        text: "新添加的重要备忘1"
      },
      {
        id: 1,
        text: "新添加的重要备忘1"
      },
      {
        id: 2,
        text: "新添加的重要备忘2新添加的重要备忘2新添"
      },
      {
        id: 3,
        text: "新添加的重要备忘2新添加的重要备忘2新添"
      }
    ], //日志填写结果标签
    imgList: [{
        id: 0,
        photo: "../../images/del/up-img.jpg"
      },
      {
        id: 1,
        photo: "../../images/del/up-img.jpg"
      },
      {
        id: 2,
        photo: "../../images/del/up-img.jpg"
      },
      {
        id: 3,
        photo: "../../images/del/up-img.jpg"
      },
      {
        id: 4,
        photo: "../../images/del/up-img.jpg"
      },
      {
        id: 5,
        photo: "../../images/del/up-img.jpg"
      }
    ], //填写日志上传图片
    recoredList: [{ //体型
        title: "体型",
        active: 0,
        dataList: [{
            id: 0,
            label: "西洋梨型"
          },
          {
            id: 1,
            label: "葫芦型"
          },
          {
            id: 2,
            label: "苹果型"
          },
          {
            id: 3,
            label: "中广型"
          },
          {
            id: 4,
            label: "浮肉型"
          },
          {
            id: 5,
            label: "松垮型"
          }
        ]
      },
      { //体质
        title: "体质",
        active: 5,
        dataList: [{
            id: 0,
            label: "气虚型"
          },
          {
            id: 1,
            label: "阳虚型"
          },
          {
            id: 2,
            label: "阴虚型"
          },
          {
            id: 3,
            label: "湿热型"
          },
          {
            id: 4,
            label: "血瘀型"
          },
          {
            id: 5,
            label: "气郁型"
          },
          {
            id: 6,
            label: "特禀型"
          },
          {
            id: 7,
            label: "平和型"
          }
        ]
      },
      { //项目偏好
        title: "项目偏好",
        active: 2,
        dataList: [{
            id: 0,
            label: "手工"
          },
          {
            id: 1,
            label: "仪器"
          },
          {
            id: 2,
            label: "针剂"
          }
        ]
      },
      { //力度偏好
        title: "力度偏好",
        active: 2,
        dataList: [{
            id: 0,
            label: "轻度"
          },
          {
            id: 1,
            label: "中度"
          },
          {
            id: 2,
            label: "重度"
          }
        ]
      }
      ,
      { //既往美容史
        title: "既往美容史",
        active: 2,
        dataList: [{
            id: 0,
            label: "<1年"
          },
          {
            id: 1,
            label: "1-3年"
          },
          {
            id: 2,
            label: "3-5年"
          },
          {
            id: 3,
            label: ">5年"
          }
        ]
      },
      { //皮肤
        title: "皮肤",
        active: 2,
        dataList: [{
            id: 0,
            label: "皱纹"
          },
          {
            id: 1,
            label: "松弛"
          },
          {
            id: 2,
            label: "斑"
          },
          {
            id:3,
            label:"缺水"
          },
          {
            id:4,
            label:"暗沉"
          },
          {
            id:5,
            label:"毛孔"
          }
        ]
      },
      {//月经
        title: "皮肤",
        active: 0,
        dataList: [{
            id: 0,
            label: "准时"
          },
          {
            id: 1,
            label: "提前"
          },
          {
            id: 2,
            label: "退后"
          }
        ]
      }
    ] //客户变化记录
  },
  //图片上传
  upLoad(e) {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        var imgs = this.data.imgList;
        let idStart = this.data.imgList.length - 1;
        for (let i = 0; i < tempFilePaths.length; i++) {
          imgs.push({
            id: idStart + i,
            photo: tempFilePaths[i]
          });
        }
        this.setData({
          imgList: imgs
        });
        showToast("图片上传成功", 1);
      },
      fail: () => {
        console.log("图片上传失败", 0);
      },
      complete: () => {
        console.log("图片上传完成");
      }
    });
  },
  //点击删除标签
  delLabel(e) {
    let id = e.currentTarget.dataset.id,
      labels = this.data.resLabelList;
    labels.splice(id, 1);
    this.setData({
      resLabelList: labels
    });
  },
  //点击删除上传图片
  delImg(e) {
    let id = e.currentTarget.dataset.id,
      imgs = this.data.imgList;
    imgs.splice(id, 1);
    this.setData({
      imgList: imgs
    });
    showToast("删除成功", 1);
  },
  // 客户变化记录状态切换
  toggleLabelState(e) {
    this.setData({
      ["recoredList[" + e.currentTarget.dataset.type + "].active"]: e.currentTarget.dataset.id,
      ["temporany[" + e.currentTarget.dataset.type + "].active"]: e.currentTarget.dataset.id
    })
  },
  // textarea输入完成
  fillTextarea(e) {
    console.log(e.detail.value);
    if (e.detail.value) {
      var txts = this.data.resLabelList;
      txts.push({
        id: this.data.resLabelList.length,
        text: e.detail.value
      });
      this.setData({
        resLabelList: txts,
        textarea: ""
      });
    } else {
      showToast('请输入信息内容', 0)
    }

  },
  // 点击提交提交数据
  submit() {
    var res = [],
      img = this.data.imgList,
      txt = this.data.resLabelList,
      len = this.data.recoredList.length;
    for (var i = 0; i < len; i++) {
      var txtid = this.data.recoredList[i].active;
      res.push({
        title: this.data.recoredList[i].title,
        id: txtid,
        txt: this.data.recoredList[i].dataList[txtid].label
      });
    }
    var resetInfo = this.data.recoredList;
    for (var j = 0; j < resetInfo.length; j++) {
      resetInfo[j].active = 0;
    }
    this.setData({
      textarea: "",
      resLabelList:[],
      recoredList: resetInfo,
      imgList: []
    });
    wx.navigateTo({
      url: '../resultsallot/resultsallot'
    });
  },
  loadmore(){
    this.setData({
      temporany:this.data.recoredList
    })
  },
  onLoad(option) {
    var lsdata=this.data.recoredList;
    console.log(lsdata);
    this.setData({
      temporany:lsdata.slice(0,4)
    })
    if (option.id > 2) {
      this.setData({
        logId: option.id,
        nologFlag: true
      });
    } else {
      this.setData({
        logId: option.id,
        nologFlag: false
      });
    }
  }
});