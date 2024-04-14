const baseURL = 'http://service-j81m89sf-1302936021.bj.apigw.tencentcs.com:80/parse'
export default (urlParam, params) => {
    console.log("urlParam:", urlParam);
    console.log("params:", params);
    if(params.pageFrom != 'aiCreatePage' && params.pageFrom != 'taskListPage') {
        uni.showLoading({
        title: '加载中'
    });
    }

    return new Promise((resolve, reject) => {
        wx.request({
            url: baseURL + urlParam,
            ...params,
            header: {
                    'X-Parse-Application-Id': 'BTGAPPId',
                    'X-Parse-REST-API-Key': 'BTGAPIKEY',
                    'content-type': 'application/json'
                },
            success(res) {
                resolve(res.data);
            },
            fail(err) {
                reject(err);
            },
            complete() {
                uni.hideLoading();
            },
        });
    });
};