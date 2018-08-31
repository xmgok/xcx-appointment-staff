const app = getApp();

Page({
    data: {
        selecteditem:[],
        isShow:false,
        bedData:[
          {num: 801, status: 2},
          {num: 802, status: 2},
          {num: 803, status: 1},
          {num: 804, status: 1},
          {num: 805, status: 1},
          {num: 806, status: 2},
          {num: 807, status: 2},
          {num: 808, status: 2},
          {num: 809, status: 1},
          {num: 810, status: 1},
          {num: 811, status: 1},
          {num: 812, status: 1},
        ],
    },
    onLoad(options){
        if(options){
            for(let key in options){
                this.setData({[key]:options[key]});
            }
            if(this.data.num){
              this.data.bedData.map((e,i)=>{
                  if(e.num==this.data.num){
                      this.setData({
                        ['bedData['+i+'].status']:3, 
                      });
                  }
              })
            }
        }
        console.log(this.data)
    },
    onShow(){},
    choose(){
        this.setData({isShow: true});
    },
    onCancel() {
      this.setData({isShow: false});
    },
    onConfirm(e){
      this.setData({
          'num':e.detail.info,
          isShow: false
      });
    },
    submit(){
        wx.navigateTo({
          url:'/pages/order/order',
        })
    },
});
