<template>
<div class="">


<base-dialog @close='handleError' :show="!!error" title="Something went wrong while fetching request">
<p>{{error}}</p>
</base-dialog>
  <section>
    <base-card>
      <header>
        <h2>Requests Received!!</h2>
      </header>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="hasRequests && !isLoading">
        <request-item v-for="req in receivedRequests" :key="req.id" :email="req.userEmail" :message="req.message"></request-item>
      </ul>
      <h3 v-else>
          <div class="alert alert-danger" role="alert">
You havn't received any request yet:(
</div>
      </h3>
    </base-card>
  </section>
  </div>
</template>

<script>
import RequestItem from "../../components/requests/RequestItem.vue";
import BaseDialog from '../../components/ui/BaseDialog.vue';

export default {
    data() {
        return {
            isLoading: false,
            error:null
        }
    },
    created () {
       this.loadRequests()
    },
  components: { RequestItem, BaseDialog },
  computed: {
    receivedRequests() {
      return this.$store.getters["requests/requests"];
    },
    hasRequests() {
      return this.$store.getters["requests/hasRequests"];
    },
  },
  methods: {
   async loadRequests() {
       this.isLoading= true;
       try{

           await this.$store.dispatch('requests/fetchRequests')
       }
       catch(err){
           this.error= err;
       }
         this.isLoading= false;
      },
      handleError(){
          this.error= null
      }
  },
};
</script>

<style  scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>