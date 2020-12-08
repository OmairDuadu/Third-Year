$('#registerForm').validate({
    rules:{
        rfName:             { required: true, minlength: 3, maxlength: 50},
        rlName:             { required: true, minlength: 3, maxlength: 50 },
        rEmail:             { required: true, minlength: 3, maxlength: 50, email:true },
        rphoneNumber:       { required: true, minlength: 10, maxlength: 15},
        rPassword:          { minlength: 8, maxlength: 50},
        rconfirmPassword:   { minlength: 8, maxlength: 50, equalTo: "#rPassword"},
    },
    messages: {
        rfName: { required:'Please inform First Name', minlength:'First name should contain at least 3 characters'  },
        rlName: { required:'Please inform Last Name', minlength:'fast name should contain at least 3 characters'},
        rEmail: { required:'Please inform email', minlength:'Email should contain at least 3 characters', email:'Needs to be valid email'},
        rphoneNumber:{ required:'Please inform valid Phone Number', minlength:'Phone number should contain at least 10 characters'},
        rPassword: { required:'Please inform of Password', minlength:'password should contain at least 8 characters'  },
        rconfirmPassword: { required:'Please confirm Password', minlength:'Message should contain at least 8 characters'} 
    },
    onfocusout: validateFields,
    submitHandler: createAjaxPost
});

function validateFields(element, event){
    $(element).valid();
}

function createAjaxPost(){
    const data = {
        rfName: $('#rfName')[0].value,
        rlName: $('#rlName')[0].value,
        rEmail: $('#rEmail')[0].value,
        rphoneNumber: $('#rphoneNumber')[0].value,
        rPassword: $('#rPassword')[0].value,
        rconfirmPassword: $('#rconfirmPassword')[0].value
    }
    const post = $.post('http://localhost:3000/insertRegister', data);

    post.done(processResults);
    post.fail(processErrors);
}

$('#registerSubmit').click(function(){
    $('#registerForm').submit();
});

function processErrors(){
    console.log('Validation errors');
}

function processResults(rows, status, xhr){
    console.log("Data sent to the server");

    // This is the Id display
    let registerTable = 
    `<table id="registerTable" class="table midd ">
        <tr>
            <th scope="col">ID</th>`
    for (let i = 0 ; i < rows.length; i++){
        registerTable += ` <td> ${rows[i].id}</td> </tr>`;
    }
    registerTable += `</table>`;

    // This is the first name display
    let registeTable = 
    `<table id="registeTable" class="table midd">
        <tr>
            <th scope="col">First Name:</th>`
    for (let i = 0 ; i < rows.length; i++){
        registeTable += ` <td> ${rows[i].rfName}</td> </tr>`;}
    registeTable += `</table>`;

    // This is the last name display display
    let rlTable = 
    `<table id="rlTable" class="table midd">
        <tr>
            <th scope="col">Last Name:</th>  `
    for (let i = 0 ; i < rows.length; i++){
        rlTable += ` <td> ${rows[i].rlName}</td> </tr>`;
    }
    rlTable += `</table>`;

    // This is the email display
    let reTable = 
    `<table id="reTable" class="table midd">
        <tr>
            <th scope="col">Email:</th>  `
    for (let i = 0 ; i < rows.length; i++){
        reTable += ` <td> ${rows[i].rEmail}</td> </tr>`;
    }
    reTable += `</table>`;

    // This is the phone number display
    let rpTable = 
    `<table id="rpTable" class="table midd">
        <tr>
            <th scope="col">Phone Number:</th>  `
    for (let i = 0 ; i < rows.length; i++){
        rpTable += ` <td> ${rows[i].rphoneNumber}</td> </tr>`;
    }
    rpTable += `</table>`;

    // This is the password display
    let passTable = 
    `<table id="passTable" class="table midd">
        <tr>
            <th scope="col">Password:</th>  `
    for (let i = 0 ; i < rows.length; i++){
        passTable += ` <td> ${rows[i].rPassword}</td> </tr>`;
    }
    passTable += `</table>`;
    
    $('#registerForm').hide();
    $(`<div class="login midd">
            <p>Your Registration Details</p>
        </div>` 
        + registerTable + registeTable + rlTable + reTable + rpTable + passTable).appendTo('#regTable');
}

