$(document).ready(function() {

    loadUsers();

    $('users').DataTable();

})

async function loadUsers(){

    const request = await fetch('api/users', {
        method: 'GET',
        headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    })

    const users = await request.json()

    let listOfUsersOnHTMLTable = ''

    for (let user of users) {
        let deleteButton = '<a href="#" onclick="deleteUser('+ user.id +')" > DEL </a>';

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