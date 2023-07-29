<template>
  <div class="state-map">
    <h2>The State of {{ state.name }}</h2>

    <p v-if="state.visited">You have visited this State</p>

    <p v-else>You have not visited this state</p>

    <!-- leaflet map here based on state chosen -->
    <!-- Show the map if the data is ready first -->
    <div id="map-container" v-if="dataReady">
      <!-- Leaflet map -->
      <!-- Note: Ref is not a direct html tool, but rather from vue to "reference" a html element, using ref as the key. -->
      <l-map
        ref="map"
        v-on:ready="onMapReady"
        v-bind:center="mapCenter"
        v-bind:zoom="state.zoom"
      >
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        ></l-tile-layer>
      </l-map>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet';
export default {
  name: 'StateMap',

  components: {
    LMap,
    LTileLayer,
  },

  data() {
    return {
      state: {},
      dataReady: false,
      mapReady: false,
    };
  },

  mounted() {
    // When this is read from the index.js routing, thee param will be the state name
    // Defining the state object by stepping into our global route params for state
    //e.g Idaho
    this.state.name = this.$route.params.state;

    // Make a request to fetch that state data
    this.fetchStateData();
  },

  methods: {
    fetchStateData() {
      this.$stateServices
        .getOneState(this.state.name)
        .then((stateInfoResponse) => {
          this.state = stateInfoResponse; // Overwrites the state object with the response from the states api

          // When the data for the state has been fetch, we will have dataReady be true as an go ahead light (only for state data)
          this.dataReady = true;
        })
        .catch((err) => {
          // 404(request page is not found) and 500(server issues) errors.

          if (err.response && err.response.status === 404) {
            this.state.name = this.$router.push({ name: 'NotFoundPage' }); // what to do if error 404 happens. State is set to what and where can we redirect the clients?
          } else {
            alert('Sorry, error fetching data about this State');
            console.error(err); // for Developers
          }
        });
    },

    // Method for map being ready after thee data
    onMapReady() {
      this.mapReady = true;
    },

    setMapView() {
      if (this.mapReady && this.dataReady) {
        // show map correct part of the world

        // Referencing the html part of the map, we will bind the leaflet method, where we step into a method for the leaflet object andd add a method called setView()
        this.$refs.map.leafletObject.setView(this.mapCenter, this.zoom);
      }
    },
  },

  computed: {
    mapCenter() {
      // States' long and lat data from db
      return [this.state.lat, this.state.lon];
    },
  },
};
</script>

<style scoped>
#map-container {
  height: 30rem;
}
</style>
