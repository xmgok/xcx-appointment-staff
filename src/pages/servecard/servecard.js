const app = getApp();

Page({
    data: {
        value: '',
        tabArr: [{
                name: '已购套卡',
                index: 0,
            },
            {
                name: '服务',
                index: 1,
            }
        ],
        //套卡list
        comboList: [{
                name: '护肤套卡',
                cardList: [{
                        id: 1,
                        name: '套卡1',
                        time: 30,
                        price: 300,
                        Present: 250,
                        count: 0
                    },
                    {
                        name: '套卡2',
                        time: 25,
                        price: 200,
                        Present: 150,
                        count: 0,
                        id: 2,
                    },
                    {
                        id: 3,
                        name: '套卡3',
                        time: 40,
                        price: 400,
                        Present: 350,
                        count: 0
                    },
                    {
                        id: 4,
                        name: '套卡4',
                        time: 50,
                        price: 450,
                        Present: 400,
                        count: 0
                    },

                ],
            },
            {
                name: '美白套卡',
                cardList: [{
                        id: 5,
                        name: '套卡1',
                        time: 30,
                        price: 300,
                        Present: 250,
                        count: 0
                    },
                    {
                        id: 6,
                        name: '套卡2',
                        time: 25,
                        price: 200,
                        Present: 150,
                        count: 0
                    },

                    {
                        id: 7,
                        name: '套卡9',
                        time: 55,
                        price: 580,
                        Present: 550,
                        count: 0
                    },
                ],
            },
        ],
        //服务list
        serList: [{
                name: '护肤',
                cardList: [{
                        id: 1,
                        name: '服务1',
                        time: 30,
                        price: 300,
                        Present: 250,
                        count: 0
                    },
                    {
                        name: '服务2',
                        time: 25,
                        price: 200,
                        Present: 150,
                        count: 0,
                        id: 2,
                    },
                    {
                        id: 3,
                        name: '服务3',
                        time: 40,
                        price: 400,
                        Present: 350,
                        count: 0
                    },
                    {
                        id: 4,
                        name: '服务4',
                        time: 50,
                        price: 450,
                        Present: 400,
                        count: 0
                    },

                ],
            },
            {
                name: '美白',
                cardList: [{
                        id: 5,
                        name: '服务1',
                        time: 30,
                        price: 300,
                        Present: 250,
                        count: 0
                    },
                    {
                        id: 6,
                        name: '服务2',
                        time: 25,
                        price: 200,
                        Present: 150,
                        count: 0
                    },

                    {
                        id: 7,
                        name: '服务9',
                        time: 55,
                        price: 580,
                        Present: 550,
                        count: 0
                    },
                ],
            },

        ],
        tabIndex: 0,

        //f服务已选
        serSelect: [],

        //套卡已选
        comboSelect: [],

        //已选数据
        chosenData: {
            comboList: [],
            serList: [],
            select: [],
        },
    },
    onLoad(val) {
        let cards = JSON.parse(val.cards);
        this.setData({
            'chosenData.select': cards,
        });
        let comboSelect = [];
        let serSelect = [];
        cards.map(el => {
            if (el.type == 'comboList') {
                comboSelect.push(el);
                let len = this.data.comboList[el.serIndex].cardList.length;
                for (let i = 0; i < len; i++) {
                    if (el.id == this.data.comboList[el.serIndex].cardList[i].id) {
                        this.data.comboList[el.serIndex].cardList[i] = el;
                        break;
                    }
                }
                this.setData({
                    comboList: this.data.comboList,
                })
                console.log('>>>',this.data.comboList)
            } else {
                serSelect.push(el)
                let len = this.data.serList[el.serIndex].cardList.length;
                for (let i = 0; i < len; i++) {
                    if (el.id == this.data.serList[el.serIndex].cardList[i].id) {
                        this.data.serList[el.serIndex].cardList[i] = el;
                        break;
                    }
                }
                this.setData({
                    serList: this.data.serList[el.serIndex],
                })
            }
        })
    },
    onShow(val) {

    },
    bindKeyInput(e) {
        this.setData({
            value: e.detail.value
        });
    },
    //选好了
    submit() {
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        prevPage.setData({
            cards: this.data.chosenData.select,
        })
        wx.navigateBack({
            delta: 1
        })

    },
    serEvent(e) {
        this.setData({
            serList: e.detail.list,
            serSelect: e.detail.select,
            'chosenData.serList': e.detail.list,
            'chosenData.select': [...e.detail.select, ...this.data.comboSelect],
        })
    },

    chosenEvent(e) {
        this.setData({
            comboList: e.detail.comboList,
            serSelect: e.detail.select,
            serList: e.detail.serList,
            'chosenData.comboList': e.detail.comboList,
            'chosenData.serList': e.detail.serList,
            'chosenData.select': e.detail.select,
        })
    },
    comboEvent(e) {
        this.setData({
            comboList: e.detail.list,
            comboSelect: e.detail.select,
            'chosenData.comboList': e.detail.list,
            'chosenData.select': [...e.detail.select, ...this.data.serSelect],
        })
        // 
    },
    cancel(e) {
        this.setData({
            value: ''
        });
    },
    switchTab({
        currentTarget
    }) {
        this.setData({
            tabIndex: currentTarget.dataset.index
        });
    },
    inputClick() {
        wx.navigateTo({
            url: '/pages/searchServe/searchServe'
        })
    }

});