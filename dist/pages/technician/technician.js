const app = getApp();

Page({
  data: {
    staffs: [
      {nane: '美容师', index: 0,},
      {nane: '客户经理', index: 1, },
      {nane: '仪器老师', index: 2, },
    ],
    tabIndex:0,
    employees:[
      {emp_code:'cd123',emp_name:'菲菲',duty_code:'',state:0,checked:false},
      {emp_code:'cd124',emp_name:'飞飞',duty_code:'',state:0,checked:false},
      {emp_code:'cd125',emp_name:'大大',duty_code:'',state:0,checked:false},
      {emp_code:'cd126',emp_name:'小小',duty_code:'',state:0,checked:false},
      {emp_code:'cd127',emp_name:'多多',duty_code:'',state:0,checked:false},
      {emp_code:'cd128',emp_name:'少少',duty_code:'',state:0,checked:false},
    ],
    employee:[],
  },
  onLoad(options){},
  onShow() {
    this.getwidth(0)
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
          width: rect.width + 'px'
        })
    }).exec();
  },
  checkBox({currentTarget}){
      let index=currentTarget.dataset.index
      let item=currentTarget.dataset.item
      this.setData({
        ['employees['+index+'].checked']:!item.checked
      });
      let employee=this.data.employee
      if(item.checked){
        employee.map((e,i)=>{
          if(e.emp_code==item.emp_code){
            employee.splice(i,1)
          }
        })
      }else{
        item.checked=!item.checked
        employee.push(item)
      }
      this.setData({employee});
  },
  submit(){
    let pages=getCurrentPages()
    let prevPage=pages[pages.length-2];
    prevPage.setData({
      employee:this.data.employee,
    })
    wx.navigateBack({
      delta: 1
    }) 
  },
});
