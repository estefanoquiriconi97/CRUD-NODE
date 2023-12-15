const { validationResult } = require("express-validator");
const fs = require("fs");
const bcrypt = require("bcrypt");
const path = require("path");

const usersController = {
  login: (req, res) => {
    return res.render("login");
  },
  processLogin: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      let usersJSON = fs.readFileSync(path.join(__dirname, "../users.json"), {
        encoding: "utf8",
      });
      let users;
      if (usersJSON == "") {
        users = [];
      } else {
        users = JSON.parse(usersJSON);
      }

      let usuarioALoguearse;

      for (let i = 0; i < users.length; i++) {
        if (
          users[i].email == req.body.email &&
          users[i].password == req.body.password
        ) {
          usuarioALoguearse = users[i];
          break;
        }
      }

      if (usuarioALoguearse == undefined) {
        return res.render("login", {
          errors: [{ msg: "Usuario o contraseña incorrectos" }],
        });
      }

      req.session.usuarioLogueado = usuarioALoguearse;

      if (req.body.recordame != undefined) {
        res.cookie("recordame", usuarioALoguearse.email, {
          maxAge: 60000,
        });
      }

      res.render("success", { req });
    } else {
      return res.render("login", { errors: errors.errors });
    }
  },
};

module.exports = usersController;
