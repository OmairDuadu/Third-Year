$(document).ready(function() {
    const post = $.get('http://localhost:3000/retrieveAllUsers');
    post.done(buildUsersTable);
    post.fail(displayErrorUsers);
});


function buildUsersTable(rows, status, xhr) {

    let resultsTable = `
    <table id="resultsTable" class="table">
    <thead>
        <tr>
            <th scope="col">User ID</th>
        </tr>
    </thead>
    <tbody id='tableBody'>
    </tbody>
    </table>`;
    $(resultsTable).appendTo('#colTable');
    for (let i = 0; i < rows.length; i++) {
        const trId = `tr${rows[i].user_id}`;
        $(`<tr id='${trId}'></tr>`).appendTo('#tableBody');
        $(`<td> ${rows[i].user_id}</td>`).appendTo(`#${trId}`);
        $(`<td><a id='update${trId}' class='btn btn-link'>Update</a></td>`).appendTo(`#${trId}`);
        $(`<td><a id='delete${trId}' class='btn btn-link'>Delete</a></td>`).appendTo(`#${trId}`);

        $(`#update${trId}`).click(updateUsersForm);
        $(`#delete${trId}`).click(deleteUser);
    }
}

function updateUsersForm() {
    const element = this.parentElement.parentElement;
    console.log(element);
    $('#clickedId').text(element.children[0].innerText);
    $('#username').val(element.children[0].innerText);
}

function deleteUser() {
    const element = this.parentElement.parentElement;
    const data = {
        username: element.children[0].innerText,
    }
    const post = $.post('http://localhost:3000/deleteUser', data);
    post.done(processUserSuccess);
    post.fail(processUserErrors);
}

function displayErrorUsers(response, status, xhr) {
    console.log(response);
    const errors = response.responseJSON.errors;
    for (let i = 0; i < errors.length; i++) {
        $(`<div>${JSON.stringify(errors[i])}</div>`).appendTo('.container');
    }
}

$('#formNewUser').validate({
    rules: {
        username: {
            required: true,
            minlength: 3,
            maxlength: 50
        },
        password: {
            required: true,
        },
    },
    messages: {
        username: {
            required: 'Please inform your username to login.',
        },
        password: {
            required: 'Please inform your password to login.',
        },
    },
    submitHandler: createAjaxPostUser
});

$('#btnSubmit').click(function() {
    $('#formNewUser').submit();
});

function createAjaxPostUser() {
    const clickedIdtext = $('#clickedId').text();
    if (clickedIdtext == '-1' || clickedIdtext == '') {
        console.log('new user');
        createAjaxPostNewUser();
    } else {
        console.log('update user');
        createAjaxPostUpdateUser();
    }
}

function createAjaxPostNewUser() {
    const data = {
        username: $('#username')[0].value,
        password: $('#password')[0].value
    }
    const post = $.post('http://localhost:3000/insertNewUser', data);
    post.done(processUserSuccess);
    post.fail(processUserErrors);
}

function createAjaxPostUpdateUser() {
    const data = {
        username: $('#username')[0].value,
        password: $('#password')[0].value
    }
    const post = $.post('http://localhost:3000/updateUser', data);
    post.done(processUserSuccess);
    post.fail(processUserErrors);
}

function processUserSuccess(rows, status, xhr) {
    $('#resultsTable').remove();
    $('#formNewUser').trigger('reset');
    $('#clickedId').text('-1');
    buildUsersTable(rows, status, xhr);
}

function processUserErrors(error, status, xhr) {
    console.log(error);
    const errorMsg = error.responseJSON.error;
    $(`<div class='alert alert-danger'>${errorMsg}</div>`).appendTo('.container');
}

$('#btnClear').click(function() {
    $('#formInterest').trigger('reset');
    $('#clickedId').text('-1');
});