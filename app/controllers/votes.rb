post "/posts/:post_id/votes" do
  vote = Vote.where(user_id: session[:user_id], post_id: params[:post_id]).first_or_create(value: params[:vote])
  if vote
    return vote.to_json
  else
    return 'error'
  end
end

put "/posts/:post_id/votes/:vote_id" do
  Vote.find(params[:vote_id]).update(params[:vote])
end

