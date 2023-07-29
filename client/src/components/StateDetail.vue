<template>
  <div class="state-info">
    <span class="'state=name'">{{ state.name }}</span>

    <div>
      <input
        class="visit-state"
        type="checkbox"
        v-model="visited"
        v-on:change="visitedChange"
      />
    </div>

    <div>
      <!-- /map/:state -> same as /map/Florida or /map/Wisconsin -->
      <!-- Note that routing for server and routing for the client are separate from each other, rather have the same concept -->
      <!-- params is from the route index.js to identify the 'state' inside the url /map/:state. And to change the state dynamically, we define the state param of the url to the object prop we have here, state.name  -->
      <router-link
        v-bind:to="{ name: 'StateMap', params: { state: state.name } }"
      >
        <img class="map-icon" src="@/assets/map_Icon_By_Icon8.png" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  name: 'StateDetail',
  emits: ['update-visited'],
  props: {
    state: Object, // Don't modify props (original data being sent from parent)
  },
  data() {
    const router = useRouter(); // Needed this for routing to that state. e.g : http://localhost:8080/#/map/Alabama
    return {
      visited: this.state.visited, // Ok to modify data copy
      router,
    };
  },
  methods: {
    // this child component method allows us to listen to clients interaction with state visited or not, and then emits a message if that happens to the parent - state list and state list to app.vue
    visitedChange() {
      this.$emit('update-visited', this.state.name, this.visited);
    },
  },
  // components: { router }, this is added out because was giving me errors of being not defined
};
</script>

<style scoped>
.state-info {
  padding: 1rem;
  height: 8rem;
  width: 10rem;
  border: 1px gainsboro solid;
  border-radius: 0.3rem;
  background-color: ghostwhite;
}

.visit-state {
  margin: 1rem;
  /* Independent style */
  text-align: center;
}

.map-icon {
  width: 2rem;
  height: 2rem;
}
</style>
