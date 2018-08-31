const app = getApp();

const filterDefaultData = {
    switchChangeData: false,
    switch2ChangeData: false,
    birthday: [
        {text: '未来7天', status: 1},
        {text: '本月', status: 2},
    ],
    sliderValue: 50,
    sliderValue2: 50,
};

Page({
    data: {
        array: ['末次进店日期近到远', '末次进店日期远到近', '当月进店频次高到低', '当月进店频次低到高'],
        index: 0,
        type: 1,
        value: '',
        showFilter: false,
        // 客户数据：
        custData:[],
    },
    onLoad({type = 1}) {
        this.setData({type});
        if (type == 1) {
            wx.setNavigationBarTitle({title: '请选择在店客户'});
        } else if (type == 2) {
            wx.setNavigationBarTitle({title: '请选择客户'});
        } else {
            wx.setNavigationBarTitle({title: '客户管理'});
            this.setData({...filterDefaultData});
        }
    },
    bindPickerChange({detail}) {
        this.setData({index: detail.value});
    },
    showFilter(){
        this.setData({showFilter: true});
    },
    bindconfirm({detail}) {
        this.setData({value: detail.value});
    },
    chooseItem() {
        if (this.data.type > 2) {
            return;
        }
        wx.navigateBack({delta: 1});
    },
    bindCancel() {
        this.setData({showFilter: false});
    },
    bindConfirm() {
        this.setData({showFilter: false});
    },
    switchChange({detail}) {
        this.setData({switchChangeData: detail.value});
    },
    switch2Change({detail}) {
        this.setData({switch2ChangeData: detail.value});
    },
    onSliderChange({detail}) {
        this.setData({sliderValue: detail.value});
    },
    onSlider2Change({detail}) {
        this.setData({sliderValue2: detail.value});
    },
    switchBirthday(e) {
        let birthday = this.data.birthday;
        birthday = birthday.map((item) => {
            item.status = 2;
            return item;
        });
        birthday[e.currentTarget.dataset.index].status = 1;
        this.setData({birthday});
    },
    resetFilter(){
        this.setData({...filterDefaultData});
        this.setData({birthday: [
                {text: '未来7天', status: 1},
                {text: '本月', status: 2},
            ]});
    }
});
