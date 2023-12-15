const fs = require('fs');
const path = require('path');

function logMiddleware(req, res, next){

    console.log(req.url);

    fs.appendFileSync(path.join(__dirname, '../../logs/userLogs.txt'), 'Se ingresó a: ' + req.url + '\n');
    next();

}

module.exports = logMiddleware;