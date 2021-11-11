import {createStore} from 'vuex'
import coachesModule from './modules/coaches/index'
import requestModule from './modules/requests/index'
import authModule from './modules/auth/index'

const store= createStore({
    modules:{
        //this is namespaced
        coaches: coachesModule,
        requests:requestModule,
        auth:authModule
    },
   
    
})




export default store;