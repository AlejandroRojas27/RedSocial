$(document).ready(function() {

    authEmail();

    $('users').DataTable();

})

function updateEmailOfUser(users){
    for(let user of users){
        if(user.email == localStorage.email){
            let fullName = user.name + ' ' + user.lastName;
            document.getElementById('userName').outerHTML = '<div class="nameStyle" id="userName">'+ fullName +'</div>';
            return;
        }
    }
}

async function authEmail(){

    if(localStorage.email == 'alex@gmail.com'){
        loadUsers();
    }else{
         alert("User is not an admin")
         window.location.href = 'login.html';
         return;
    }

}

function getHeaders() {
    return {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': localStorage.token
   };
}

async function loadUsers(){

    const request = await fetch('api/users', {
        method: 'GET',
        headers: getHeaders()
    });

    const users = await request.json()

    updateEmailOfUser(users)

    let listOfUsersOnHTMLTable = ''


    for (let user of users) {
        let del = '<button href="#" onclick="deleteUser('+ user.id +')"> DELETE </button>'

        let userHTML = '<tr><td>'+ user.id +'</td><td>'+user.name+ ' '+user.lastName+'</td><td>'+user.email+'</td><td>'+user.years+'</td><td> '+ del +' </td></tr>';

        listOfUsersOnHTMLTable += userHTML;
      }

    document.querySelector('#users tbody').outerHTML = listOfUsersOnHTMLTable;

}

async function deleteUser(id){

    if(!confirm('Do you want to delete this user?')){
        return;
    }

    const request = await fetch('api/deleteUser/' + id, {
        method: 'DELETE',
        headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
    });

    location.reload();


}