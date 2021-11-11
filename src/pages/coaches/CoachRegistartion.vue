<template>
  <div class="">
    
      <base-dialog title="Trying to register.." :show="isLoading">
<base-spinner></base-spinner>
      </base-dialog>

    <base-dialog
      @close="error = null"
      :show="!!error"
      title="Error while registration"
      
    >
      <div class="alert alert-danger" role="alert">
        {{ error }}
      </div>
    </base-dialog>
    <section>
      <base-card>
        <h2>Register as a Coach!!</h2>
        <coach-form @save-data="saveData"></coach-form>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachForm from "../../components/coaches/CoachForm.vue";
import BaseDialog from '../../components/ui/BaseDialog.vue';

export default {
  data() {
    return {
      error: null,
      isLoading: false,
    };
  },
  components: {
    CoachForm,
    BaseDialog,
  },
  computed: {},
  methods: {
    async saveData(data) {
      try {
          this.isLoading= true
        await this.$store.dispatch("coaches/registerCoach", data);
      } catch (error) {
          this.isLoading= false
         
        this.error = error;
      }
    //   
    if(!this.error){
        this.$router.replace("/coaches");
    }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>