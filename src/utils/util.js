const Event = {
  on(name, fn) {
    const eventData = Event.data;
    if (eventData.hasOwnProperty(name)) {
      eventData[name].push(fn);
    } else {
      eventData[name] = [fn];
    }
    return this;
  },
  fire(name, data, thisArg) {
    const fnList = Event.data[name];
    const len = fnList.length;
    let fn;
    if (!fnList.length) {
      throw new Error(`Cannot find broadcast event ${name}`);
    }
    for (let i = 0; i < len; i++) {
      fn = fnList[i];
      fn.apply(thisArg, [data, name]);
    }
    return this;
  },
  data: {},
};

function complement(num){
  return num >= 10 ? num : `0${num}`;
}

function compare(property, sort){
  return function(a,b){
    const value1 = a[property];
    const value2 = b[property];
    return sort <= 0 ? (value2 - value1) : (value1 - value2);
  }
}

function showToast(msg,type){//type:1(成功) 0(失败)
  type=type?"success":"none";
  wx.showToast({
    title: msg,
    icon:type,
    image: '',
    duration:500,
    mask: false
  });
}
var url = 'https://wechat.consumer.ymwlw.com/';
var apiList = {
    apipath: {
        //图片上传
        uploadImg: url + "uploadImg",
    }
};

module.exports = {
  Event,
  compare,
  complement,
  apiList,
  showToast
};
