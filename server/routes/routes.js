module.exports = app => {
    const users = require("../controllers/controller.js");
  
    // Create a new User
    app.post("/users", users.create);

    // Retrieve a single User with userName
    app.get("/users/:userName", users.findOne);

    // Update a User with userName
    app.put("/users/:userName", users.update);
  
    // Delete a User with userName
    app.delete("/users/:userName", users.delete);
  
};