Component({
    properties: {
        datas: {
            type: Object, // 
            value: {
                comboList: [],
                select: [],
                serList: [],
            },
        },

    },
    data: {
        fixedShow: false,
        lenData: [],
    },
    ready() {

    },
    methods: {
        //看已选择
        seeSelect() {
            this.setData({
                fixedShow: !this.data.fixedShow
            })
        },
        // 提交
        submit() {
            this.triggerEvent('submit')
        },
        //清空所有
        clearBtn() {
            this.data.datas.select.map(el => {
                let arr = this.data.datas.comboList[el.serIndex].cardList;
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].id == el.id) {
                        this.data.datas.comboList[el.serIndex].cardList[i].count = 0;
                        break;
                    }
                }
            })
            this.setData({
                'datas.comboList': this.data.datas.comboList,
                'datas.select': [],
            })
            let obj = {
                comboList: this.data.datas.comboList,
                serList: this.data.datas.serList,
                select: [],
            }
            this.triggerEvent('event', obj);
        },
        addBtn(e) {
            let index = e.currentTarget.dataset.index;
            let item = e.currentTarget.dataset.item;
            let serIndex = e.currentTarget.dataset.serindex;
            let type = e.currentTarget.dataset.type;
            item.count += 1;
            if (this.data.datas.select.length == 0) {
                this.data.datas.select.push(item);
            } else {
                let idx = '';
                let val = this.data.datas.select.some((el, index) => {
                    idx = index;
                    return el.id == item.id;
                });
                if (val) {
                    this.data.datas.select[idx] = item;
                } else {
                    this.data.datas.select.push(item)
                }
            }
            this.setData({
                "datas.select": this.data.datas.select,
                [`datas.${type}[${serIndex}].cardList[${index}]`]: item
            })
            let obj = {
                comboList: this.data.datas.comboList,
                select: this.data.datas.select,
                serList: this.data.datas.serList,
            }
            this.triggerEvent('event', obj);
        },
        subtractBtn(e) {
            let index = e.currentTarget.dataset.index;
            let item = e.currentTarget.dataset.item;
            let serIndex = e.currentTarget.dataset.serindex;;
            let type = e.currentTarget.dataset.type;
            item.count -= 1;
            if (item.count <= 0) {
                item.count = 0;
                let idx = '';
                let val = this.data.datas.select.some((el, index) => {
                    idx = index;
                    return el.id == item.id;
                });
                if (val) {
                    this.data.datas.select.splice(idx, 1);
                }
            } else {
                let idx = '';
                let val = this.data.datas.select.some((el, index) => {
                    idx = index;
                    return el.count == 0;
                });
                if (!val) {
                    this.data.datas.select[idx] = item;
                }
            };
            this.setData({
                [`datas.${type}[${serIndex}].cardList[${index}]`]: item,
                "datas.select": this.data.datas.select
            });
            let obj = {
                comboList: this.data.datas.comboList,
                select: this.data.datas.select,
                serList: this.data.datas.serList,
            }
            this.triggerEvent('event', obj)
        },
    },
});