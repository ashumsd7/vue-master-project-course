<template>
  <form @submit.prevent="submitForm" action=" ">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">First Name</label>
      <input
        v-model.trim="firstName.val"
        type="text"
        name=""
        @blur="clearValidity('firstName')"
        id="firstname"
      />
      <p v-if="!firstName.isValid">First Name must not be empty...</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastname">Last Name</label>
      <input
        v-model.trim="lastName.val"
        type="text"
        name=""
        id="lastname"
        @blur="clearValidity('lastName')"
      />
      <p v-if="!lastName.isValid">Last Name must not be empty...</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="lastname">Description</label>
      <textarea
        v-model.trim="description.val"
        rows="5"
        type="text"
        name=""
        @blur="clearValidity('description')"
        id="Description"
      />
      <p v-if="!description.isValid">Please Describe the coach...</p>
    </div>

    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="lastname">Hourly Rate</label>
      <input
        v-model.number="rate.val"
        type="number"
        name=""
        @blur="clearValidity('rate')"
        id="rate"
      />
      <p v-if="!rate.isValid">Please input Valid Rate...</p>
    </div>

    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Areas of Expertise</h3>
      <div class="">
        <input
          v-model="areas.val"
          type="checkbox"
          name=""
          value="frontend"
          id="frontend"
          @blur="clearValidity('areas')"
        />
        <label for="frotnend">Front End Development</label>
      </div>
      <div class="">
        <input
          v-model="areas.val"
          type="checkbox"
          name=""
          value="backend"
          id="backend"
          @blur="clearValidity('areas')"
        />
        <label for="backend">Back End Development</label>
      </div>
      <div class="">
        <input
          v-model="areas.val"
          type="checkbox"
          name=""
          value="career"
          id="career"
          @blur="clearValidity('areas')"
        />
        <label for="career">Career Coaching</label>
      </div>

      <p v-if="!areas.isValid">Select Your Expertise</p>
    </div>
    <p v-if="!formIsValid">Please fix the above errors!!</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
import BaseButton from "../ui/BaseButton.vue";
export default {
  components: { BaseButton },
  emits: ["save-data"],
  data() {
    return {
      firstName: {
        val: "",
        isValid: true,
      },
      lastName: {
        val: "",
        isValid: true,
      },
      description: {
        val: "",
        isValid: true,
      },
      rate: {
        val: "",
        isValid: true,
      },
      areas: {
        val: [],
        isValid: true,
      },

      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
      console.log(this[input].isValid);
    },
    validateForm() {
      this.formIsValid = true;

      this.firstName.isValid = true;
      this.lastName.isValid = true;
      this.description.isValid = true;
      this.areas.isValid = true;

      this.rate.isValid = true;

      if (this.firstName.val === "") {
        this.formIsValid = false;
        this.firstName.isValid = false;
      }

      if (this.lastName.val === "") {
        this.formIsValid = false;
        this.lastName.isValid = false;
      }

      if (this.description.val === "") {
        this.formIsValid = false;
        this.description.isValid = false;
      }

      if (!this.rate.val || this.rate.val < 0) {
        this.formIsValid = false;
        this.rate.isValid = false;
      }

      if (this.areas.val.length === 0) {
        this.formIsValid = false;
        this.areas.isValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }
      const formData = {
        first: this.firstName.val,
        last: this.lastName.val,
        desc: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val,
      };

      this.$emit("save-data", formData);
    },
  },
};
</script>

<style  scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>