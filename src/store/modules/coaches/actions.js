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
    const response =  await fetch(`https://vue-master-project-default-rtdb.firebaseio.com/coaches/${userId}.json`,{
            method:'PUT',
            body:JSON.stringify(coachData)
        })


        //respose has json method which also returns promise thats why we r using await here too

        // const responseData= await response.json();
        if(!response.ok){
         //error while registering coaches
            console.log('error while registering coaches',response);
        }

        //this will only execute when all promoises are done

        context.commit('registerCoach',{
            ...coachData,
            id:userId
        })
    },

   async loadCoaches(context,payload){
        //fetching coaches
        const response =  await fetch(`https://vue-master-project-default-rtdb.firebaseio.com/coaches.json`)

        const responseData= await response.json();

        if(!response.ok){
            //error while loading coaches
            console.log('error while loading coaches',response);
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

    context.commit('setCoaches',coaches )





    }
}