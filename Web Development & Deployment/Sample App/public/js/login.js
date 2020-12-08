$('#formLogin').validate({
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
    }
});