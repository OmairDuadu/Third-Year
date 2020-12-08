$('#mainForm').validate({
    rules: {
        fName: {
            required: true,
            minlength: 3,
            maxlength: 50
        },
        lName: {
            required: true,
            minlength: 3,
            maxlength: 50
        },
        email: {
            required: true,
            minlength: 3,
            maxlength: 50,
            email: true
        },
    },
    messages: {
        fName: {
            required: 'Please inform first name',
            minlength: 'First name should contain at least 3 chars.'
        },
        lName: {
            required: 'Please inform last name',
            minlength: 'Last name should contain at least 3 chars.'
        }
    },
    onfocusout: validateFiels,
    submitHandler: createAjaxPost
});

function validateFiels(element, event) {
    $(element).valid();
}

function createAjaxPost() {
    const data = {
        fName: $('#fName')[0].value,
        lName: $('#lName')[0].value,
        email: $('#email')[0].value
    }
    const post = $.post('http://localhost:3000/insertSubscriber', data);
    post.done(processResults);
    post.fail(processErrors);
}

$('#btnSubmit').click(function() {
    $('#mainForm').submit();
});

function processErrors() {
    console.log('Validation errors');
}

function processResults(rows, status, xhr) {
    console.log('Data sent to the server');
    let resultsTable = `
    <table id="resultsTable" class="table">
    <thead>
        <tr>
            <th scope="col">ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
        </tr>
    </thead>
    <tbody>`;
    for (let i = 0; i < rows.length; i++) {
        resultsTable += `<tr> <td> ${rows[i].id}</td>`;
        resultsTable += `<td>${rows[i].fName}</td>`
        resultsTable += `<td>${rows[i].lName}</td>`
        resultsTable += `<td>${rows[i].email}</td></tr>`
    }
    resultsTable += `
        </tbody>
    </table>`;
    $('#mainForm').hide();
    $(resultsTable).appendTo('#rowTable');
    $('<a href="/">Return</a>').appendTo('#rowTable');
}