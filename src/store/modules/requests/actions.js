export default{
  async  contactCoach(context,payload){
        const newRequest={
            // id:new Date().toISOString(),
            coachId: payload.coachId,
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
        context.commit('addRequest',newRequest)
    }
}