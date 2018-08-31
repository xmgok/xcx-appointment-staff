const app = getApp();

Page({
  data: {
    iconSize: 24,
    value:'',
    server:[
      {nane: '已购套卡', index: 0,},
      {nane: '服务', index: 1, },
    ],
    tabIndex:1,
    ser_list:[
      {nane: '套卡1', date: 0 },
      {nane: '套卡1', date: 1 },
      {nane: '套卡1', date: 0 },
      {nane: '套卡1', date: 1 },
      {nane: '套卡1', date: 0 },
    ],
    ser_index:0,
    card_list:[
      {nane: '服务1',time:30,price:300,Present:250,count:1},
      {nane: '服务2',time:25,price:200,Present:150,count:''},
      {nane: '服务3',time:40,price:400,Present:350,count:1},
      {nane: '服务4',time:50,price:450,Present:400,count:''},
      {nane: '服务5',time:35,price:400,Present:350,count:''},
      {nane: '服务6',time:45,price:500,Present:450,count:''},
      {nane: '服务7',time:60,price:600,Present:580,count:''},
      {nane: '服务8',time:45,price:550,Present:500,count:''},
      {nane: '服务9',time:55,price:580,Present:550,count:''},
    ],
    card_index:0,
    number:2,
  },
  onLoad() {},
  onShow() {},
  bindKeyInput(e){
    this.setData({value:e.detail.value});
  },
  cancel(e){
    this.setData({value: ''});
  },
  switchTab({currentTarget}){
    this.setData({tabIndex: currentTarget.dataset.index});
  },
  sercercard({currentTarget}){
    this.setData({ser_index: currentTarget.dataset.index});
  },
  Productcard({currentTarget}){
    this.setData({card_index: currentTarget.dataset.index});
  },
});
