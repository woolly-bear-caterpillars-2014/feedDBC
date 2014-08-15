get '/posts' do
  @posts = Post.all

  erb :'posts/index'
end

get '/posts/new' do
  # @user = User.find(session[:user_id])
  @user = User.find(2)
  erb :'posts/new'
end

get '/posts/:post_id' do
  @post = Post.find(params[:post_id])

  erb :'posts/show'
end

post '/posts' do
  p params
  @user = User.find(2)
  params[:post][:user_id] = @user.id
  # @user = User.find(session[:user_id])
  p params[:post]
  Post.create(params[:post])

  redirect '/posts'
end
