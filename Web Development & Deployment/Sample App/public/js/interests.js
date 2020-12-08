$(document).ready(function() {
    const post = $.get('http://localhost:3000/retrieveResearchFields');
    console.log('Doc ready');
    post.done(buildInterestsTable);
    post.fail(displayErrorResearchField);
});

$('#interestName').keydown(function() {
    const data = {
        interestName: $('#interestName')[0].value
    };
    const post = $.post('http://localhost:3000/retrieveSimilarResearchFields', data);

    $('#resultsTable').remove();
    post.done(processFilter);
    post.fail(processFilterError);
});

function processFilter(rows, status, xhr) {
    console.log(rows);
    console.log(rows.length);
    buildInterestsTable(rows, status, xhr);
}

function processFilterError(response, status, xhr) {
    processUserErrors(response, status, xhr);
}

function buildInterestsTable(rows, status, xhr) {
    let resultsTable = `
    <table id="resultsTable" class="table">
    <thead>
        <tr>
            <th scope="col">ID</th>
            <th scope="col">Research Field</th>
            <th scope="col"></th>
            <th scope="col"></th>
        </tr>
    </thead>
    <tbody id='tableBody'>
    </tbody>
    </table>`;
    $(resultsTable).appendTo('#colTable');
    for (let i = 0; i < rows.length; i++) {
        const trId = `tr${rows[i].interest_id}`;
        $(`<tr id='${trId}'></tr>`).appendTo('#tableBody');
        $(`<td> ${rows[i].interest_id}</td>`).appendTo(`#${trId}`);
        $(`<td>${rows[i].interest_name}</td>`).appendTo(`#${trId}`);
        $(`<td><a id='update${trId}' class='btn btn-link'>Update</a></td>`).appendTo(`#${trId}`);
        $(`<td><a id='delete${trId}' class='btn btn-link'>Delete</a></td>`).appendTo(`#${trId}`);

        $(`#update${trId}`).click(updateUsersForm);
        $(`#delete${trId}`).click(deleteInterest);
    }
}

function updateUsersForm() {
    const element = this.parentElement.parentElement;
    $('#clickedId').text(element.children[0].innerText);
    $('#interestName').val(element.children[1].innerText);
}

function deleteInterest() {
    const element = this.parentElement.parentElement;
    const data = {
        interestId: element.children[0].innerText,
    }
    const post = $.post('http://localhost:3000/deleteInterest', data);
    post.done(processInterestSuccess);
    post.fail(processUserErrors);
}

function displayErrorResearchField(response, status, xhr) {
    console.log(response);
    const errors = response.responseJSON.errors;
    for (let i = 0; i < errors.length; i++) {
        $(`<div>${JSON.stringify(errors[i])}</div>`).appendTo('.container');
    }
}

$("#formInterest").validate({
    rules: {
        interestName: {
            required: true,
            minlength: 3,
            maxlength: 50
        }
    },
    messages: {
        interestName: {
            required: 'Please inform the research field name',
            minlength: 'Research field should contain at least 3 chars.',
            maxlength: 'Research fieldshould contain at most 50 chars.'
        },
    },
    submitHandler: createAjaxPostInterest
});


$('#btnSubmit').click(function() {
    $('#formInterest').submit();
});

function createAjaxPostInterest() {
    const clickedIdtext = $('#clickedId').text();
    if (clickedIdtext == '-1' || clickedIdtext == '') {
        console.log('new interest');
        createAjaxPostNewInterest();
    } else {
        console.log('update interest');
        createAjaxPostUpdateInterest();
    }
}

function createAjaxPostNewInterest() {
    const data = {
        interestName: $('#interestName')[0].value,
    }
    const post = $.post('http://localhost:3000/insertInterest', data);
    post.done(processInterestSuccess);
    post.fail(processUserErrors);
}

function createAjaxPostUpdateInterest() {
    const data = {
        interestId: $('#clickedId').text(),
        interestName: $('#interestName')[0].value,
    }
    const post = $.post('http://localhost:3000/updateInterest', data);
    post.done(processInterestSuccess);
    post.fail(processUserErrors);
}

function processInterestSuccess(rows, status, xhr) {
    $('#resultsTable').remove();
    $('#formInterest').trigger('reset');
    $('#clickedId').text('-1');
    buildInterestsTable(rows, status, xhr);
}

function processUserErrors(error, status, xhr) {
    console.log(error);
    const errorMsg = error.responseJSON.error;
    $(`<div class='alert alert-danger'>${errorMsg}</div>`).appendTo('.container');
}

$('#btnClear').click(function() {
    location.reload();
});