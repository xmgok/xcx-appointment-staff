Component({
    properties: {
        // 父组件传值
        datas: {
            type: Array,
            value: [],
        },
        selectData:{
            type:Array,
            value:[],
        }
    },
    data: {
        serIndex: 0,
        cardIndex: 0,
        number: 2,
        //已选
        type:'comboList'
    },
    ready() {},
    methods: {
        addBtn(e) {
            let index = e.currentTarget.dataset.index;
            let item = e.currentTarget.dataset.item;
            let serIndex = this.data.serIndex;
            item.count += 1;
            
            if (this.data.selectData.length == 0) {
                item.serIndex = serIndex;
                this.data.selectData.push(item);
            } else {
                let idx = '';
                let val = this.data.selectData.some((el, index) => {
                    idx = index;
                    return el.id == item.id;
                });
                if (val) {
                    this.data.selectData[idx] = item;
                } else {
                    item.serIndex = serIndex;
                    item.type = 'comboList';
                    this.data.selectData.push(item)
                }
            }
            this.setData({
                selectData: this.data.selectData,
                [`datas[${serIndex}].cardList[${index}]`]: item
            })
            let obj = {
                list: this.data.datas,
                select: this.data.selectData,
            }
            this.triggerEvent('event', obj);
        },
        subtractBtn(e) {
            let index = e.currentTarget.dataset.index;
            let item = e.currentTarget.dataset.item;
            let serIndex = this.data.serIndex;
            item.count -= 1;
            if (item.count <= 0) {
                item.count = 0;
                let idx = '';
                let val = this.data.selectData.some((el, index) => {
                    idx = index;
                    return el.id == item.id;
                });
                if (val) {
                    this.data.selectData.splice(idx, 1);
                }
            } else {
                let idx = '';
                let val = this.data.selectData.some((el, index) => {
                    idx = index;
                    return el.count == 0;
                });
                if (!val) {
                    this.data.selectData[idx] = item;
                }
            };
            this.setData({
                [`datas[${serIndex}].cardList[${index}]`]: item,
                selectData: this.data.selectData
            });
            let obj = {
                list: this.data.datas,
                select: this.data.selectData,
            }
            this.triggerEvent('event', obj)
        },
        sercercard({
            currentTarget
        }) {
            let index = currentTarget.dataset.index
            this.setData({
                serIndex: currentTarget.dataset.index
            });

        },
        Productcard({
            currentTarget
        }) {
            this.setData({
                card_index: currentTarget.dataset.index
            });
        },
    },
});