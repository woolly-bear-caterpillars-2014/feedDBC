$(document).ready(function() {

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

    var buttonSignup = $('button[name=signup]'),
        buttonSignupForm = $('form[name=signup]'),
        signup = $('#signupStudent'),

        buttonLogin = $('button[name=login]'),
        buttonLoginForm = $('form[name=login]'),
        login = $('#loginStudent'),

        container = $('#container');


    // enable mouse clicks outside of login id to go back to
    // normal page
    $(login).mouseup(function(){ return false; });
    $(document).on("mouseup", function() {
        $(login).fadeOut('fast');
        $('body').css({"background-color":"#20272D"});
        $('.container').css(
            {"opacity": "1", "pointer-events": "auto"}
        );
    });


    // enable mouse clicks outside of signup id to go back to
    // normal page
    $(signup).mouseup(function(){ return false; });
    $(document).on("mouseup", function() {
        $(signup).fadeOut('fast');
        $('body').css({"background-color":"#20272D"});
        $('.container').css(
            {"opacity": "1", "pointer-events": "auto"}
        );
    });


    // unhide signup button, hide login button
    $(buttonSignup).on('click', function(event) {
        $('body').css({"background-color":"black"});
        $('.container').css(
            {"opacity": "0.5", "pointer-events": "none"}
        );
        $(login).fadeOut('fast');
        $(signup).fadeIn('fast');
    });


    // unhide login button, hide signup button
    $(buttonLogin).on('click', function(event) {
        $('body').css({"background-color":"black"});
        $('.container').css(
            {"opacity": "0.5", "pointer-events": "none"}
        );
        $(signup).fadeOut('fast');
        $(login).fadeIn('fast');
    });



    // signup ajax
    $(buttonSignupForm).on('submit', function(event) {
        event.preventDefault();

        console.log($(this));
        console.log($(this).serialize());

         $.ajax($(this).attr('action'), {
            method: $(this).attr('method'),
            data: $(this).serialize(),
            dataType: 'json',
            success: function(data) {
                $(signup).fadeOut('fast');
                $('body').css({"background-color":"#20272D"});
                $('.container').css(
                    {"opacity": "1", "pointer-events": "auto"}
                );
            }
        }).done(function(response) {
            console.log(response.username);
            html = response.username;
            logoutButtonHTML = '<li><form name="input" action="/logout" method="get">' +
              '<button type="submit" name="logout">logout</button>' +
              '</form></li>';
            submit_buton = "<li><a href='/posts/new'>submit</a></li>";

            $('#submit_buton').replaceWith(submit_buton);
            $('#current_user').replaceWith(html);
            $('#signup_button').replaceWith(logoutButtonHTML);
        })
    })

    // login ajax
    $(buttonLoginForm).on('submit', function(event) {
        event.preventDefault();

        $.ajax($(this).attr('action'), {
            method: $(this).attr('method'),
            data: $(this).serialize(),
            dataType: 'json',
            success: function(data) {
                $(login).fadeOut('fast');
                $('body').css({"background-color":"#20272D"});
                $('.container').css(
                    {"opacity": "1", "pointer-events": "auto"}
                );
            }
        }).done(function(response) {
            console.log(response.username);
            html = "<li>" + response.username + "</li>";
            logoutButtonHTML = '<li><form name="input" action="/logout" method="get">' +
              '<button type="submit" name="logout">logout</button>' +
              '</form></li>';
            submit_buton = "<li><a href='/posts/new'>submit</a></li>";

            $('#submit_buton').replaceWith(submit_buton);
            $('#current_user').replaceWith(html);
            $('#signup_button').replaceWith(logoutButtonHTML);
        })


    });
});

