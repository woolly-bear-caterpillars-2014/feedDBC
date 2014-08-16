post "/posts/:post_id/votes" do
  puts '*************VOTE STUFF**************'
  if current_user
    p params[:vote].to_i
    vote = Vote.where(user_id: session[:user_id], post_id: params[:post_id]).first_or_create()
    p vote
    p vote.value
    unless params[:vote].to_i == vote.value
      vote.update(value: params[:vote].to_i)
      post = Post.find(params[:post_id])
      vote_sum = post.vote_sum += params[:vote].to_i
      post.update(vote_sum: vote_sum)
    else 
      p 'match!'
      return ''
    end
    if vote
      return vote.to_json
    else
      return 'error'
    end
  else
    redirect "/login"
  end
end

put "/posts/:post_id/votes/:vote_id" do
  Vote.find(params[:vote_id]).update(params[:vote])
end

