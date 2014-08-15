get '/posts' do
  @posts = Post.all

  erb :'posts/index'
end

get '/posts/new' do
  @user = User.find(session[:user_id])

  erb :'posts/new'
end

get '/posts/:post_id' do
  @post = Post.find(params[:post_id])

  erb :'posts/show'
end

post '/posts' do
  Post.create(params[:post])

  redirect '/posts'
end
