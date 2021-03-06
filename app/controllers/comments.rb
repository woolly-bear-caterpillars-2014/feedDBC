post "/posts/:post_id/comments" do
  if current_user
    comments_hash = params[:comment].merge(user_id: session[:user_id], post_id: params[:post_id])
    comment = Comment.create(comments_hash)
    comment_return = {}
    user = comment.is_anonymous? ? 'Anonymous' : current_user.username
    comment_return = {comment: comment.text, user: user, post_id: params[:post_id], count: Post.find(params[:post_id]).comments.count}
    if comment
      return comment_return.to_json
    else
      return ''
    end
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

