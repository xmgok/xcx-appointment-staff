Component({
    properties: {
        // 父组件传值
        datas: {
            type: Array,
            value: [],
        }
    },
    data: {},
    ready() {},
    methods: {
        cardClick(e) {
            let obj = {
                item:e.currentTarget.dataset.item,
                index:e.currentTarget.dataset.index,
            }
            this.triggerEvent('bindtap', obj)
        },
    },
});