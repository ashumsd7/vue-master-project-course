<template>

<base-dialog @close='handleError' title='An error is occured while making request to a coach' :show="!!error">
<p>{{error}}</p></base-dialog>
<div v-if="isLoading" class="">

<base-spinner> </base-spinner> 
</div>
  <form @submit.prevent="submitForm" action="">
    <div class="form-control">
      <label for="email">Your Email</label>
      <input v-model.trim="email" type="email" name="" id="email" />
    </div>
    <div class="form-control">
      <label for="message">Your Message</label>
      <textarea v-model.trim="message" rows="5" type="" name="" id="message" />
    </div>
    <p v-if="!formIsValid" class="errors">Please fill details..</p>
    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script>

export default {
  
  data() {
    return {
      email: "",
      message: "",
      formIsValid: true,

      error:null,
      isLoading:false
      
    };
  },
  methods: {
   async submitForm() {
      this.formIsValid = true;
      if (this.email == "" || !this.email.includes("@") || this.message == "") {
        this.formIsValid = false;
        return;
      }

      try{
          this.isLoading= true

        await  this.$store.dispatch('requests/contactCoach',{
              email:this.email,
              message:this.message,
              coachId:this.$route.params.id
    
    
          })
      }
      catch(err){
          this.isLoading= false
          this.error= err;
          
      }

if(!this.error){
    this.$router.replace('/coaches')
}
    //   
    },
    handleError(){
        this.error= null;
    }
  },
};
</script>

<style  scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>