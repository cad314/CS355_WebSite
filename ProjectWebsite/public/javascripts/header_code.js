//Set session timeout after 10 minutes of inactivity
var IDLE_TIMEOUT = 600; //seconds
var _idleSecondsCounter = 0;

document.onclick = function() {
    _idleSecondsCounter = 0;
};
document.onmousemove = function() {
    _idleSecondsCounter = 0;
};
document.onkeypress = function() {
    _idleSecondsCounter = 0;
};
window.setInterval(CheckIdleTime, 1000);

function CheckIdleTime() {

    if($('#accessLvl').text() == "")
        return;

    if(window.location.pathname !== "/login" && window.location.pathname !== "/logout")
        _idleSecondsCounter++;

    if (_idleSecondsCounter >= IDLE_TIMEOUT) {
        document.location.href = "/logout";
    }
}

function UpdateNavBar()
{
    //Adjust navbar height
    var height = $('section').height();
    $('nav').height(height + 20);

    $('#reports_link,#data_entry_link,#customers_link,#users_link').css('visibility','hidden');//Hide priviledged links
    
    if($('section').hasClass('home'))
    {
        $('#home_link').addClass("active");
        $('#home_link').click(function(e) {
            e.preventDefault();
        });
    }
    else if($('section').hasClass('about'))
    {
        $('#about_link').addClass("active");
        $('#about_link').click(function(e) {
            e.preventDefault();
        });
    }
    else if($('section').hasClass('report'))
    {
        $('#reports_link').addClass("active");
        if(window.location.pathname == "/report")
            $('#reports_link').click(function(e) {
                e.preventDefault();
            });
    }
    else if($('section').hasClass('data'))
    {
        $('#data_entry_link').addClass("active");
    }
    else if($('section').hasClass('customer'))
    {
        $('#customers_link').addClass("active");
    }
    else if($('section').hasClass('admin'))
    {
        $('#admin_link').addClass("active");
    }
    
    if($('#accessLvl').text() == "")
        return;
    
    if($('#accessLvl').text() == "1") //Low access, user can only view reports
    {
        $('#reports_link').css({'visibility' : 'visible'});
    }
    else if($('#accessLvl').text() == "2") //Medium access, user can enter data and add customers
    {
        $('#reports_link,#customers_link,#data_entry_link').css({'visibility' : 'visible'});
    }
    else if($('#accessLvl').text() == "3") //Admin access, user can create, edit and remove other users.
    {
        $('#reports_link,#customers_link,#data_entry_link,#admin_link').css({'visibility' : 'visible'});
    }
}

$(document).ready(function()
{
    window.setTimeout(UpdateNavBar, 100);
});