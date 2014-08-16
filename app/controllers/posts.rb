get '/posts' do
  @posts = Post.order("vote_sum desc")

  erb :'posts/index'
end

get '/posts/new' do
  @user = current_user

  if current_user
    erb :'posts/new'
  else
    redirect '/login'
  end
end

post '/posts' do
  params[:post][:user_id] = current_user.id
  Post.create(params[:post])

  redirect '/posts'
end

get '/posts/:post_id' do
  @post = Post.find(params[:post_id])

  erb :'posts/show'
end
