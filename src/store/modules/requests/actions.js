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
        console.log('respose whil;e making req',responseData);
        console.log(responseData.error);

        if(!response.ok){
            const error= new Error(responseData.error || 'Failed to send request');
            throw error;
        }


        console.log('response data when request is made',responseData );
        newRequest.id= responseData.name;
        newRequest.coachId=   payload.coachId;
        console.log('this is the request msg and all', newRequest);
        context.commit('addRequest',newRequest)
    },

   async fetchRequests(context){
       const coachId= context.rootGetters.userId;
    const response= await   fetch(`https://vue-master-project-default-rtdb.firebaseio.com/requests/${coachId}.json`)
    const responseData= await response.json()
    if(!response.ok){
        const err = new Error(responseData.error || 'Something went wrong while fetching requests')
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