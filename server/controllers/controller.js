const User = require("../models/model.js");

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a User
    const user = new User({
      name: req.body.name,
      age: req.body.age,
      hairColor: req.body.hairColor
    });
  
    // Save User in the database
    User.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      else res.send(data);
    });
};

exports.findOne = (req, res) => {
    User.findByName(req.params.userName, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with username ${req.params.userName}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving User with username " + req.params.userName
          });
        }
      } else res.send(data);
    });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    User.updateByName(
      req.params.userName,
      new User(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with username ${req.params.userName}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating User with username " + req.params.userName
            });
          }
        } else res.send(data);
      }
    );
};


exports.delete = (req, res) => {
    User.remove(req.params.userName, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with username ${req.params.userName}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete User with username " + req.params.userName
          });
        }
      } else res.send({ message: `User was deleted successfully!` });
    });
};
