<template>
  <section>
  
      <coach-filter @changeFilter='setFilters'></coach-filter>
     
  </section>

  <section>
      <base-card>
    <div class="controls">
      
      <base-button mode='outline'>REFRESH</base-button>
      <base-button link to="/register" >Register a Coach</base-button>
    </div>
    <ul v-if="hasCoaches">
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
    <h3 v-else>No Coacheds Found!!!</h3>
    </base-card>
  </section>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem";
import CoachFilter from "../../components/coaches/CoachFilter";

export default {
    data() {
        return {
            activeFiltes: {
                frontend:true,
                backend:true,
                career:true
            }
        }
    },
  components: {
    CoachItem,
    CoachFilter
  
  },
  computed: {
    filteredCoaches() {
      //this is name space accessing of indexjs state
      const coaches=  this.$store.getters["coaches/coaches"];
        return coaches.filter(coach=>{
            if(this.activeFiltes.frontend && coach.areas.includes('frontend')){
                return true;
            }
            if(this.activeFiltes.backend && coach.areas.includes('backend')){
                return true;
            }
            if(this.activeFiltes.career && coach.areas.includes('career')){
                return true;
            }
            return false
        })
    },
    hasCoaches() {
      return this.$store.getters["coaches/hasCoaches"];
    },
  },
  methods: {
      setFilters(updatedFilters) {
        //   console.log('rcvd filters', updatedFilters);
          this.activeFiltes= updatedFilters
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