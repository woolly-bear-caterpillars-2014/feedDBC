get '/posts' do
  @posts = Post.order("vote_sum desc")

  erb :'posts/index'
end


post '/posts' do
  params[:post][:user_id] = current_user.id
  post = Post.create(params[:post])
  user = post.is_anonymous? ? 'Anonymous' : current_user.username
  post_return = {user: user, post: post}
  post_return.to_json
end

get '/posts/:post_id' do
  @post = Post.find(params[:post_id])

  erb :'posts/show'
end
