const app = getApp();

Page({
    data:{
        id:'',
        states:'',
        tabtitle:['员工','分配金额', '分配比例',],
        total:'998.00',
        conntent:[
            {emp_name:'张雪盐',emp_code:'2321321',amount:200,percent:50},
            {emp_name:'吴雪盐',emp_code:'1231233',amount:400,percent:50},
            {emp_name:'陈雪盐',emp_code:'1233124',amount:300,percent:50},
        ],
        isshow:true,
    },
    onLoad(options) {
        this.setData({
            id: options.id,
            states: options.states
        });
    },
    onShow() { 
        
    },
    addition({currentTarget}){
        wx.navigateTo({
            url: "/pages/technician/technician"
        })
    },
    bindfocus(e){
        this.setData({
            isshow:false,
        });
    },
    amountbindblur(e){
        this.setData({
            isshow:true,
            ["conntent["+e.currentTarget.dataset.index+"].amount"]:e.detail.value,
        });
    },
    percentbindblur(e){
        this.setData({
            isshow:true,
            ["conntent["+e.currentTarget.dataset.index+"].percent"]:e.detail.value,
        });
    },
    clearbind({currentTarget}){
        this.setData({
            ["conntent["+currentTarget.dataset.index+"].amount"]:'',
            ["conntent["+currentTarget.dataset.index+"].percent"]:'',
        });
    },
    resultsbind(){
        if(this.data.total){
            let conntent=this.data.conntent
            let len=conntent.length
            let amount=parseInt(this.data.total*100/len)/100
            let percent=parseInt(amount*10000/this.data.total)/100
            conntent.map(e=>{e.amount=amount;e.percent=percent})
            if(this.data.total%amount){
                conntent[len-1].amount=parseInt(this.data.total*100-amount*100*(len-1))/100
                conntent[len-1].percent=parseInt(10000-percent*100*(len-1))/100
            }
            this.setData({conntent});
        }
    },
    submit(){
        wx.navigateBack({
            delta: 1
        }) 
    }
});