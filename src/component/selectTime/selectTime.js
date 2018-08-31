Component({
    properties: {
        //预约日期
        date: {
            type: Object, // 
            value: '',
        },
        //营业时间
        businesshours: {
            type: Array, // 
            value: '',
        },
        //预约时长
        duration: {
            type: Number, // 
            value: '60',
        },
        //预约信息
        bookingInfo: {
            type: Object,
            value: {
                empStartTime: '08:00',
                empEndTime: '22:00',
                bill: [{
                    start: '20:00',
                    end: "20:30"
                }],
            },
        },
        //显示隐藏
        show: {
            type: Boolean,
            value: true,
        }
    },
    data: {
        //日期显示隐藏
        calendarShow: false,

        //七天的数据
        sevenDayData: [],

        //选择天
        selectWeek: '0',

        //到店时间 数据
        steps: [],

        //选择开始时间点
        selectStepsStart: 'n',

        //选择结束时间点
        selectStepsEnd: 'n',
    },
    ready() {
        this.getSevenDay();
        this.getSteps({
            date: '2018-08-30'
        })
    },
    methods: {

        //关闭
        cancleBtnClick() {
            this.setData({
                show: false,
            })
        },
        sureBtnClick() {
            this.setData({
                show: false,
            })
        },

        //选择时间点
        stepsItemCick(e) {
            let stepsStartIndex = e.currentTarget.dataset.index;
            let item = e.currentTarget.dataset.item;

            let len = "90" | this.data.defServiceTime;
            //
            let stepsEnd = Math.ceil(Number(len) / 30) + stepsStartIndex - 1;

            //截取服务时长 所跨步数 和 data.steps 数据
            let step = stepsEnd > this.data.steps.length ? this.data.steps.length : stepsEnd;
            let arr = this.data.steps.slice(stepsStartIndex, stepsEnd);

            if (item.overtime && !item.isHaveabout) {
                return;
            } else if (item.isHaveabout) {
                console.log('该时间点已有预约')
                return;
            } else if (arr.some((el, idx) => {
                    return el.overtime == true && idx != arr.length;
                })) {
                console.log('当前时间不可预约！')
                return;
            }
            this.setData({
                selectStepsStart: stepsStartIndex,
                selectStepsEnd: stepsEnd,
            })
            // this.data.steps.map(el => {
            //     el.isChecked = '';
            //     el.isActive = '';
            //     el.text = ''
            // })
            // let isActive = 'isActive',//时段中间
            //     isChecked = 'isChecked';//时段开始结尾
            // if (val.isChecked) {//判断是否选中
            //     val.isChecked = '';
            //     val.text = '';
            // } else {//选中
            //     this.data.steps[index].isChecked = "isChecked"
            //     this.data.steps[index].text = '开始';
            //     let text = '';
            //     for (let i = 0; i < this.selectDateData.length; i++) {
            //         if (this.selectDateData[i].isSelected) {
            //             text = this.selectDateData[i].date
            //         }
            //     }
            //     this.inputValue = text + " " + val.date
            //     this.selectFun(index)
            // };
        },
        //切换日
        weekItemCick(e) {
            this.setData({
                selectWeek: e.currentTarget.dataset.index
            });
            if (e.currentTarget.dataset.index == this.data.sevenDayData.length - 1) {
                this.setData({
                    calendarShow: true
                });

            } else {

            }

        },
        // //原始视图展示
        getSteps(val) {
            let arr = [];
            this.setData({
                steps: arr
            });
            let start = this.data.bookingInfo.startTime || "09:00"; //门店营业开始时间
            let end = this.data.bookingInfo.endTime || "22:00"; //门店营业结束时间
            let startTimeData = this.formatDate(start);
            let startMin = Number(startTimeData.min);
            let startHour = Number(startTimeData.hour);
            let startDate = startMin + startHour * 60; //门店营业开始时间 转换成分钟

            let endTimeData = this.formatDate(end);
            let endMin = Number(endTimeData.min);
            let endHour = Number(endTimeData.hour);
            let endDate = endMin + endHour * 60; //门店营业结束时间 转换成分钟

            //渲染视图的class
            let line_del = 'line_del', //超时
                bookable = 'bookable', //可预约
                haveabout = 'haveabout'; //已预约

            //渲染视图的class end
            for (let i = startDate; i <= endDate; i += 30) {
                let obj = {
                    class: 'bookable', //渲染视图的class
                    time: '', //step
                    isActive: '', //时间段中间的class
                    isChecked: '', //选择时段开始和结束的class
                    text: '',
                    isHaveabout: false,
                    overtime: false,
                };
                obj.time = this.formatTen(parseInt(i / 60)) + ":" + this.formatTen(i % 60); //step
                if (this.data.bookingInfo.empStartTime) {
                    //结束时间不可选择
                    if (obj.time === end) {
                        obj.class = line_del;
                        obj.overtime = true;
                    };

                    //如果选择的天===当天 判断小于当前时间的step
                    if (this.dateFormat('yy-MM-dd', new Date()) === val.date && this.dateFormat('hh:mm', new Date()) > obj.time) {
                        obj.class = line_del;
                        obj.overtime = true;
                    };

                    if (obj.time < this.data.bookingInfo.empStartTime || obj.time > this.data.bookingInfo.empEndTime) {
                        obj.class = line_del;
                        obj.overtime = true;
                    };

                    // 是否已预约
                    let bill = this.data.bookingInfo.bill;
                    //判断是否已预约 
                    if (bill.length > 0) {
                        bill.map(el => {
                            if (el.start <= obj.time && obj.time < el.end && !obj.overtime) {
                                obj.class = 'haveabout';
                                obj.isHaveabout = true;
                                obj.overtime = true;
                            }
                        })
                    };
                } else {
                    obj.class = 'line_del';
                    obj.overtime = true;
                };
                arr.push(obj);
            };
            this.setData({
                steps: arr
            });
        },
        //获取七天
        getSevenDay() {
            let arr = [];
            this.setData({
                sevenDayData: arr
            });
            let timestamp = this.data.date ? new Date(this.data.date).getTime() : new Date().getTime();
            let date = this.dateFormat('yy-MM-dd', timestamp);
            let day = 3600 * 1000 * 24;
            for (let i = 0; i < 7; i++) {
                let obj = {};
                obj.day = i == 0 ? '今天' : this.dateFormat('dd', new Date(timestamp + day * i));
                obj.mouthDate = this.dateFormat('MM.DD', timestamp + day * i);
                obj.date = this.dateFormat('yy-MM-dd', timestamp + day * i);
                if (date === obj.date) {
                    if (i > 0) {
                        this.setData({
                            selectWeek: i
                        });
                    };
                };
                arr.push(obj);
            };
            let obj = {
                day: '其他',
                mouthDate: '请选择'
            };
            arr.push(obj);
            this.setData({
                sevenDayData: arr
            });
        },
        //时间重置
        formatDate(val) {
            let time = val.split(':')
            let min = Number(time[1]);
            let hour = Number(time[0]);
            if (0 < min && min <= 30) {
                //营业时间分钟字段大于0小于等于30取30
                min = 30
            } else if (30 < min && min <= 59) {
                min = 0;
                hour = hour + 1;
                if (hour == 24) {
                    hour = 0
                }
            }
            return {
                hour: hour,
                min: min
            };
        },
        //补全0
        formatTen(num) {
            return num > 9 ? num + '' : '0' + num;
        },
        //日期格式化
        dateFormat(format, timestamp) {
            var date = null;
            if (!timestamp) {
                return;
            };
            if (!isNaN(timestamp)) {
                date = new Date(timestamp); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
            } else if (timestamp instanceof Date) {
                date = timestamp;
            } else {
                return;
            };
            let Y = date.getFullYear(),
                M = this.formatTen((date.getMonth() + 1)),
                D = this.formatTen(date.getDate()),
                h = this.formatTen(date.getHours()),
                m = this.formatTen(date.getMinutes()),
                s = this.formatTen(date.getSeconds()),
                S = date.getMilliseconds();

            if (format == 'yy-MM-dd hh:mm:ss') {
                return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
            } else if (format == 'yy-MM-dd') {
                return Y + '-' + M + '-' + D
            } else if (format == 'hh:mm:ss') {
                return h + ':' + m + ':' + s
            } else if (format == 'hh:mm') {
                return h + ':' + m
            } else if (format == 'yyMMddhhmmss') {
                return Y + M + D + h + m + s
            } else if (format == 'yyMMddhhmmssSS') {
                return Y + M + D + h + m + s + S
            } else if (format == 'MM.DD') {
                return M + '.' + D
            } else if (format == 'dd') {
                return '周' + '日一二三四五六'.charAt(timestamp.getDay())
            } else if (format == 'yy-MM-dd hh:mm') {
                return Y + '-' + M + '-' + D + ' ' + h + ':' + m
            };
            //   return Y + M + D + h + m + s;
        }

    },
});