const sql = require("./db.js");


// constructor
const User = function(user) {
    this.name = user.name;
    this.age = user.age;
    this.hairColor = user.hairColor;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created user: ", newUser);
      result(null, newUser);
    });
};

User.findByName = (userName, result) => {
    sql.query(`SELECT * FROM users WHERE name = ?`, userName, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found User with the name
      result({ kind: "not_found" }, null);
    });
};

User.updateByName = (userName, user, result) => {
    sql.query(
      "UPDATE users SET name = IfNull(?, name), age = IfNull(?, age), hairColor = IfNull(?, hairColor) WHERE name = ?",
      [user.name, user.age, user.hairColor, userName],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found user with the name
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated user: ", user);
        result(null, user);
      }
    );
};

User.remove = (userName, result) => {
    sql.query("DELETE FROM users WHERE name = ?", userName, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found User with the userName
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted user with username: ", userName);
      result(null, res);
    });
};

module.exports = User;