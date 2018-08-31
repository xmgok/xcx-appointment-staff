const config = {
  domainPath: 'https://yixin-mfp.yinghootech.cn/',
  // domainPath: 'http://39.104.74.142:8089/',
};

App({
  data: {},
  onLaunch() {
  },
  ajax(options) {
    options.url = `${config.domainPath}${options.url}`;
    options.method = options.type || 'POST';
    options.data = options.data || {};
    options.header = {
      'content-type': 'application/json',
      // 'content-type': 'application/x-www-form-urlencoded',
    };
    if (options.success) {
      const success = options.success;
      options.success = ({data}) => {
        if(data.code == 500 || data.code == 400){
          wx.showToast({ title: `${data.message}---${data.messageToUser}`, icon: 'none', duration: 3000 })
        }
        success(data);
      };
    }
    wx.request(options);
  },
});
