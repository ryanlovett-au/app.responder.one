import {createStore} from 'vuex';

import config from './modules/config';
// import responder from './modules/responder';
 
const store = createStore({
    modules:{
        config,
        // responder,
    },
});
 
export default store;