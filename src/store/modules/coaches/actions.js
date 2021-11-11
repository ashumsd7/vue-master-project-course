export default{
   async registerCoach(context,data){
        const userId= context.rootGetters.userId
        const coachData={
            
            firstName:data.first,
            lastName:data.last,
            description:data.desc,
            hourlyRate:data.rate,
            areas:data.areas

        }

        //resposnse only be stored when its is done
        //its like ( it is inside then)
     
const token= context.rootGetters.token;
      
    const response =  await fetch(`https://vue-master-project-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`,{
            method:'PUT',
            body:JSON.stringify(coachData)
        })


        //respose has json method which also returns promise thats why we r using await here too

        // const responseData= await response.json();

        if(!response.ok){
         //error while registering coaches
        //  const error= new Error(responseData.error)
         const error= new Error("You can't do registration w/o login")
        throw error;
            
        }
    
    

        //this will only execute when all promoises are done

        context.commit('registerCoach',{
            ...coachData,
            id:userId
        })
    },

   async loadCoaches(context,payload){
       if(!payload.forceRefresh && !context.getters.shouldUpdate){
           return;
       }
        //fetching coaches
        const response =  await fetch(`https://vue-master-project-default-rtdb.firebaseio.com/coaches.json`)

        const responseData= await response.json();

        if(!response.ok){
            //error while loading coaches
       
            const error= new Error(responseData.message || 'Failed to fetch coaches List')
            throw error;
        }
        const coaches=[];
    for (const key in responseData){
        const coach={
            id:key,
            firstName:responseData[key].firstName,
            lastName:responseData[key].lastName,
            description:responseData[key].description,
            hourlyRate:responseData[key].hourlyRate,
            areas:responseData[key].areas
        }


        coaches.push(coach)

    }

    context.commit('setCoaches',coaches );
    context.commit('setFetchTimestamp' );





    }
}