var updateUser = function() {

    var payload = {
        account_id: $('#account').val(),
        email: $('#email').val(),
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        access: $('#access').val()
    };

    // Next we configure the jQuery ajax call
    $.ajax({
        url: '/admin/one/updateUser',  // url where we want to send the form data
        type: 'GET', // the type of form submission; GET or POST
        contentType: "json",  // the type of data we are sending
        data: payload,  // the actual data we are sending
        complete: function(data) {  // what to do with the response back from the server

            // take the response from the server and add the information between the <div></div> tags
            if(data.responseJSON == null)
                $('#message').html("Error: User account not updated.");
            else
            {
                $('#message').html("User account successfully updated!");
                window.location.pathname = "/admin/all";
            }
        }
    })
};

var deleteUser = function() {

    var payload = {
        account_id: $('#account_id').val()
    };

    // Next we configure the jQuery ajax call
    $.ajax({
        url: '/admin/one/deleteUser',  // url where we want to send the form data
        type: 'GET', // the type of form submission; GET or POST
        contentType: "json",  // the type of data we are sending
        data: payload,  // the actual data we are sending
        complete: function(data) {  // what to do with the response back from the server

            // take the response from the server and add the information between the <div></div> tags
            if(data.responseJSON == null)
                $('#message').html("Error: User account not deleted.");
            else
            {
                $('#message').html("");
                window.location.pathname = "/admin/allUsers";
            }
        }
    })
};

$(document).ready(function() {

    // We are overriding the click function of the button, to run the code we specify.
    $('#update').click(function(e) {
        // When ddBtn is clicked this console log statement logs to your browser's console log not Node.js in Webstorm
        console.log('update clicked!');
        // this prevents the form from being submitted using the non-ajax method
        e.preventDefault();
        // runs the ajax function defined above.
        updateUser();
    });

    // We are overriding the click function of the button, to run the code we specify.
    $('#delete').click(function(e) {
        // When ddBtn is clicked this console log statement logs to your browser's console log not Node.js in Webstorm
        console.log('delete clicked!');
        // this prevents the form from being submitted using the non-ajax method
        e.preventDefault();
        // runs the ajax function defined above.
        deleteUser();
    });
});