$('#formUnsubscribe').validate({
    rules: {
        email: {
            required: true,
            email: true
        },
    },
    messages: {
        email: {
            required: 'Please inform your email to unsubscribe.',
            minlength: 'Please inform a valid email.'
        },
    },
    onfocusout: validateFields,
    submitHandler: createAjaxPostUnsubscribe
});

function validateFields(element, event) {
    $(element).valid();
}

function createAjaxPostUnsubscribe() {
    const data = {
        email: $('#email')[0].value
    }
    const post = $.post('http://localhost:3000/unsubscribe', data);
    post.done(processUnsubscribeResult);
    post.fail(processUnsubscribeErrors);
}

$('#btnSubmit').click(function() {
    $('#formUnsubscribe').submit();
});

function processUnsubscribeErrors(error, status, xhr) {
    console.log(error);
    const errorMsg = error.responseJSON.error;
    $(`<div class='alert alert-danger'>${errorMsg}</div>`).appendTo('.container');
}

function processUnsubscribeResult(rows, status, xhr) {
    $('#formUnsubscribe').hide();
    $('#returnDiv').hide();
    $('#formUnsubscribe').trigger('reset');
    let content = "<h2 class='display-4'>Unsubscribed!</h2>";
    content += "<p class='lead'>You are now unsubscribed from the Awesome ML Newsletter.</p>";
    content += "<hr class='my-4'>";
    content += "<p>If you ever change your mind, you can subscribe again!</p>";
    content += "<a href='/' class='btn btn-link'>Subscribe</a>"
    $(`<div class='jumbotron col-8'>${content}</div>`).appendTo('#rowResult');
}