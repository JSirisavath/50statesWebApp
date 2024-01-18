# 50 States Traveler App

Developer: Jerry Sirisavath

Initial Commit To GitHub: 07-29-2023

## About the App

The 50 States Travel App is a Vue.js-based web application designed for travel enthusiasts within the United States. It offers an interactive and engaging way for users to track and record the states they have visited or want to visit!

## Key Features:

- **State Tracking:** Users can view, edit, or add states to their visited list.
- **Interactive Map:** Clicking on a state on the map takes the user to a detailed page for that state, highlighting its location and visited status.
- **Navigation Links:** Easy navigation to the home page, a list of all visited states, and an 'About' page for more information.
- **Built With Vue.js:** This application leverages the power of Vue.js, a progressive JavaScript framework, to create a dynamic and responsive user interface. Vue's reactive data binding and composable component system make it an ideal choice for this app.

## Screenshots:
Screenshots of the app in action, showcasing its user-friendly interface and interactive features.

<img width="1440" alt="Screenshot 2024-01-17 at 9 51 42 PM" src="https://github.com/JSirisavath/50statesWebApp/assets/122318778/2c0d09cc-8b86-4280-88ad-f63f2dabe1ba">

<img width="1440" alt="Screenshot 2024-01-17 at 9 51 59 PM" src="https://github.com/JSirisavath/50statesWebApp/assets/122318778/397008fc-afd7-48e4-86d6-d6163ca637e9">

<img width="1440" alt="Screenshot 2024-01-17 at 9 52 20 PM" src="https://github.com/JSirisavath/50statesWebApp/assets/122318778/f7ae6ea4-1b2b-4a10-8bc9-72587027cce7">

<img width="1440" alt="Screenshot 2024-01-17 at 9 52 35 PM" src="https://github.com/JSirisavath/50statesWebApp/assets/122318778/14d71ccd-2f53-4519-a062-b0701f78f94d">

<img width="1440" alt="Screenshot 2024-01-17 at 9 52 53 PM" src="https://github.com/JSirisavath/50statesWebApp/assets/122318778/846e6589-6e79-4ded-8589-7fe80471f26b">

<img width="1439" alt="Screenshot 2024-01-17 at 9 53 06 PM" src="https://github.com/JSirisavath/50statesWebApp/assets/122318778/7fc0b007-8e5d-4bbb-afd2-4b990b15a0b6">


## Code Highlights:

  - **Technologies Used:**
    Vue.js: Frontend framework for building user interfaces.
JavaScript: Core scripting language for interactive elements.
HTML & CSS: Structuring and styling of the app's pages.

Creating a map container and each state that is being styled within the same vue file
```
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
...
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
```

- **Leaflet Maps:** For rendering interactive maps based on state selections.
API Integration: Our API provides data on all 51 states and their coordinates, enabling dynamic map updates.

How does each state location display the correct map section? 
We fetch the state name that users want to see. We then call our customized API using that request as a parameter to search for that state data in our database. In that database, we are grabbing that state's longitude and latitude to use for our built-in leaflet object method, "setView". The state is the object that is being set back from our, "getOneState()" that makes an Axios get request to our API. 

```
  // Axios listening to clients interaction of getting one state info
  // e.g : /api/state/Wisconsin
  getOneState(stateName) {
    return axios.get('/api/state/' + stateName).then((response) => {
      // return data requested
      return response.data;
    });
  },

```

- **Making the call to getOneState function from the stateMap.vue:** 
```
 .getOneState(this.state.name)
        .then((stateInfoResponse) => {
          this.state = stateInfoResponse; // Overwrites the state object with the response from the states api

          // When the data for the state has been fetch, we will have dataReady be true as an go ahead light (only for state data)
          this.dataReady = true;
        })
```

- **Computed function to wrap the state latitude and longitude:** 

```
  computed: {
    mapCenter() {
      // States' long and lat data from db
      return [this.state.lat, this.state.lon];
    },
  },

```

- **Setting map view if the map is ready to render and data is ready to return:** 

```
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

```


- **Loading the map based on the requested state if all the prerequisite to gather data is ready:** 

```
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

```

- **Code Structure:** 
Components: Reusable Vue components for each part of the app (e.g., StatePage, MapView).
Data Binding: Vue's data binding methods are used extensively for real-time UI updates.
API Interaction: JavaScript functions for fetching and handling state data from the API.

<img width="237" alt="Screenshot 2024-01-17 at 10 40 05 PM" src="https://github.com/JSirisavath/50statesWebApp/assets/122318778/e25abab6-810f-48e4-a392-afa845862c71">


## Personal Development

This project has significantly deepened my understanding of the MVC (Model-View-Controller) architecture. It provided practical insights into various aspects, such as managing the state of data, processing user requests to access information about individual states, and establishing API requests to interact with our States database. A notable aspect was the layered abstractions, particularly in configuring the backend connections between request routes and our database. This experience has been instrumental in enhancing my skills in handling complex system interactions within the MVC framework.


## Future Enhancements

Plans for future development of the 50 States Traveler App include:

- Implement more places around the world besides the United States.
- Integrating a personal profile system for that user and saving their data in their own storage. This includes their identity, where they are located, travels, pictures, videos, etc.
- Create a OAuth system for specific users
- Customize and find more information about each state and location. This would mean reworking the States DB to use an actual API call where there is data to be retrieved. Including the set location coordinates, lists of attractions for those places, pictures, featured videos, vlogs, fun facts, etc.
- Deploy to cloud with those given features


## Conclusion

Working on this full-stack application has been pivotal in reinforcing my understanding of dynamic data handling and has introduced me to new perspectives in this area. Utilizing the Vue framework in conjunction with Node.js and various other tools has provided me with a deeper comprehension of the foundational principles of client/server-based applications. This experience has not only solidified my existing knowledge but also expanded my technical skill set in managing and integrating different components of a modern web application.

Thank you for your interest in the  50 State Traveler App. Feedback and contributions are highly appreciated!
