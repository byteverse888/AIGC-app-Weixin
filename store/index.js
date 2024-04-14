import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);
import home from './home';
import user from './user';
import aiCreate from './aiCreate';

export default new Vuex.Store({
    modules: {
        home,
        user,
        aiCreate
    }
});