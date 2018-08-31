const app = getApp();

Page({
    data: {
        tbData1: {
            num1: 100,  // 最低
            num2: 5005,  // 最高
            num3: 4500,  // 我的
            num4: 2000,  // 平均
            zhibiao: 3000,   // 指标
        },
        tbData1Bfb: {
            bfb1: 100,
            bfb2: 100,
            bfb3: 0,
            bfb4: 0,
        },
        welcoming: '',
        showCanvas: true,
    },
    onLoad() {
        wx.setNavigationBarTitle({title: '中华广场店'});
        const tbData1Bfb = {
            bfb1: 100 - this.data.tbData1.zhibiao / this.data.tbData1.num2 / 100 * 10000,
            bfb2: 100 - this.data.tbData1.num3 / this.data.tbData1.num2 / 100 * 10000,
            bfb3: this.data.tbData1.num4 / this.data.tbData1.num2 / 100 * 10000,
            bfb4: this.data.tbData1.num3 / this.data.tbData1.num2 / 100 * 10000,
        };
        this.setData({tbData1Bfb});
        this.canvas(this.data.tbData1);
    },
    onShow() {
        let hour = new Date().getHours();
        let welcoming = '';
        if (hour < 4) {
            welcoming = '晚上好！';
        }
        else if (hour < 10) {
            welcoming = '早上好！';
        }
        else if (hour < 13) {
            welcoming = '上午好！';
        }
        else if (hour < 18) {
            welcoming = '下午好！';
        }
        else {
            welcoming = '晚上好！';
        }
        this.setData({welcoming});
    },
    canvas(data) {
        const num1 = data.num1;
        const num2 = data.num2;
        const num3 = data.num3;

        const ctx = wx.createCanvasContext('myCanvas');
        let rpx;
        //获取屏幕宽度，获取自适应单位
        wx.getSystemInfo({
            success: (res) => {
                rpx = res.windowWidth / 375;
                const width = 335 * rpx;
                const height = 130 * rpx;

                ctx.moveTo(5, height);
                ctx.lineTo(width, 5);
                ctx.lineTo(width, height);

                // const grd = ctx.createLinearGradient(0, 0, width, height);
                // grd.addColorStop(0, "rgba(255, 184, 123, 0.2)");
                // grd.addColorStop(1, "rgba(255, 102, 134, 0.2)");
                // const grd2 = ctx.createLinearGradient(0, 0, 375, 130);
                // grd2.addColorStop(0, "#FFB87B");
                // grd2.addColorStop(1, "#FF547A");

                ctx.setFillStyle('rgba(255, 102, 134, 0.2)');
                ctx.setStrokeStyle("rgba(255, 184, 123, 0)");
                ctx.setLineWidth(3);
                ctx.fill();
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(width * num3 / num2 + 4, (height - height * num3 / num2 + 4), 5, 0, 2 * Math.PI);
                ctx.closePath();//让圆弧和圆心连接起来形成一个闭合路径
                ctx.setStrokeStyle('#FF6686');
                ctx.stroke();//绘图
                // ctx.fillStyle = "#ffffff";
                ctx.setFillStyle('white');
                ctx.fill();

                ctx.draw()
            },
        });


    },
    onMoreListStatus(e){
        this.setData({showCanvas: e.detail});
    }
});
