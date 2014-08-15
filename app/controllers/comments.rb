post "/posts/:post_id/comments" do
  comment = Comment.create(params[:comment])
  if comment
    return comment.to_json
  else
    return 'error'
  end
end

put "/posts/:post_id/comments/:comment_id" do
  Comment.find(params[:comment_id]).update(params[:comment])
end

delete "/posts/:post_id/comments/:comment_id" do
  Comment.find(params[:comment_id]).destroy
end

