export default{
    coaches(state){
        return state.coaches;
    },
    hasCoaches(state){
        return state.coaches && state.coaches.length>0
    },
    isCoach(_,getters,_2,rootGetters){
        const coaches= getters.coaches;
        const userId=  rootGetters.userId;
        console.log('root State', rootGetters);
        return coaches.some(coach=>coach.id===userId)
    },
    shouldUpdate(state){
        let lastFetch=  state.lastFetch;
        if(!lastFetch){
            return true;
        }
        let currentTimeStamp= new Date().getTime();
        return (currentTimeStamp- lastFetch)/1000 >60;
    }
}