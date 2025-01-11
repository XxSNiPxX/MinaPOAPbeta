const { authJwt,upload } = require("../middleware");
const controller = require("../controllers/user.controller");
const cors = require('cors');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  const corsOptions = {
    origin: '*',  // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
    allowedHeaders: ['x-access-token', 'Origin', 'Content-Type', 'Accept'],  // Allowed headers
  };

  app.use(cors(corsOptions));  // Enable CORS with the defined options




  app.get(
    "/api/event/getallevents",
    controller.getEvents
  );

  app.get(
    "/api/event/getuserevents",
    [authJwt.verifyToken],

    controller.getUserEvents
  );

  app.get(
    "/api/event/getreservedevents",
    [authJwt.verifyToken],

    controller.getReservedEvents
  );







  app.post("/api/event/create", [authJwt.verifyToken, upload], controller.createEvent);

  app.post("/api/event/join", [authJwt.verifyToken], controller.joinEvent);
  app.post("/api/event/endEvent", [authJwt.verifyToken], controller.endEvent);


  let isProcessing = false;
  let queue = []; // Queue to hold incoming requests for claim

  // Function to process a request in the queue
  async function processQueue() {
    if (queue.length > 0 && !isProcessing) {
      const { req, res } = queue.shift(); // Get the next request from the queue
      isProcessing = true;
      try {
        await controller.claimReward(req, res); // Call your claimReward function
      } catch (error) {
        console.error('Error processing claim:', error);
      } finally {
        isProcessing = false;
        processQueue(); // After processing, check if there's another request in the queue
      }
    }
  }
  app.post("/api/event/claim", [authJwt.verifyToken], (req, res) => {
    // Add the claim request to the queue
    controller.claimRewardPending(req, res);


      queue.push({ req, res });
    

    // Add the claim request to the queue

    // Respond immediately that the request has been queued
    res.status(202).send('Your claim request is being processed.');

    // If no request is being processed, start processing the queue
    processQueue();

  });


  app.post(
    "/api/event/getreservedusers",
    [authJwt.verifyToken],

    controller.getReservedUsers
  );
};
