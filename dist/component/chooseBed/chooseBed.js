Component({
    properties: {
        listData: {
            type: Array,
            value: [],
        },
        show: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        chooseIndex: -1,
    },
    methods: {
        bindCancel() {
            this.triggerEvent('cancel');
        },
        bindConfirm() {
            this.triggerEvent('confirm', {info: this.data.chooseIndex});
        },
        bindChooseBed(e) {
            const index = e.currentTarget.dataset.index;
            let listData = this.data.listData;
            if(listData[index].status == 1) return;

            listData = listData.map((item) => {
                if (item.status == 3) {
                    item.status = 2;
                }
                return item;
            });
            listData[index].status = 3;
            this.setData({listData, chooseIndex: index});
        }
    },
});
