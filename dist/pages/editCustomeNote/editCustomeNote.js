const app = getApp();
let utils = require("../../utils/util.js");
let api = utils.apiList.apipath;
let showToast = utils.showToast;
Page({
  data: {
    textarea: '',
    logId: '',
    nologFlag: true,
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
      }
    ], //填写日志上传图片
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
        // console.log("图片上传失败", 0);
      },
      complete: () => {
        // console.log("图片上传完成");
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
      txt = this.data.resLabelList;
    wx.navigateTo({
      url: '../customerDetail/customerDetail'
    });
  },
  onLoad(option) {
  }
});