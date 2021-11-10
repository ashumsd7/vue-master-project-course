<template>
<base-dialog @close='handleError' :show='!!error' title="There is an error.....">
<p>{{error}}</p>
</base-dialog>
  <section>
    <coach-filter @changeFilter="setFilters"></coach-filter>
  </section>

  <section>
    <base-card>
      <div class="controls">
        <base-button @click="loadCoaches(true)" mode="outline">REFRESH</base-button>
        <base-button v-if="!isCoach" link to="/register"
          >Register a Coach</base-button
        >
      </div>
<!-- LOADING SPINNER -->
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>


      <ul v-else-if="hasCoaches">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :rate="coach.hourlyRate"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :areas="coach.areas"
        ></coach-item>
      </ul>
      <p v-else><div class="alert alert-danger mt-2" role="alert">
  ❌No Coaches Found.....❌
</div></p>
    </base-card>
  </section>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem";
import CoachFilter from "../../components/coaches/CoachFilter";

export default {
  data() {
    return {
      isLoading: false,
      error:null,
      activeFiltes: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  components: {
    CoachItem,
    CoachFilter,
  },
  created() {
    this.loadCoaches();
  },
  computed: {
    filteredCoaches() {
      //this is name space accessing of indexjs state
      const coaches = this.$store.getters["coaches/coaches"];
      return coaches.filter((coach) => {
        if (this.activeFiltes.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFiltes.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.activeFiltes.career && coach.areas.includes("career")) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters["coaches/hasCoaches"];
    },
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
  },
  methods: {
    setFilters(updatedFilters) {
      //   console.log('rcvd filters', updatedFilters);
      this.activeFiltes = updatedFilters;
    },

    async loadCoaches(refresh=false) {
      this.isLoading = true;
      try{

        await this.$store.dispatch("coaches/loadCoaches",{
          forceRefresh:refresh
        });
      }
      catch(err){
        this.error=err.message || 'Something Went Wrong...'
      }
      this.isLoading = false;
    },

    handleError(){
      this.error=null;
    }
  },
};
</script>

<style  scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>