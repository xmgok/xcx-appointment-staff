Component({
    properties: {
        navIndex: {
            type: Number,
            value: 1,
        },
    },
    data: {
        moreList: false,
    },
    methods: {
        changeMoreList() {
            this.setData({moreList: !this.data.moreList});
            this.triggerEvent('moreListStatus', !this.data.moreList);
        },
    },
});
