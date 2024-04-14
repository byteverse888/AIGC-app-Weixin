import request from './../api/request';
const state = {
    systemConfigData: {}
};

const mutations = {
    GETSYSTEMCONFIG(state, systemConfigData) {
        state.systemConfigData = systemConfigData;
    }
};

const actions = {
    async getSystemConfig({commit}) {
        let result = await request('/config', {
            method: "GET"
        });
        if(result.params) {
            commit('GETSYSTEMCONFIG', result.params);
        }
    }
}

const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}