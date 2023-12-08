const fs = require('fs');

function logMiddleware(req, res, next){

    fs.appendFileSync('stack.txt', 'Se ingresó a: ' + req.url + '\n');
    next();

}

module.exports = logMiddleware;