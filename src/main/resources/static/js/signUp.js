$(document).ready(function() {

})

function signUp(){
    userAlreadyExist()
}

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
}else{
    localStorage.email = document.getElementById('txtEmail').value;
    register()
}
}

//To check if the email is registered
async function userAlreadyExist() {

    let email = document.getElementById('txtEmail').value

    const findByEmail = await fetch('api/user/' + email, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })

    const listOfEmail = await findByEmail.json()

    if(listOfEmail.length >= 1){
        alert('User is already registered, Login')
        window.location.href = 'login.html'
    }else{
        passwordIsOptimal()
    }

}

//To register the email on database
async function register() {

    let data = {}
    data.email = localStorage.email
    data.password = document.getElementById('txtPassword').value
    data.name = document.getElementById('txtName').value
    data.lastName = document.getElementById('txtLastName').value
    data.years = document.getElementById('txtYears').value

    const registerUser = fetch('api/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    const response = await registerUser.text

    console.log(response)
    console.log('Ok')

}