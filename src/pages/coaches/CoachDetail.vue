<template>
<div class="">


  <section>
    <base-card>
      <h2>{{ fullName }}</h2>
      <h3>${{ rate }}</h3>
    </base-card>
  </section>

  <section>
    <base-card>
      <header>
        <h2>Interested ? Reach Out Now...</h2>
        <base-button link :to="contactLink">Contact</base-button>
      </header>
      <router-view></router-view>
    </base-card>
  </section>

  <section>
    <base-card>
      <base-badge
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"
        >{{ area }}</base-badge
      >
      <p>{{ description }}</p>
     
    </base-card>
  </section>
  </div>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    fullName() {
      return this.selectedCoach.firstName + " " + this.selectedCoach.lastName;
    },
    contactLink() {
      return this.$route.path + "/" + "contact";
    },
    areas() {
      return this.selectedCoach.areas;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    description() {
      return this.selectedCoach.description;
    },
  },
  data() {
    return {
      selectedCoach: null,
    };
  },
  created() {
   
    this.selectedCoach = this.$store.getters["coaches/coaches"].find(
      (coach) => {
        return coach.id === this.id;
      }
    );

   
  },
};
</script>

<style lang="scss" scoped>
</style>