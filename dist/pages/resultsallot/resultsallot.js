const app = getApp();

Page({
    data: {
        allottab:[
            {nane: '待分配', state: 0,},
            {nane: '已分配', state: 1, },
          ],
        tabindex:0,
        width:'',
        results:[
            {date:'2018-03-30',amount:'299.00',cust_name:'嘻嘻',cust_code:'23132123',emp_code:'12312312',emp_name:'双汇，李燕',project:'全是推拿，焗油',beds:'102',camount:'299.00',state:0},
            {date:'2018-05-30',amount:'499.00',cust_name:'哈哈',cust_code:'52423424',emp_code:'23423424',emp_name:'双汇',project:'全是推拿，焗油',beds:'103',camount:'299.00',state:1},
            {date:'2018-06-30',amount:'399.00',cust_name:'呵呵',cust_code:'53453455',emp_code:'12325232',emp_name:'李燕',project:'全是推拿，焗油',beds:'105',camount:'299.00',state:0},
            {date:'2018-07-30',amount:'599.00',cust_name:'嘻嘻',cust_code:'32423423',emp_code:'54353535',emp_name:'双汇，李燕',project:'全是推拿，焗油',beds:'107',camount:'299.00',state:1},
            {date:'2018-08-30',amount:'199.00',cust_name:'哒哒',cust_code:'31341312',emp_code:'54234234',emp_name:'李燕',project:'全是推拿，焗油',beds:'103',camount:'299.00',state:0},
            {date:'2018-09-30',amount:'699.00',cust_name:'嘻嘻',cust_code:'64564564',emp_code:'23234312',emp_name:'双汇，李燕',project:'全是推拿，焗油',beds:'106',camount:'299.00',state:1},
            {date:'2018-04-30',amount:'399.00',cust_name:'呼呼',cust_code:'45645646',emp_code:'23123313',emp_name:'双汇，李燕',project:'全是推拿，焗油',beds:'108',camount:'299.00',state:0},
        ],
    },
    onLoad() {

    },
    onShow() { 
        this.getwidth(0)
    },
    switchTab({currentTarget}){
        this.setData({tabindex: currentTarget.dataset.index});
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
    allocation({currentTarget}){
        wx.navigateTo({
            url: currentTarget.dataset.item.state==0&&'/pages/collection/collection?states='+this.data.tabindex+'&id='+currentTarget.dataset.item.id||currentTarget.dataset.item.state==1&&'/pages/consume/consume?states='+this.data.tabindex+'&id='+currentTarget.dataset.item.id
        })
    },
    result(e){
        console.log(e)
    },
});