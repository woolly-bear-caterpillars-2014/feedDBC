$(document).ready(function() {

	$('button[name=vote]').on('click', function(event){
		event.preventDefault();
		vote = Number($(this).val());
		action = $(this).parent().parent('form[name=post-vote]').attr('action');
		$.ajax(action, {
        method: 'post',
        data: {vote: vote},
        dataType: 'json'
      }
    ).done(function(response) {
    	//console.log(response)
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
        dataType: 'json'
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

});
