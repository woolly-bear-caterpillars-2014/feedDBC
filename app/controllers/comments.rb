post "/posts/:post_id/comments" do
  if current_user
    comments_hash = params[:comment].merge(user_id: session[:user_id], post_id: params[:post_id])
    p comments_hash
    comment = Comment.create(comments_hash)
    p comment
    # if comment
    #   return comment.to_json
    # else
    #   return 'error'
    # end
  else
    redirect "/login"
  end
end

put "/posts/:post_id/comments/:comment_id" do
  Comment.find(params[:comment_id]).update(params[:comment])
end

delete "/posts/:post_id/comments/:comment_id" do
  Comment.find(params[:comment_id]).destroy
end

