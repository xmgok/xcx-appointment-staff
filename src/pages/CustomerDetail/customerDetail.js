//Page Object
Page({
  data: {
    tapList: ["重要备忘", "客户标签", "护理规划", "消费记录", "沟通记录", "重要备忘", "客户标签", "护理规划", "消费记录", "沟通记录"],
    currentTab: 0,
    navScrollLeft: 0,
    windH: 0,
    baseinfoshow: true
  },
  //options(Object)
  onLoad: function (options) {
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          windH: res.windowHeight / 2
        })
        console.log(_this.data.windH);
      }
    })
  },
  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    console.log(cur);
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  // 跳转到编辑页面
  goEdit() {
    var url = this.data.currentTab < 1 ? "../editCustomeNote/editCustomeNote" : "../editCustomeLabel/editCustomeLabel";
    wx.navigateTo({
      url: url
    });
  },
  onPageScroll: function (e) {
    console.log(this.data.windH +';'+ e.scrollTop);
    if (e.scrollTop >= this.data.windH) {
      // 滚动到页面的一半
      this.setData({
        baseinfoshow: false
      });
    }
  },
  onReady: function () {

  },
  onShow: function () {

  }

});