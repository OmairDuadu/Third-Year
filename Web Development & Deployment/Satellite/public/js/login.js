$('#contactForm').validate({
    rules:{
        cEmail: { required: true, minlength: 3, maxlength: 50, email:true },    
        cMessage: {required: true, minlength: 3, maxlength: 250},
    },
    messages: {     
        cEmail: { required:'Please inform email', minlength:'Email should contain at least 3 characters', email:'Needs to be valid email'},
        cMessage: { required:'Please inform of Message', minlength:'Message should contain at least 3 characters'  }
    },
    onfocusout: validateFields,
    submitHandler: createAjaxPost
});

function validateFields(element, event){
    $(element).valid();
}

function createAjaxPost(){
    const data = {
        cEmail: $('#cEmail')[0].value,
        cMessage: $('#cMessage')[0].value
    }
    const post = $.post('http://localhost:3000/insertContact', data);

    post.done(processResults);
    post.fail(processErrors);
}

$('#btnSubmit').click(function(){
    $('#contactForm').submit();
});

function processErrors(){
    console.log('Validation errors');
}

function processResults(rows, status, xhr){
    console.log("Data sent to the server");
    let resultsTable = 
    `<table id="resultsTable" class="table">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Message</th>
            </tr>
        </thead>
    <tbody>`;
    for (let i = 0 ; i < rows.length; i++){
        resultsTable += `<td> ${rows[i].cEmail}</td></tr>`;
        resultsTable += `<td> ${rows[i].cMessage}</td></tr>`
    }
    resultsTable += `
        </tbody>
    </table>`;
    $('#contactForm').hide();
    $(resultsTable).appendTo('#rowTable');
    $(`<a href="/">Return</a>`);
}