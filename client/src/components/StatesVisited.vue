<template>
  <div class="visitedStatesContainer">
    <h2 class="visitedStatesTitle">Here are your visited States!</h2>

    <ul class="visitedLists">
      <p
        class="visitedStates"
        v-for="visitedState in onlyVisitedStates"
        v-bind:key="visitedState.id"
      >
        {{ visitedState.name }}
      </p>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'StatesVisited',
  data() {
    return { onlyVisitedStates: [] };
  },

  mounted() {
    this.fetchOnlyVisited();
  },

  methods: {
    async fetchOnlyVisited() {
      try {
        // Store the promise inside the stateFetched variable once promise is complete after await
        // This promise will request to axios and axios will make a request to express server and listen if request it success or not
        const stateFetched =
          await this.$stateServices.requestOnlyVisitedStates();

        // Put those state fetched data inside the array with all the states fetched data
        this.onlyVisitedStates = stateFetched;
      } catch (err) {
        // Catch any errors after try attempt and alert users error fetching
        alert('Sorry, error fetching visited states data!');
        console.error(err); // dev error stack
      }
    },
  },
};
</script>

<style scoped>
.visitedStatesContainer {
  border: 1rem solid black;

  border-radius: 1rem;
}

.visitedStatesTitle {
  font-weight: bold;

  font-size: 35px;
}

.visitedStates {
  font-weight: bold;
}
</style>
