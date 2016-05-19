var loginUser = function() {

    var payload = {
        email: $('#email').val(),
        password: $('#password').val()
    };

    // Next we configure the jQuery ajax call
    $.ajax({
        url: '/authenticate',  // url where we want to send the form data
        type: 'GET', // the type of form submission; GET or POST
        contentType: "json",  // the type of data we are sending
        data: payload,  // the actual data we are sending
        complete: function(data) {  // what to do with the response back from the server

            // take the response from the server and add the information between the <div></div> tags
            if(data.responseJSON == null)
                $('#message').html("User account not found. Try again.");
            else
            {
                $('#message').html("");
                window.location.pathname = "/";
            }
        }
    })
};

var createUser = function() {

    var payload = {
        first: $('#firstName').val(),
        last: $('#lastName').val(),
        email: $('#emailAddress').val(),
        password1: $('#password1').val(),
        password2: $('#password2').val()
    };

    if(payload.first == '' || payload.last == '' || payload.email == '')
    {
        $('#message2').html("Some fields on your form are empty.");
        return;
    }

    if(payload.password1 !== payload.password2)
    {
        $('#message2').html("Your passwords don't match.");
        return;
    }

    // Next we configure the jQuery ajax call
    $.ajax({
        url: '/signup',  // url where we want to send the form data
        type: 'GET', // the type of form submission; GET or POST
        contentType: "json",  // the type of data we are sending
        data: payload,  // the actual data we are sending
        complete: function(data) {  // what to do with the response back from the server

            // take the response from the server and add the information between the <div></div> tags
            if(data.responseJSON == null)
                $('#message2').html("Error occured trying to create the account.");
            else
            {
                $('#message2').html("");
                window.location.pathname = "/";
            }
        }
    })
};

var showSignup = function () {
    $('#signin-form').addClass('hidden');
    $('#signup-form').removeClass('hidden');
};

$(document).ready(function() {

    // We are overriding the click function of the button, to run the code we specify.
    $('#signin').click(function(e) {
        // When ddBtn is clicked this console log statement logs to your browser's console log not Node.js in Webstorm
        console.log('login clicked!');
        // this prevents the form from being submitted using the non-ajax method
        e.preventDefault();
        // runs the ajax function defined above.
        loginUser();
    });

    // We are overriding the click function of the button, to run the code we specify.
    $('#signup').click(function(e) {
        // When ddBtn is clicked this console log statement logs to your browser's console log not Node.js in Webstorm
        console.log('sign up clicked!');
        // this prevents the form from being submitted using the non-ajax method
        e.preventDefault();
        // runs the ajax function defined above.
        
        //Hides sign-in form, shows sign-up form
        showSignup();
    });

    // We are overriding the click function of the button, to run the code we specify.
    $('#create').click(function(e) {
        // When ddBtn is clicked this console log statement logs to your browser's console log not Node.js in Webstorm
        console.log('Created User!');
        // this prevents the form from being submitted using the non-ajax method
        e.preventDefault();
        // runs the ajax function defined above.

        //Hides sign-in form, shows sign-up form
        createUser();
    });
});