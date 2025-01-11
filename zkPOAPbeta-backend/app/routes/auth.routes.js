const cors = require('cors');
const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  // CORS configuration to allow all origins
  const corsOptions = {
    origin: '*',  // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
    allowedHeaders: ['x-access-token', 'Origin', 'Content-Type', 'Accept'],  // Allowed headers
  };

  app.use(cors(corsOptions));  // Enable CORS with the defined options

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};
