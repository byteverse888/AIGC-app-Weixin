import api from './request';

export function reqAICreate(data) {
    return api.request({
        url: '/classes/AIPost',
        method: 'post',
        data
    })
};

export function reqGetFinishedAIPicture() {
    return api.request({
        url: '/classes/AIPost',
        method: 'get'
    })
};

export function reqSystemConfig() {
    return api.request({
        url: '/config',
        method: 'get'
    })
}

export function postLoginWxMin(data) {
	return api.request({
		url: '/login/wxMin',
		method: 'POST',
		data
	})
}