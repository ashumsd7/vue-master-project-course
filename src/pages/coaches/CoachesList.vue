<template>
<section>
    FILTER
</section>

<section>
<div class="controls">
    <button>REFRESH</button>
    <router-link to="/register" >Register a Coach</router-link>
</div>
    LIST OF COACHES


    <ul>
        <li v-for="coach in filteredCoaches" :key="coach.id"> {{coach.firstName}}</li> 
    </ul>
</section>

</template>

<script>
    export default {
        computed:{
            filteredCoaches(){
                //this is name space accessing of indexjs state
                return this.$store.getters['coaches/coaches']
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>