<template>
  <li>
      <h3>{{fullName}}</h3>
      <h4>$ {{rate}}</h4>   
      <div class="">
           <base-badge v-for="area in areas" :title="area" :key="area" :type='area'>
               
           </base-badge> 
        <div class="actions">
            <base-button link mode='outline' :to="coachContactLink">Contact</base-button>
            <base-button link :to="coachDetail">View Details</base-button>
        </div>
      </div>
  </li>
</template>

<script>
    export default {
        props:['id', 'firstName', 'lastName', 'rate', 'areas'],
        computed:{
            fullName(){
                return this.firstName + ' ' + this.lastName
            },
            // this.$route.path refers to current route 
            coachContactLink(){
                return this.$route.path + '/' + this.id + '/contact'
            },
            coachDetail(){
                return this.$route.path + '/' + this.id
            }
        }
    }
</script>

<style  scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>