import {createStore} from 'vuex'
import coachesModule from './modules/coaches/index'
import requestModule from './modules/requests/index'

const store= createStore({
    modules:{
        //this is namespaced
        coaches: coachesModule,
        requests:requestModule
    },
    state(){
        return{
            userId:'c1'
        }
    },
    getters:{
        userId(state){
            return state.userId;
        }
    }
})




export default store;