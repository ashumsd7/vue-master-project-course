<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="text-decoration-none text-warning fw-bolder" to="/"
        >FIND COACH</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse me-auto" id="navbarNavAltMarkup">
        <div class="navbar-nav ms-auto">
          <router-link
            class="ms-4 text-decoration-underline text-danger text-white"
            to="/coaches"
            >All Coches</router-link
          >
          <router-link
            v-if="isLoggedIn"
            class="ms-4 text-decoration-underline text-white"
            to="/requests"
            >Requests</router-link
          >
          <router-link
            v-if="!isLoggedIn"
            class="ms-4 w-25 text-white btn btn-outline-danger"
            to="/auth"
            >Sign in</router-link
          >
          <router-link
            v-if="isLoggedIn"
            class="ms-4 w-25 text-white btn btn-danger"
            to="/auth" @click="logout"
            >Log out</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  },
};
</script>

<style lang="scss" scoped>
</style>