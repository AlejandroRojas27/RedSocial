$(document).ready(function() {

})

function passwordIsOptimal(){

let password = document.getElementById('txtPassword').value;

let containsNumber = false;
let containsUpper = false;
let containsLower = false;
let containsSpecial = false;
let lengthMoreThan8 = false

for(let i = 0; i < password.length; i++){

    let anscii = password.charCodeAt(i);

    if(anscii >= 48 && anscii <= 57){
        containsNumber = true;
    }

    if(anscii >= 65 && anscii <= 90){
        containsUpper = true;
    }

    if(anscii >= 97 && anscii <= 122){
        containsLower = true;
    }

    if(anscii >= 33 && anscii <= 47 ||
        anscii >= 58 && anscii <= 64 ||
        anscii >= 91 && anscii <= 96 ||
        anscii >= 123 && anscii <= 255 ){
        containsSpecial = true;
    }

    if(containsNumber && containsUpper && containsLower && containsSpecial){
        break;
    }

}

if(password.length >= 8){
    lengthMoreThan8 = true;
}

if(!containsNumber || !containsUpper || !containsLower || !containsSpecial || !lengthMoreThan8){
alert("Password must have uppercase, lowercase, special character and must have 8 or more than 8 characters ")
window.location.reload()
}

//Continuar con que pasa si el la contraseña es optima, REVISAR SI EL CORREO YA EXISTE

}
