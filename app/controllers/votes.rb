post "/posts/:post_id/votes" do
  if current_user
    vote = Vote.where(user_id: session[:user_id], post_id: params[:post_id]).first_or_create(value: params[:vote])
    post = Post.find(params[:post_id])
    vote_sum = post.vote_sum += params[:value].to_i
    post.update(vote_sum: vote_sum)
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

