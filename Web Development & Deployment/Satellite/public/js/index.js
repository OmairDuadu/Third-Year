$('#contactForm').validate({
    rules:{
        cfName: { required: true, minlength: 3, maxlength: 50},
        clName: { required: true, minlength: 3, maxlength: 50 },
        cEmail: { required: true, minlength: 3, maxlength: 50, email:true },
        cphoneNumber: { required: true, minlength: 10, maxlength: 15},
        cMessage: {required: true, minlength: 3, maxlength: 250},
    },

    messages: {
        cfName: {required:"Please enter a valid First Name", minlength:"First name should contain at least 3 characters"  },

        clName: { required:"Please enter a valid Last Name", minlength:"fast name should contain at least 3 characters"},

        cEmail: { required:"Please enter a valid email", minlength:"Email should contain at least 3 characters", email:"Needs to be valid email"},

        cphoneNumber:{ required:"Please enter a valid Phone Number", minlength:"Phone number should contain at least 10 characters"},

        cMessage: { required:"Please enter a valid Message", minlength:"Message should contain at least 3 characters"  }

        },
    onfocusout: validateFields,
    submitHandler: createAjaxPost

});

function validateFields(element, event){
    $(element).valid();
}

function createAjaxPost(){
    const data = {
        cfName: $('#cfName')[0].value,
        clName: $('#clName')[0].value,
        cEmail: $('#cEmail')[0].value,
        cphoneNumber: $('#cphoneNumber')[0].value,
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
        registeTable += ` <td> ${rows[i].cfName}</td> </tr>`;}
    registeTable += `</table>`;

    // This is the last name display display
    let rlTable = 
    `<table id="rlTable" class="table midd">
        <tr>
            <th scope="col">Last Name:</th>  `
    for (let i = 0 ; i < rows.length; i++){
        rlTable += ` <td> ${rows[i].clName}</td> </tr>`;
    }
    rlTable += `</table>`;

    // This is the email display
    let reTable = 
    `<table id="reTable" class="table midd">
        <tr>
            <th scope="col">Email:</th>  `
    for (let i = 0 ; i < rows.length; i++){
        reTable += ` <td> ${rows[i].cEmail}</td> </tr>`;
    }
    reTable += `</table>`;

    // This is the phone number display
    let rpTable = 
    `<table id="rpTable" class="table midd">
        <tr>
            <th scope="col">Phone Number:</th>  `
    for (let i = 0 ; i < rows.length; i++){
        rpTable += ` <td> ${rows[i].cphoneNumber}</td> </tr>`;
    }
    rpTable += `</table>`;

    // This is the password display
    let passTable = 
    `<table id="passTable" class="table midd">
        <tr>
            <th scope="col">Query:</th>  `
    for (let i = 0 ; i < rows.length; i++){
        passTable += ` <td> ${rows[i].cMessage}</td> </tr>`;
    }
    passTable += `</table>`;
    
    $('#contactForm').hide();
    $(`<div class="login midd">
            <p>Your Query Summary</p>
        </div>` 
        + registerTable + registeTable + rlTable + reTable + rpTable + passTable).appendTo('#rowTable');
    
}