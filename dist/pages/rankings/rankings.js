const app = getApp();

let data = [];
for (var i = 0; i < 50; i++) {
    data.push({
        name: `1邱海莲${i}`,
        text1: `1--${i}`,
        text2: `2--${i}`,
        text3: `3--${i}`,
        text4: `4--${i}`,
        text5: `5--${i}`,
        text6: `6--${i}`,
        text7: `7--${i}`,
        text8: `8--${i}`,
        text9: `9--${i}`,
        text10: `10--${i}`
    })
}

Page({
    data: {
        tab: ['个人业绩', '客户经营', '项目人次比'],
        tabIndex: 0,
        scrollLeft: 0,
        listData: data,
        tabItem: [
            [
                {text: '收款业绩', params: 'text1'},
                {text: '消费业绩', params: 'text2'},
                {text: '手工费', params: 'text3'},
            ],
            [
                {text: '客户量', params: 'text1'},
                {text: '收款', params: 'text2'},
                {text: '消费', params: 'text3'},
                {text: '客单', params: 'text4'},
                {text: '新客数', params: 'text5'},
                {text: '入会量', params: 'text6'},
                {text: '消费≥4次', params: 'text7'},
                {text: '消费3次', params: 'text8'},
                {text: '消费2次', params: 'text9'},
                {text: '消费1次', params: 'text10'},
            ],
            ['客户量', 'A服务', 'B服务', 'C服务', 'D服务', 'E服务',],
        ],
        dateIndex: 0,
        month: '',
        maxMonth: '',
        day: '',
        quarter: [[], []],
        quarterValue: [],
        showCalendar: false,
        week: [],
    },
    onLoad() {

        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        let quarter = [];
        quarter[0] = [];
        quarter[1] = ['Q1', 'Q2', 'Q3', 'Q4'];
        for (let i = 0; i < 30; i++) {
            quarter[0].push(year - i);
        }
        quarter[0] = quarter[0].reverse();
        let quarterx = 0;
        if (month / 3 > 3) {
            quarterx = 3;
        } else if (month / 3 > 2) {
            quarterx = 2;
        } else if (month / 3 > 1) {
            quarterx = 1;
        } else {
            quarterx = 0;
        }

        let quarterValue = [quarter[0].length - 1, quarterx];

        this.setData({
            month: `${year}年${month}月`,
            maxMonth: `${year}-${month}`,
            day: `${year}-${month}-${day}`,
            quarter,
            quarterValue,
        });
    },
    onScroll({detail}) {
        this.setData({scrollLeft: detail.scrollLeft});
    },
    switchTab(e) {
        this.setData({tabIndex: e.currentTarget.dataset.index});
    },
    bindMonthChange({detail, currentTarget}) {
        const value = detail.value.split('-');
        const index = currentTarget.dataset.index;
        this.setData({dateIndex: index, month: `${value[0]}年${value[1]}月`});
    },
    bindDayChange({detail, currentTarget}) {
        const index = currentTarget.dataset.index;
        this.setData({dateIndex: index, day: detail.value});
    },
    bindQuarterChange({detail, currentTarget}) {
        const index = currentTarget.dataset.index;
        this.setData({dateIndex: index, quarterValue: detail.value});
    },
    showChooseWeek() {
        this.setData({ showCalendar: true});
    },
    calendarCancel() {
        this.setData({showCalendar: false});
    },
    calendarConfirm(e) {
        const week = e.detail.data;
        this.setData({showCalendar: false});
        if (week.length > 0) {
            this.setData({dateIndex: 1, week});
        }
    },
});
