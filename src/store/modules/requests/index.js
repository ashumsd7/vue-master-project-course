import mutations from './mutations'
import actions from './actions'
import getters from './getters'
export default{
 namespaced:true,
 mutations:mutations,
 actions:actions,
 getters:getters,
 state(){
     return{
         requests:[]
     }
 }

}