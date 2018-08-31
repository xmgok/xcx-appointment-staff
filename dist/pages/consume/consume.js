const app = getApp();

Page({
    data:{
        states:'',
        tabtitle:['员工','分配金额', '分配比例',],
        conntent:[
            {
                productname:'基础卡总金额',
                totalamount:998,
                employees:[
                    {
                        emp_name:'张雪盐',
                        emp_code:'2321321',
                        amount:200,
                        percent:50,
                    },
                    {
                        emp_name:'吴雪盐',
                        emp_code:'1231233',
                        amount:'',
                        percent:'',
                    },
                    {
                        emp_name:'陈雪盐',
                        emp_code:'1233124',
                        amount:300,
                        percent:50,
                    },
                ]
            },
            {
                productname:'仪器总金额',
                totalamount:889,
                employees:[
                    {
                        emp_name:'张雪盐',
                        emp_code:'2321321',
                        amount:200,
                        percent:50,
                    },
                    {
                        emp_name:'吴雪盐',
                        emp_code:'1231233',
                        amount:400,
                        percent:50,
                    },
                    {
                        emp_name:'陈雪盐',
                        emp_code:'1233124',
                        amount:300,
                        percent:50,
                    },
                ]
            },
        ],
        isshow:true,
    },
    resultsbind({currentTarget}){
        let index=currentTarget.dataset.index
        let employees=this.data.conntent[index].employees
        let totalamount=this.data.conntent[index].totalamount
        let len=employees.length
        if(totalamount){
            let amount=parseInt(totalamount*100/len)/100
            let percent=parseInt(amount*10000/totalamount)/100
            employees.map(e=>{e.amount=amount;e.percent=percent})
            if(totalamount%amount){
                employees[len-1].amount=parseInt(totalamount*100-amount*100*(len-1))/100
                employees[len-1].percent=parseInt(10000-percent*100*(len-1))/100
            }
            this.setData({
                ["conntent["+index+"].employees"]:employees
            });
        }
    },
    clearbind({currentTarget}){
        let index0=currentTarget.dataset.index[0]
        let index1=currentTarget.dataset.index[1]
        this.setData({
            ["conntent["+index0+"].employees["+index1+"].amount"]:'',
            ["conntent["+index0+"].employees["+index1+"].percent"]:'',
        });
    },
    onLoad(options) {
        this.setData({
            id: options.id,
            states: options.states
        });
    },
    onShow() { 
        
    },
    bindfocus(e){
        this.setData({
            isshow:false,
        });
    },
    amountbindblur(e){
        let index0=e.currentTarget.dataset.index[0]
        let index1=e.currentTarget.dataset.index[1]
        this.setData({
            isshow:true,
            ["conntent["+index0+"].employees["+index1+"].amount"]:e.detail.value,
        });
    },
    percentbindblur(e){
        let index0=e.currentTarget.dataset.index[0]
        let index1=e.currentTarget.dataset.index[1]
        this.setData({
            isshow:true,
            ["conntent["+index0+"].employees["+index1+"].percent"]:e.detail.value,
        });
    },
    submit(){
        wx.navigateBack({
            delta: 1
        }) 
    }
});