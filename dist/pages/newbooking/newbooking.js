const app = getApp();

Page({
    data: {
        timeShow: true,
        //选择的技师
        employee:[],
        //选择的服务
        cards: [{
            Present: 150,
            count: 1,
            id: 2,
            name: "套卡2",
            price: 200,
            serIndex: 0,
            time: 25,
            type: "comboList"
        }],
    },
    onLoad() {},
    onShow() {
        // let pages = getCurrentPages();
        // let currPage = pages[pages.length - 1];
        // console.log('>><<', currPage.data.employee)
        // if (currPage.data.electCity) {
        //     this.setData({
        //         'cards': currPage.data.cards
        //     })
        // }
    },
    cardsBtn() {
        let cards = JSON.stringify(this.data.cards)
        wx.navigateTo({
            url: '/pages/servecard/servecard?cards=' + cards,
        })
    },
    selectTime() {
        this.setData({
            timeShow: true
        })
    },
});