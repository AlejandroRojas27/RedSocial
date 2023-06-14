// Call the dataTables jQuery plugin
$(document).ready(function () {

});

async function login() {

    let data = {};
    data.email = document.getElementById('txtEmail').value;
    data.password = document.getElementById('txtPassword').value;

    /** Dummy checkpoint */
    console.log(data);

    if (data.email == "") {
        alert("Email cannot be empty");
        return;
    }

    /** To check if the email is registered */
    const findByEmail = await fetch('api/user/' + data.email, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })

     const listOfEmail = await findByEmail.json()

     /** Dummy checkpoint */
     console.log(listOfEmail.length);

    if(listOfEmail.length == 0){
        alert('User is not registered, Sign up')
        window.location.href = 'signUp.html'
    }

    const request = await fetch('api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const response = await request.text();

        console.log(response)

        if(response != "FAIL"){
            localStorage.token = response;
            localStorage.email = data.email;

            if(localStorage.email == 'alex@gmail.com'){
                window.location.href = 'admin.html'
            }else{
                window.location.href = 'paper.html'
            }


        }else{
            alert("Email or password are wrong, please try again.")
        }

}