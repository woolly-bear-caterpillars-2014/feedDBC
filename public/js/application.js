$(document).ready(function() {

	$('button[name=vote]').on('click', function(event){
		event.preventDefault();
		vote = Number($(this).val());
		action = $(this).parent().parent('form[name=post-vote]').attr('action');
		console.log(action);
		$.ajax(action, {
        method: 'post',
        data: {vote: vote},
        dataType: 'json'
      }
    ).done(function(response) {
    	if (response.post_id) {
	    	span = $("span#post-" + response.post_id + "-vote-sum");
	    	span.text(Number(span.text()) + vote);
    	}
    })
	})

});
