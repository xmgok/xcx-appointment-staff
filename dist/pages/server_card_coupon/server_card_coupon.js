const app = getApp();

Page({
  data: {
    value:'',
    width:'',
    height:wx.getSystemInfoSync().screenHeight-225+'px',
    server:[
      {nane: '从套卡中选', index: 0,},
      {nane: '从所有服务中选', index: 1, },
      {nane: '使用优惠卷选', index: 2, }
    ],
    tabIndex:0,
    //套卡list
    cardindex:0,
    cardList: [
      {
        name: '套卡A',
        date: 0,
        serList: [
          {
              id: 1,
              name: '服务a',
              time: 30,
              price: 300,
              Present: 250,
              count: 0
          },
          {
              id: 2,
              name: '服务b',
              time: 25,
              price: 200,
              Present: 150,
              count: 0,
          },
          {
              id: 3,
              name: '服务c',
              time: 45,
              price: 400,
              Present: 350,
              count: 0
          },
          {
              id: 4,
              name: '服务d',
              time: 40,
              price: 450,
              Present: 400,
              count: 0
          },
          {
              id: 5,
              name: '服务e',
              time: 30,
              price: 300,
              Present: 250,
              count: 0
          },
          {
              id: 6,
              name: '服务b',
              time: 25,
              price: 200,
              Present: 150,
              count: 0,
          },
          {
              id: 7,
              name: '服务g',
              time: 0,
              price: 400,
              Present: 350,
              count: 0
          },
          {
              id: 8,
              name: '服务h',
              time: 0,
              price: 450,
              Present: 400,
              count: 0
          },
        ],
      },
      {
        name: '套卡B',
        date: 12,
        serList: [
            {
                id: 1,
                name: '服务a',
                time: 30,
                price: 300,
                Present: 250,
                count: 0
            },
            {
                id: 2,
                name: '服务b',
                time: 25,
                price: 200,
                Present: 150,
                count: 0,
            },
            {
                id: 3,
                name: '服务b',
                time: 25,
                price: 200,
                Present: 150,
                count: 0,
            },
            {
                id: 4,
                name: '服务x',
                time: 30,
                price: 300,
                Present: 250,
                count: 0
            },
            {
                id: 5,
                name: '服务y',
                time: 25,
                price: 200,
                Present: 150,
                count: 0
            },

            {
                id: 6,
                name: '服务z',
                time: 55,
                price: 580,
                Present: 550,
                count: 0
            },
            {
                id: 7,
                name: '服务j',
                time: 0,
                price: 580,
                Present: 550,
                count: 0
            },
          ],
      },
    ],
    //服务list
    sercerindex:0,
    serverList: [
      {
          name: '全部',
          serList: [{
                  id: 1,
                  name: '服务1',
                  time: 30,
                  price: 300,
                  Present: 250,
                  count: 0
              },
              {
                  id: 2,
                  name: '服务2',
                  time: 25,
                  price: 200,
                  Present: 150,
                  count: 0,
              },
              {
                  id: 3,
                  name: '服务3',
                  time: 40,
                  price: 400,
                  Present: 350,
                  count: 0
              },
              {
                  id: 4,
                  name: '服务4',
                  time: 50,
                  price: 450,
                  Present: 400,
                  count: 0
              },
          ],
      },
      {
          name: '护肤',
          serList: [{
                  id: 5,
                  name: '服务1',
                  time: 30,
                  price: 300,
                  Present: 250,
                  count: 0
              },
              {
                  id: 6,
                  name: '服务2',
                  time: 25,
                  price: 200,
                  Present: 150,
                  count: 0
              },
              {
                  id: 7,
                  name: '服务9',
                  time: 55,
                  price: 580,
                  Present: 550,
                  count: 0
              },
          ],
      },
    ],
    //优惠卷list
    couponindex:0,
    couponList: [
      {
          name: '优惠卷a',
          date: 10,
          serList: [{
                  id: 1,
                  name: '服务1',
                  time: 30,
                  price: 300,
                  Present: 250,
                  count: 0
              },
              {
                  id: 2,
                  name: '服务2',
                  time: 25,
                  price: 200,
                  Present: 150,
                  count: 0,
              },
              {
                  id: 3,
                  name: '服务3',
                  time: 40,
                  price: 400,
                  Present: 350,
                  count: 0
              },
              {
                  id: 4,
                  name: '服务4',
                  time: 0,
                  price: 450,
                  Present: 400,
                  count: 0
              },

          ],
      },
      {
          name: '优惠卷b',
          date: 0,
          serList: [{
                  id: 5,
                  name: '服务1',
                  time: 30,
                  price: 300,
                  Present: 250,
                  count: 0
              },
              {
                  id: 6,
                  name: '服务2',
                  time: 25,
                  price: 200,
                  Present: 150,
                  count: 0
              },
              {
                  id: 7,
                  name: '服务9',
                  time: 55,
                  price: 580,
                  Present: 550,
                  count: 0
              },
              {
                id: 8,
                name: '服务10',
                time: 0,
                price: 580,
                Present: 550,
                count: 0
            },
          ],
      },
    ],
    selecteditem:[],
  },
  onLoad(options) {
    console.log(options)
    this.getwidth(0)
  },
  onShow() {},
  bindcard({currentTarget}){
    this.setData({cardindex: currentTarget.dataset.index});
  },
  cardminus({currentTarget}){
    let index=currentTarget.dataset.index
    let count=--currentTarget.dataset.item.count
    if(count<0)return
    this.setData({
      ["cardList["+this.data.cardindex+"].serList["+index+"].count"]:count
    });
  },
  cardplus({currentTarget}){
    let index=currentTarget.dataset.index
    let count=++currentTarget.dataset.item.count
    this.setData({
      ["cardList["+this.data.cardindex+"].serList["+index+"].count"]: count
    });
  },
  bindserver({currentTarget}){
    this.setData({sercerindex: currentTarget.dataset.index});
  },
  serverminus({currentTarget}){
    let index=currentTarget.dataset.index
    let count=--currentTarget.dataset.item.count
    if(count<0)return
    this.setData({
      ["serverList["+this.data.sercerindex+"].serList["+index+"].count"]:count
    });
  },
  serverplus({currentTarget}){
    let index=currentTarget.dataset.index
    let count=++currentTarget.dataset.item.count
    this.setData({
      ["serverList["+this.data.sercerindex+"].serList["+index+"].count"]: count
    });
  },
  bindcoupon({currentTarget}){
    this.setData({couponindex: currentTarget.dataset.index});
  },
  couponminus({currentTarget}){
    let index=currentTarget.dataset.index
    let count=--currentTarget.dataset.item.count
    if(count<0)return
    this.setData({
      ["couponList["+this.data.couponindex+"].serList["+index+"].count"]:count
    });
  },
  couponplus({currentTarget}){
    let index=currentTarget.dataset.index
    let count=++currentTarget.dataset.item.count
    this.setData({
      ["couponList["+this.data.couponindex+"].serList["+index+"].count"]: count
    });
  },
  bindKeyInput(e){
    this.setData({value:e.detail.value});
  },
  cancel(e){
    this.setData({value: ''});
  },
  switchTab({currentTarget}){
    this.setData({tabIndex: currentTarget.dataset.index});
    this.getwidth(currentTarget.dataset.index)
  },
  getwidth(index){
    let query=wx.createSelectorQuery();
    let classname='.switch'+index
    query.select(classname).boundingClientRect( rect=>{
        this.setData({
          width: rect.width+'px'
        })
    }).exec();
  },
  submit(){
    let pages=getCurrentPages()
    let prevPage=pages[pages.length-2];
    prevPage.setData({
      selecteditem:this.data.selecteditem,
    })
    wx.navigateBack({
      delta: 1
    }) 
  },
});
