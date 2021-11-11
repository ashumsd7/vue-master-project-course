export default{
  async  contactCoach(context,payload){
        const newRequest={
            // id:new Date().toISOString(),
            // coachId: payload.coachId,
            userEmail:payload.email,
            message:payload.message
        }
        // console.log('this is new ewq',newRequest);

     const response= await   fetch(`https://vue-master-project-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,{
            method:'POST',
            body:JSON.stringify(newRequest)
        })


        const responseData= await  response.json();
    

        if(!response.ok){
            const error= new Error(responseData.error || 'Failed to send request');
            throw error;
        }


        
        newRequest.id= responseData.name;
        newRequest.coachId=   payload.coachId;
     
        context.commit('addRequest',newRequest)
    },

   async fetchRequests(context){
       const coachId= context.rootGetters.userId;

       const token= context.rootGetters.token;

     
    const response= await   fetch(`https://vue-master-project-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=`+ token)
    const responseData= await response.json()
    if(!response.ok){
        // responseData.error ||
        const err = new Error( ' Unauthorized or Something went wrong while fetching requests')
        throw err;
    }

    const requests=[];
    for(const key in responseData){
        const request={
            id:key,
            coachId:coachId,
            userEmail: responseData[key].userEmail,
            message: responseData[key].message
        }

        requests.push(request)

        
    }
    context.commit('setRequests',requests)
    }
}