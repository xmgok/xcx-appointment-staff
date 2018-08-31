const app = getApp()
import {
    complement
} from '../../utils/util';
Component({
    properties: {
        show: {
            type: Boolean,
            value: false,
        }
    },
    data: {
        year: 0,
        month: 0,
        date: ['一', '二', '三', '四', '五', '六', '日'],
        dateArr: [],
        isToday: 0,
        isTodayWeek: false,
        todayIndex: 0,
        listData: {
            20180806: 1,
            20180815: 2,
            20180817: 3,
            20180818: 2,
            20180819: 3,
            20180820: 2,
            20180821: 1,
        },
    },
    ready() {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        this.dateInit();
        this.setData({
            year: year,
            month: month,
            isToday: `${year}${complement(month)}${complement(now.getDate())}`
        })
    },
    methods: {
        //关闭
        close() {
            this.setData({
                show: false
            })
        },

        dateInit: function (setYear, setMonth) {
            //全部时间的月份都是按0~11基准，显示月份才+1
            let dateArr = []; //需要遍历的日历数组数据
            let arrLen = 0; //dateArr的数组长度
            let now = setYear ? new Date(setYear, setMonth) : new Date();
            let year = setYear || now.getFullYear();
            let nextYear = 0;
            let month = setMonth || now.getMonth(); //没有+1方便后面计算当月总天数
            let nextMonth = (month + 1) > 11 ? 1 : (month + 1);

            let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay() - 1; //目标月1号对应的星期
            let dayNums = new Date(year, nextMonth, 0).getDate(); //获取目标月有多少天
            let obj = {};
            let num = 0;

            if (month + 1 > 11) {
                nextYear = year + 1;
                dayNums = new Date(nextYear, nextMonth, 0).getDate();
            }
            // complement
            arrLen = startWeek + dayNums;
            for (let i = 0; i < arrLen; i++) {
                if (i >= startWeek) {
                    num = i - startWeek + 1;
                    const isToday = `${year}${complement(month+1)}${complement(num)}`;
                    obj = {
                        isToday,
                        dateNum: num,
                        weight: 5
                    }
                    if (this.data.listData[isToday]) {
                        obj.status = this.data.listData[isToday];
                    }
                }
                dateArr[i] = obj;
            }
            this.setData({
                dateArr: dateArr
            });

            let nowDate = new Date();
            let nowYear = nowDate.getFullYear();
            let nowMonth = nowDate.getMonth() + 1;
            let nowWeek = nowDate.getDay();
            let getYear = setYear || nowYear;
            let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;

            if (nowYear == getYear && nowMonth == getMonth) {
                this.setData({
                    isTodayWeek: true,
                    todayIndex: nowWeek
                })
            } else {
                this.setData({
                    isTodayWeek: false,
                    todayIndex: -1
                })
            }
        },
        lastMonth: function () {
            //全部时间的月份都是按0~11基准，显示月份才+1
            let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
            let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
            this.setData({
                year: year,
                month: (month + 1)
            })
            this.dateInit(year, month);
        },
        nextMonth: function () {
            //全部时间的月份都是按0~11基准，显示月份才+1
            let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
            let month = this.data.month > 11 ? 0 : this.data.month;
            this.setData({
                year: year,
                month: (month + 1)
            })
            this.dateInit(year, month);
        }


    },
});