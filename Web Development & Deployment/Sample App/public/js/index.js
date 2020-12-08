$(document).ready(function() {
    const post = $.get('http://localhost:3000/retrieveResearchFields');
    post.done(populateSelect);
    post.fail(displayErrorResearchField);
});

function populateSelect(rows, status, xhr) {
    for (let i = 0; i < rows.length; i++) {
        $(`<option value='${rows[i].interest_id}'>${rows[i].interest_name}</option>`).appendTo('#researchField');
    }
}

function displayErrorResearchField() {

}

$('#formSubscribe').validate({
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
            email: true
        },
        researchField: {
            required: true
        }
    },
    messages: {
        fName: {
            required: 'Please inform your first name',
            minlength: 'First name should contain at least 3 chars.',
            maxlength: 'First name should contain at most 50 chars.'
        },
        lName: {
            required: 'Please inform your last name',
            minlength: 'First name should contain at least 3 chars.',
            maxlength: 'First name should contain at most 50 chars.'
        },
        email: {
            required: 'Please inform your email.',
            minlength: 'Please inform a valid email.'
        },
        researchField: {
            required: 'Please select your research field.'
        }
    },
    submitHandler: createAjaxPostSubscribe
});

$('#btnSubmit').click(function() {
    $('#formSubscribe').submit();
});

function createAjaxPostSubscribe() {
    const data = {
        fName: $('#fName')[0].value,
        lName: $('#lName')[0].value,
        email: $('#email')[0].value,
        researchField: $('#researchField')[0].value,
    }
    const post = $.post('http://localhost:3000/insertSubscriber', data);
    post.done(processSubscribeResult);
    post.fail(processSubscribeErrors);
}

function processSubscribeResult(rows, status, xhr) {
    $('#titleRow').hide();
    $('#formSubscribe').hide();
    $('#formSubscribe').trigger('reset');
    $('#rowLinkUnsubscribe').hide();
    let content = "<h2 class='display-4'>Success</h2>";
    content += "<p class='lead'>Thank you for subscribing!</p>";
    content += "<hr class='my-4'>";
    content += "<p>Check out your inbox for exciting M.L. content!</p>";
    content += "<a href='/' class='btn btn-link'>go Back</a>"
    $(`<div class='jumbotron col-8'>${content}</div>`).appendTo('#rowResult');
}

function processSubscribeErrors(error, status, xhr) {
    console.log(error);
    const errorMsg = error.responseJSON.error;
    $(`<div class='alert alert-danger'>${errorMsg}</div>`).appendTo('#rowResult');
}