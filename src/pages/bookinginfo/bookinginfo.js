const app = getApp();

Page({
  data: {},
  onLoad() {},
  onShow() {},
  editClick(){
    wx.navigateTo({
        url: '/pages/newbooking/newbooking'//这个就是我们平时对接接口传递参数的方式了 使用第一个使用 ? 号 之后的使用 &  拼接
    })
  }
});