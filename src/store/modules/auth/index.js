import mutations from './mutations'
import actions from './actions'
import getters from './getters'
export default{
    actions,
    getters,
    mutations,
    state(){
        return{
            userId:null,
            token:null,
           
            didAutoLogout:false
        }
    },
}