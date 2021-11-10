<template>
<div class="">

 <section>
     <base-card>
    
     <h2>Register as a Coach!!</h2>
     <coach-form @save-data='saveData'></coach-form>
      </base-card>
 </section>
     
</div>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue'
    export default {
        components:{
            CoachForm
        },
        computed: {
           
        },
        methods: {
            saveData(data) {
                this.$store.dispatch('coaches/registerCoach',data);
                this.$router.replace('/coaches')
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>