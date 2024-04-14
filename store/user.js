import {reqUserRegister, reqUserLogin, reqGetAttentionList} from '@/api';
const state = {
    attentionWritersList: [],
	token: '',
	userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}')
}
const mutations = {
    ATTENTIONWRITERSLIST(state, attentionWritersList) {
        state.attentionWritersList = attentionWritersList;
    },
	updateUserInfo(state, userinfo) {
		state.userinfo = userinfo;
		this.commit('saveUserInfoToStorage');
	},
	saveUserInfoToStorage(state) {
		uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
	}
}

const actions = {
    async userRegister({commit}, data) {
        let result = await reqUserRegister(data);
        if(result.objectId) {
            return 'ok';
        } else {
            return Promise.reject(new Error("fail"));
        }
    },
    async userLogin({commit}, data) {
        let result = await reqUserLogin(data);
        console.log("result:",result);
         if(result.objectId) {
            return 'ok';
        } else {
            return Promise.reject(new Error("fail"));
        }
    },
    async userAttentionWritersList({commit}){
        let userObjectId = 'No7jNH1wtY';
        let result = await reqGetAttentionList(userObjectId);
        console.log("userAttentionWritersList result:", result);
        if(result.objectId) {
            commit("ATTENTIONWRITERSLIST", result);
        } else {
            return Promise.reject(new Error("fail"));
        }
    }

}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}