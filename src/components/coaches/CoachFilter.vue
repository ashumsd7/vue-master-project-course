<template>
    <base-card>
    
    <h3>Filter Your Coach</h3>
    <span class="filter-option">
        <input type="checkbox" @change="setFilter" name=""  id="frontend" checked/>
        <label for="frontend">frontend</label>
    </span>

    <span class="filter-option">
        <input @change="setFilter" type="checkbox" name=""  id="backend" checked/>
        <label for="frontend">backend</label>
    </span>

    <span class="filter-option">
        <input @change="setFilter" type="checkbox" name=""  id="career" checked/>
        <label for="frontend">career</label>
    </span>
    </base-card>
</template>

<script>
    export default {
        emits:['changeFilter'],
        data() {
            return {
                filters: {
                    frontend:true,
                    backend:true,
                    career:true

                }
            }
        },
        methods: {
            setFilter(e) {
                // console.log(e.target);
                const inputId= e.target.id;
                // console.log(inputId);
                const isActive= e.target.checked;
                console.log(isActive);
                const updatedFilters={
                    ...this.filters,
                    [inputId]:isActive
                }
                this.filters= updatedFilters
                // console.log(updatedFilters);
             this.$emit('changeFilter', updatedFilters)   
            }
        },
    }
</script>

<style  scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>