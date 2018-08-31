const app = getApp();

Page({
    data: {
        tab: [
            {text: '待服务', num: 2, view: 'Tab1'},
            {text: '服务中', num: 1, view: 'Tab2'},
            {text: '已服务', num: 0, view: 'Tab3'},
        ],
        tabIndex: 0,
        showChooseBed: false,
        bedData: [
            {num: 801, status: 2},
            {num: 802, status: 2},
            {num: 803, status: 1},
            {num: 804, status: 1},
            {num: 805, status: 1},
            {num: 806, status: 2},
            {num: 807, status: 2},
            {num: 808, status: 2},
            {num: 809, status: 1},
            {num: 810, status: 1},
            {num: 811, status: 1},
            {num: 812, status: 1},
        ],
    },
    onLoad() {
    },
    switchTab({currentTarget}) {
        this.setData({tabIndex: currentTarget.dataset.index});
    },
    bindShowChooseBed() {
        this.setData({showChooseBed: true});
    },
    onCancel() {
        this.setData({showChooseBed: false});
    },
    onConfirm(e) {
        this.setData({showChooseBed: false});
        wx.navigateTo({url: `/pages/neworder/neworder?id=3&num=${e.detail.info}`});
    },
});