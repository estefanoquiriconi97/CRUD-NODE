const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {
  if (req.cookies.recordame != undefined && req.session.usuarioLogueado == undefined) 
  {
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

    console.log("----" + req.cookies.recordame);

    for (let i = 0; i < users.length; i++) {
      if (users[i].email == req.cookies.recordame) {
        usuarioALoguearse = users[i];
        break;
      }
    }
    
    req.session.usuarioLogueado = usuarioALoguearse;
  }
  next();
};
