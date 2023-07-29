<template>
  <!-- Paragraph texts of total States, visited states, or if users visited all the states -->
  <div>
    <!-- Total States -->
    <p>
      There are a total of {{ states.length }} States including District of
      Columbia
    </p>

    <!-- Visited Counter -->
    <p>You visited {{ totalVisited }} {{ units }}</p>

    <!-- All States visited text  -->
    <p id="all-visited-message" v-if="statesAreAllVisited">
      🎉 You have visited all States including District of Columbia 🎉
    </p>
  </div>
</template>

<script>
export default {
  name: 'StateSummery',
  props: {
    // Visit or naw
    states: Array,
  },

  computed: {
    // Keep track of visited states
    totalVisited() {
      let visitedCounter = 0;

      this.states.forEach((state) => {
        if (state.visited) {
          visitedCounter++;
        }
      });

      return visitedCounter; // Return total visited States count here to send data back to parent node component (StateList)
    },
    units() {
      if (this.totalVisited == 1) {
        return 'State';
      } else {
        return 'States';
      }
    },

    // A case where users visited all states
    statesAreAllVisited() {
      return this.totalVisited === this.states.length;
    },
  },
};
</script>

<style scoped>
#all-visited-message {
  color: lightcoral;

  font-weight: 600;
}
</style>
