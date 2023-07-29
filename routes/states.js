let express = require('express'); // express object

let States = require('../models').States; // States db object model

let router = express.Router(); // Using express as routing http request/response from our axios clients

// Fetch all states
// In this case, we want a response back to clients for all the states from our db using a request to the '/states' route
router.get('/states', function (req, res, next) {
  // Ask the States model to find all the states from our db
  States.findAll({ order: ['name'] })
    .then((states) => {
      return res.json(states); // Convert to JSON format
    })
    .catch((err) => {
      next(err); // Catch errors
    });
});

// e.g state/California
// Will grab all the information on this state request
router.get('/state/:name', function (req, res, name) {
  let stateName = req.params.name;
  States.findOne({ where: { name: stateName } })
    .then((state) => {
      // Standard promise return, response back with the state json format or not
      if (state) {
        return res.json(state);
      } else {
        // e.g state name(qwerty) that is not in the States db, will throw a 404 request not found error
        return res.status(404).send('State Not Found');
      }
    })
    .catch((err) => {
      next(err);
    });
});

// Patch router to update visited or naw

router.patch('/states/:name', function (req, res, next) {
  let stateName = req.params.name; // e.g Wisconsin

  // Req body is JSON format from clients
  let stateVisited = req.body.visited; // Request clients input data of Visited is true or naw

  // Update the following state visited or not where clients JSON body shows the state name. My weird explanation LMAO

  //E.G - { Visited: True, StateName : Wisconsin }
  States.update({ visited: stateVisited }, { where: { name: stateName } })
    .then((rowUpdated) => {
      let numberOfRowUpdated = rowUpdated[0];

      // If rows updated is 1 return a response, else return res.status

      numberOfRowUpdated == 1
        ? res.send('OK')
        : res.status(404).send('State not found');
    })
    .catch((err) => next(err)); // Catch any unexpected errors that is not users problem and this is from server.js 500 status code (server error)
});

// Grabbing all visited states, async/await version so it can run and wait for the promise to complete before execution,in case larger read
router.get('/states/visited', async (req, res, next) => {
  try {
    // only visited states request to db
    const myVisitedStates = await States.findAll({ where: { visited: true } });
    res.json(myVisitedStates); // response back from db and converting JS object
  } catch (err) {
    // catch any unhandled errors
    next(err);
  }
});

module.exports = router;
