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
        if(!response.OK){
            //error
            console.log('Error');
        }

        //this will only execute when all promoises are done

        context.commit('registerCoach',{
            ...coachData,
            id:userId
        })
    }
}