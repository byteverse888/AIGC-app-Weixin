import {reqGetBannerList, reqAllWorks} from '@/api';

const state = {
    bannerList: [],
    worksList: []
};

const actions = {
    async getBannerList({commit}) {
        let result = await reqGetBannerList();
        if(result.code == 200) {
            commit("GETBANNERLIST", result.data);
        }
    },

    async getAllWorks({commit}) {
        let result = await reqAllWorks();
        if(result.code == 200) {
            commit('ALLWORKS', result.data);
        }
    }
};

const mutations = {
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    ALLWORKS(state, worksList){
        state.worksList = worksList;
    }
};

const getters = {};

export default {
    state,
    actions,
    mutations,
    getters
}