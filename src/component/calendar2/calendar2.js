import {complement} from '../../utils/util';

function group(array, subGroupLength) {
    var index = 0;
    var newArray = [];

    while (index < array.length) {
        newArray.push(array.slice(index, index += subGroupLength));
    }

    return newArray;
}

Component({
    properties: {
        show: {
            type: Boolean,
            value: false,
        },
        week: {
            type: Array,
            value: [],
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
        listData: [],
    },
    attached() {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        this.dateInit();
        this.setData({
            year: year,
            month: month,
            isToday: `${year}${complement(month)}${complement(now.getDate())}`,
            listData: this.data.week,
        })
    },
    methods: {
        dateInit(setYear, setMonth) {
            let dateArr = [];
            let arrLen = 0;
            let now = setYear ? new Date(setYear, setMonth) : new Date();
            let year = setYear || now.getFullYear();
            let nextYear = 0;
            let month = setMonth || now.getMonth(); //没有+1方便后面计算当月总天数
            let nextMonth = (month + 1) > 11 ? 1 : (month + 1);

            let startWeek = new Date(new Date().setDate(1)).getDay() - 1; //目标月1号对应的星期

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
                    const isToday = `${year}${complement(month + 1)}${complement(num)}`;
                    obj = {isToday, dateNum: num, weight: 5};
                    if(this.data.listData.length > 0){
                        const seIndex = this.data.listData.indexOf(isToday);
                        if (seIndex > -1) {
                            obj.status = 1;
                        }
                        if (seIndex == 0) {
                            obj.status = 2;
                        } else if (seIndex == this.data.listData.length - 1) {
                            obj.status = 3;
                        }
                    }
                }
                dateArr[i] = obj;
            }
            this.setData({dateArr: dateArr});

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
        lastMonth() {
            //全部时间的月份都是按0~11基准，显示月份才+1
            let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
            let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
            this.setData({
                year: year,
                month: (month + 1)
            })
            this.dateInit(year, month);
        },
        nextMonth() {
            //全部时间的月份都是按0~11基准，显示月份才+1
            let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
            let month = this.data.month > 11 ? 0 : this.data.month;
            this.setData({
                year: year,
                month: (month + 1)
            })
            this.dateInit(year, month);
        },
        chooseWeek(e) {
            const day = e.currentTarget.dataset.date;
            let dateArr = group(this.data.dateArr.map((item) => item.isToday), 7);
            let listData = [];
            if (this.data.listData.indexOf(day) > -1) return;
            dateArr.forEach((item, index) => {
                if (item.indexOf(day) > -1) {
                    listData = dateArr[index];
                }
            });
            listData = listData.filter((item) => {
                if (item > 0) {
                    return item;
                }
            });

            let dateArr2 = this.data.dateArr;
            dateArr2.forEach((item) => {
                delete item.status;
                const seIndex = listData.indexOf(item.isToday);
                if (seIndex > -1) {
                    item.status = 1;
                }
                if (seIndex == 0) {
                    item.status = 2;
                } else if (seIndex == listData.length - 1) {
                    item.status = 3;
                }
            });

            this.setData({listData});
            this.setData({dateArr: dateArr2});
        },
        cancel() {
            this.triggerEvent('cancel');
        },
        confirm() {
            this.triggerEvent('confirm', {data: this.data.listData});
        }
    },
});