<template>
  <div class="">
    <base-dialog @close="handleClose" title="An error is there" :show="!!error">
      <div class="alert alert-danger" role="alert">Error while signing/logging in : {{error}}</div>
    </base-dialog>
    <base-dialog fixed title="Authentication " :show="isLoading">
      <div class="alert alert-success" role="alert">Please Wait ...</div>
      <base-spinner></base-spinner>
    </base-dialog>

    <form action="" @submit.prevent="submitForm">
      <base-card>
        <div class="form-control">
          <label for="email">Email</label>
          <input v-model.trim="email" type="email" name="" id="email" />
        </div>

        <div class="form-control">
          <label for="password">Password</label>
          <input
            v-model.trim="password"
            type="password"
            name=""
            id="password"
          />
        </div>

        <div class="alert alert-danger" v-if="!formIsValid" role="alert">
          Please check email and password. Paswword should be 6 char long.
        </div>
        

        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" @click="switchAuthMode" mode="flat">{{
          switchModeButtonCaptain
        }}</base-button>
      </base-card>
    </form>
  </div>
</template>

<script>
import BaseSpinner from "../../components/ui/BaseSpinner.vue";
export default {
  components: { BaseSpinner },
  computed: {
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Login Now";
      }
      if ((this.mode = "signup")) {
        return "SignUp";
      }
    },
    switchModeButtonCaptain() {
      if (this.mode == "login") {
        return "New User? Sign UP";
      } else {
        return "Already Registered? Login ";
      }
    },
  },
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",

      isLoading: false,
      error: null,
    };
  },
  methods: {
    handleClose() {
      this.error = null;
    },
    async submitForm() {
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      const actionPayload = {
        email: this.email,
        password: this.password,
      };
      try {
        if (this.mode == "login") {
        await  this.$store.dispatch("login", actionPayload);
       
        } else {
          await this.$store.dispatch("signup", actionPayload);

         
        }
         const redirectUrl= '/'+(this.$route.query.redirect || 'coaches')
         
          this.$router.replace(redirectUrl)
      } catch (error) {
        
        this.error = error || "Failed to SignUp";
      }
      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode == "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
  },
};
</script>

<style  scoped>
form {
  margin: 1rem;

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
</style>