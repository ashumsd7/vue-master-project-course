import {createStore} from 'vuex'
import coachesModule from './modules/coaches/index'

const store= createStore({
    modules:{
        //this is namespaced
        coaches: coachesModule
    },
    state(){
        return{
            userId:'c3'
        }
    },
    getters:{
        userId(state){
            return state.userId;
        }
    }
})




export default store;