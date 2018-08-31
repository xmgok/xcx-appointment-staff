const app = getApp();

Page({
  data: {
    tab: [
      {text: '待服务', num: 2, view: 'Tab1'},
      {text: '服务中', num: 1, view: 'Tab2'},
      {text: '已服务', num: 0, view: 'Tab3'},
    ],
    tabIndex: 0,
    showChooseBed: false,
  },
  onLoad() {
  },
  switchTab({currentTarget}) {
    this.setData({tabIndex: currentTarget.dataset.index});
  },
  closeChooseBed() {
    this.setData({ showChooseBed: false });
  },
  showChooseBed() {
    this.setData({ showChooseBed: true });
  }
});
