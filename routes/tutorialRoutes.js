module.exports = app => {
    const tutorials = require("../controller/tutorialController.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", tutorials.create);
  
    // Retrieve all Tutorials
    router.get("/", tutorials.findAll);
  
   
  
    app.use('/api/tutorials', router);
  };