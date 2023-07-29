<!-- Able to show and render all the States -->

<template>
  <div>
    <StateSummery v-bind:states="states"></StateSummery>
  </div>

  <div class="state-lists-container">
    <!-- v-bind:key allows to uniquely identify each object, and in this case the v-for allows to iterate each object states and so we use that state each and put a v-bind key to each individual objects-->

    <div
      class="state-container"
      v-for="state in states"
      v-bind:key="state.name"
    >
      <!-- State list is expecting a "call back" from this child component about if that(any) particular State visited has been modified or not, so we send down v-on:update-visited chain   -->
      <StateDetail
        v-bind:state="state"
        v-on:update-visited="onUpdateVisited"
      ></StateDetail>

      <!-- {{ state.name }} -->
    </div>
  </div>
</template>

<script>
import StateDetail from './StateDetail.vue';
import StateSummery from './StateSummery.vue';
export default {
  name: 'StateList',
  data() {
    return {
      states: [],
    };
  },
  components: {
    StateDetail,
    StateSummery,
  },
  mounted() {
    this.fetchAllStates(); // method call
  },
  methods: {
    fetchAllStates() {
      this.$stateServices
        .getAllStates()
        .then((states) => {
          // console.log(states);
          this.states = states;
        })
        .catch((err) => {
          alert("Sorry can't fetch state lists");

          // error for devs to see
          console.error(err);
        });
    },
    onUpdateVisited(stateName, stateVisited) {
      // Keep in mind that this method is for the child component and this is the parent component handling that call when the stateDetail expected a change with state visited check box. And so, this method is for this parent component to call Axios to cal the server about this chain as well
      this.$stateServices
        .setVisitedOrNot(stateName, stateVisited)
        .then(
          () => this.fetchAllStates() // Axios handled the ok msg from state services
        )
        .catch((err) => {
          alert('Sorry, cannot update State visited or not request!');

          console.error(err);
        });
    },
  },
};
</script>

<style scoped>
.state-lists-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.state-container {
  margin: 1rem;
}
</style>
