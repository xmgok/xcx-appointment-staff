const app = getApp();

Page({
    data: {
        //显示模式切换选中状态
        displayMode: 'list',
        //周一到周日
        weekConst: ['周一', '周二', '周三', '周四', '周五', '周六', '周日', ],
        //最近30天 预约状态数据
        monthDatas: [{
                date_day: '22',
                date_status: 0,
            }, {
                date_day: '23',
                date_status: 0,
            }, {
                date_day: '24',
                date_status: 0,
            }, {
                date_day: '25',
                date_status: 1,
            },
            {
                date_day: '26',
                date_status: 1,
            }, {
                date_day: '27',
                date_status: 0,
            }, {
                date_day: '28',
                date_status: 1,
            }, {
                date_day: '29',
                date_status: 0,
            },
            {
                date_day: '30',
                date_status: 0,
            },
            {
                date_day: '01',
                date_status: 0,
            },
            {
                date_day: '02',
                date_status: 0,
            },
            {
                date_day: '03',
                date_status: 0,
            },
            {
                date_day: '04',
                date_status: 0,
            },
            {
                date_day: '05',
                date_status: 0,
            },
            {
                date_day: '06',
                date_status: 0,
            },
            {
                date_day: '07',
                date_status: 0,
            },

        ],
        //日期点选
        monthSelected: '',

        //预约card
        bookingData: [{
                cust_name: '张三',
                arrive_time: '12:00',
                duration: '60',
                Items: [{
                    serv_name: '服务'
                }],
                status: '0',
            },
            {
                cust_name: '张三',
                arrive_time: '12:00',
                duration: '60',
                Items: [{
                    serv_name: '服务'
                }],
                status: '1',
            },
            {
                cust_name: '张三',
                arrive_time: '12:00',
                duration: '60',
                Items: [{
                    serv_name: '服务'
                }],
                status: '2',
            },
        ],
    },
    onLoad() {

    },
    onShow() {

    },
    cardClick(val) {
        wx.navigateTo({
            url: '/pages/bookinginfo/bookinginfo'
        })
        console.log(val);
    },
    //日期点选事件
    monthDatasFun(e) {
        this.setData({
            monthSelected: e.currentTarget.dataset.index
        });
    },
    //显示模式状态切换事件
    displayModeFun(e) {
        let val = e.currentTarget.dataset.val
        this.setData({
            displayMode: val
        });
    },
    //回去最近一月是否可预约状态
    getRecentMonth() {
        // ApiBooking.getRecentMonth().then((data) => {
        //     console.log(data)
        // })
    },
});