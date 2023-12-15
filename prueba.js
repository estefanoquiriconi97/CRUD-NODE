const bcrypt = require('bcrypt');

let password = 'reyenelnorte';

let resultado = bcrypt.hashSync(password, 10);

console.log(password, resultado);

if(bcrypt.compareSync(password, resultado)){
    console.log("Contraseña correcta!!");
}