import axios from 'axios';

// Axios listening to our client interacting with our data and sending that request to express for a response back
// Practically Axios is the middleman between our requests to the servers and servers to us
export default {
  // Axios Getting all the states from our server to us/clients
  getAllStates() {
    return axios.get('/api/states').then((response) => {
      return response.data;
    });
  },

  // Axios listening to clients interaction of getting one state info
  // e.g : /api/state/Wisconsin
  getOneState(stateName) {
    return axios.get('/api/state/' + stateName).then((response) => {
      // return data requested
      return response.data;
    });
  },

  // Grabbing only visited states
  // Async/await choice from vs code suggestion. But also it reminded me that if when users have many states that they visited and perhaps maybe if we add not only states but other places around the world, and their review of those places with recommendation of that place visited in the future app improvement, async is able to run and read this function to request in the background while other apps and functions can run in the meantime.
  async requestOnlyVisitedStates() {
    const response = await axios.get('/api/states/visited');
    return response.data;
  },

  // Axios listening if we visited a certain state or not

  setVisitedOrNot(stateName, visited) {
    let requestVisitedData = { visited: visited };
    // e.g url will look like this api/states/wisconsin
    return axios.patch('/api/states/' + stateName, requestVisitedData).then(
      (response) => response.data // Axios will respond back if status code 200 is returned backed from server, else will be handled with a catch block
    );
  },
};
