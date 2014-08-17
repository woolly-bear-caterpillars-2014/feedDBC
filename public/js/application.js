$(document).ready(function() {
    var buttonSignup = $('button[name=signup]'),
        buttonSignupForm = $('form[name=signup]'),
        signup = $('#signupStudent'),

        buttonLogin = $('button[name=login]'),
        buttonLoginForm = $('form[name=login]'),
        login = $('#loginStudent'),

        buttonSubmit = $('button[name=submit_feedback]'),
        buttonSubmitForm = $('form[name=new_post]'),
        submit = $('#submitFeedback'),

        container = $('#container');

    $('button[name=vote]').on('click', function(event) {
        event.preventDefault();
        vote = Number($(this).val());
        action = $(this).parent().parent('form[name=post-vote]').attr('action');
        $.ajax(action, {
            method: 'post',
            data: {vote: vote},
            dataType: 'json'
        }).done(function(response) {
            console.log(response)
            if (response.post_id) {
                span = $("span#post-" + response.post_id + "-vote-sum");
                span.text(Number(span.text()) + vote);
            }
        })
    })

    $('form[name=add_comment]').on('submit', function(event){
        event.preventDefault();
        action = $(this).attr('action');
        console.log(action);
        $.ajax(action, {
        method: 'post',
        data: $(this).serialize(),
        dataType: $(this).serialize(),
      }
    ).done(function(response) {
        $('form[name=add_comment] textarea').val('');
        $('form[name=add_comment] input[type="checkbox"]').attr('checked', false);
        var html = '<div class="comment">' + response.comment +
                            '<small><div class="author">posted by: '+ response.user +
                            '</div></small></div>';
            $(".comment-list").append(html);
        })
    })



    // enable the user to exit the hidden submit,
    // signup, and login divs by clicking outside
    // div.  It also deactivates the background
    exitHiddenDiv(submit);
    exitHiddenDiv(signup);
    exitHiddenDiv(login);


    // click logic for signup buttop
    buttonSignup.on('click', signupButtonToggle);

    // click logic for login button
    buttonLogin.on('click', loginButtonToggle);

    // click logic for submit button
    $('body').on('click', 'button[name=submit_feedback]', submitButtonToggle);

    // signup ajax
    buttonSignupForm.on('submit', submitSignup)

    // login ajax
    buttonLoginForm.on('submit', submitLogin);

    // feedback ajax
    buttonSubmitForm.on('submit', submitFeedback);
});


function backgroundFadeIn() {
    $('body').css({"background-color":"black"});
    $('.container').css(
        {"opacity": "0.5", "pointer-events": "none"}
    );
}

function backgroundFadeOut() {
    $('body').css({"background-color":"#20272D"});
    $('.container').css(
        {"opacity": "1", "pointer-events": "auto"}
    );
}

function exitHiddenDiv(element) {
    $(element).mouseup(function(){ return false; });

    $(document).on("mouseup", function() {
        $(element).fadeOut('fast');
        backgroundFadeOut();
    });
}



function loginButtonToggle() {
    var login = $('#loginStudent'),
        signup = $('#signupStudent');

    backgroundFadeIn();

    $(signup).fadeOut('fast');
    $(login).fadeIn('fast');
}


function signupButtonToggle() {
    var login = $('#loginStudent'),
        signup = $('#signupStudent');

    backgroundFadeIn();
    $(signup).fadeIn('fast');
    $(login).fadeOut('fast');
}


function submitButtonToggle() {
    var login = $('#loginStudent'),
        signup = $('#signupStudent'),
        submit = $('#submitFeedback');

    backgroundFadeIn();
    $(signup).fadeOut('fast');
    $(login).fadeOut('fast');
    $(submit).fadeIn('fast');  
}


function submitLogin() {
    var buttonLogin = $('button[name=login]'),
        buttonLoginForm = $('form[name=login]'),
        login = $('#loginStudent');

    event.preventDefault();

    $.ajax($(this).attr('action'), {
        method: $(this).attr('method'),
        data: $(this).serialize(),
        dataType: 'json',
        success: function(data) {
            $(login).fadeOut('fast');
            backgroundFadeOut();
        },
        error: function(xhr, status, error) {
            $(login).effect("shake");
        }
    }).done(function(response) {
        html = '<li id="current_user">' +
          '<button type="submit" name="profile">Welcome ' + response.username + '</button>' +
        '</li>';

        logoutButtonHTML = '<li><form name="input" action="/logout" method="get">' +
          '<button type="submit" name="logout">Logout</button>' +
          '</form></li>';
        submit_button = '<li id="submit_button"><button type="submit" name="submit_feedback">Submit</button></li>';


        $('#submit_button').replaceWith(submit_button);
        $('#current_user').replaceWith(html);
        $('#signup_button').replaceWith(logoutButtonHTML);
    })
}


function submitSignup() {
    var buttonSignup = $('button[name=signup]'),
        buttonSignupForm = $('form[name=signup]'),
        signup = $('#signupStudent');

    event.preventDefault();

    $.ajax($(this).attr('action'), {
        method: $(this).attr('method'),
        data: $(this).serialize(),
        dataType: 'json',
        success: function(data) {
            $(signup).fadeOut('fast');
            backgroundFadeOut();
        },
        error: function(xhr, status, error) {
            $(signup).effect("shake");
        }
    }).done(function(response) {
        html = '<li id="current_user">' +
          '<button type="submit" name="profile">Welcome ' + response.username + '</button>' +
        '</li>';

        logoutButtonHTML = '<li><form name="input" action="/logout" method="get">' +
          '<button type="submit" name="logout">Logout</button>' +
          '</form></li>';
        submit_button = '<li id="submit_button"><button type="button" name="submit_feedback">Submit</button></li>';

        $('#submit_button').replaceWith(submit_button);
        $('#current_user').replaceWith(html);
        $('#signup_button').replaceWith(logoutButtonHTML);
    })
}


function submitFeedback() {
    var buttonSubmit = $('button[name=submit_feedback]'),
        buttonSubmitForm = $('form[name=new_post]'),
        submit = $('#submitFeedback');

    event.preventDefault();

    $.ajax($(this).attr('action'), {
        method: $(this).attr('method'),
        data: $(this).serialize(),
        dataType: 'json',
        success: function(data) {
            $(submit).fadeOut('fast');
            backgroundFadeOut();
        },
        error: function(xhr, status, error) {
            $(submit).effect("shake");
        }
    }).done(function(response) {
        console.log(response);
    })
}




