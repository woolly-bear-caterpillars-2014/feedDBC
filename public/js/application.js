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

        buttonVote = $('button[name=vote]'),
        addCommentForm = $('form[name=add_comment]'),

        container = $('#container'),

        submitButtonId = $('#submit_button'),
        currentUserId = $('#current_user'),
        signupButtonnId = $('#signup_button');


    $('body').on('click', 'button[name=vote]', updateVotes);
    addCommentForm.on('submit', addComments);


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
    buttonSignupForm.on('submit', submitSignup);

    // login ajax
    buttonLoginForm.on('submit', submitLogin);

    // feedback ajax
    buttonSubmitForm.on('submit', submitFeedback);



    /* BELOW IS HELPER FUNCTION LAND!!!
     *
     * Should refactor outside of $(document).ready,
     * but had an issue with understanding scope of the variables
     *
     */

    function updateVotes() {
        event.preventDefault();
        vote = Number($(this).val());
        action = $(this).parent().parent('form[name=post-vote]').attr('action');

        $.ajax(action, {
            method: 'post',
            data: {vote: vote},
            dataType: 'json'
        }).done(function(response) {
            if (response.post_id) {
                span = $("span#post-" + response.post_id + "-vote-sum");
                span.text(Number(span.text()) + vote);
            }
        })
    }

    function addComments () {
        event.preventDefault();
        action = $(this).attr('action');

        $.ajax(action, {
            method: 'post',
            data: $(this).serialize(),
            dataType: 'json'
       }).done(function(response) {
            $('form[name=add_comment] textarea').val('');
            $('form[name=add_comment] input[type="checkbox"]').attr('checked', false);

            var html =
                '<div class="comment">' +
                  response.comment +
                  '<small><div class="author">' +
                    'posted by: ' + response.user +
                  '</div></small>' +
                '</div><br>';

            $(".comment-list").append(html);

            span = $("span#post-" + response.post_id + "-comments-count");
            span.text(response.count);
        })
    }


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
        backgroundFadeIn();

        signup.fadeOut('fast');
        login.fadeIn('fast');
    }


    function signupButtonToggle() {
        backgroundFadeIn();

        signup.fadeIn('fast');
        login.fadeOut('fast');
    }


    function submitButtonToggle() {
        backgroundFadeIn();

        signup.fadeOut('fast');
        login.fadeOut('fast');
        submit.fadeIn('fast');
    }

    function injectHtmlOnLogin(response) {
        html = 
          '<li id="current_user">' +
            '<button type="submit" name="profile">' +
              'Welcome ' + response.username +
            '</button>' +
          '</li>';

        logoutButtonHTML =
          '<li><form name="input" action="/logout" method="get">' +
            '<button type="submit" name="logout">Logout</button>' +
          '</form></li>';

        submit_button =
          '<li id="submit_button">' +
            '<button type="button" name="submit_feedback">' +
              'Submit' +
            '</button>' + 
          '</li>';

        submitButtonId.replaceWith(submit_button);
        currentUserId.replaceWith(html);
        signupButtonnId.replaceWith(logoutButtonHTML);
    }


    function submitLogin() {
        event.preventDefault();

        $.ajax($(this).attr('action'), {
            method: $(this).attr('method'),
            data: $(this).serialize(),
            dataType: 'json',
            success: function(data) {
                login.fadeOut('fast');
                backgroundFadeOut();
            },
            error: function(xhr, status, error) {
                login.effect("shake");
            }
        }).done(function(response) {
            injectHtmlOnLogin(response);
        })
    }


    function submitSignup() {
        event.preventDefault();

        $.ajax($(this).attr('action'), {
            method: $(this).attr('method'),
            data: $(this).serialize(),
            dataType: 'json',
            success: function(data) {
                signup.fadeOut('fast');
                backgroundFadeOut();
            },
            error: function(xhr, status, error) {
                signup.effect("shake");
            }
        }).done(function(response) {
            injectHtmlOnLogin(response);
        })
    }


    function submitFeedback() {
        event.preventDefault();

        $.ajax($(this).attr('action'), {
            method: $(this).attr('method'),
            data: $(this).serialize(),
            dataType: 'json',
            success: function(data) {
                submit.fadeOut('fast');
                backgroundFadeOut();
            },
            error: function(xhr, status, error) {
                submit.effect("shake");
            }
        }).done(function(response) {
            console.log(response);
            number = parseInt($("span.counter:last").text()) + 1;

            var html =
            '<a href="/posts/' + response.post.id + '"><div class="element">' +
              '<span class="counter">' + number + '</span>. ' +
              '<form method="post" action="/posts/' + response.post.id + '/votes" name="post-vote">' +
                '<small>' +
                  '<button type="submit" name="vote" value="1">&#9650;</button>' +
                '</small>' +
                '<small>' +
                  '<button type="submit" name="vote" value="-1">&#9660;</button>' +
                '</small>' +
              '</form>' +
              '<span class>' + response.post.text + '</span>' +
              '<br>' +
                '<small>' +
                  '<span id="post-' + response.post.id + '-vote-sum">' + response.post.vote_sum + '</span> points ' +
                  'by ' + response.user + ' | ' +
                  '0' + ' comments' +
                '</small>' +
              '</div></a>';

            $(".feedback-list").append(html);
            $("html,body").animate({scrollTop:$(document).height()}, 1000);
        })
    }
});



