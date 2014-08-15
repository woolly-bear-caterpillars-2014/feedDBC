get '/posts' do
  @posts = Post.all

  erb :'posts/index'
end

get '/posts/new' do
  @user = current_user
  erb :'posts/new'
end

get '/posts/:post_id' do
  @post = Post.find(params[:post_id])

  erb :'posts/show'
end

post '/posts' do
  params[:post][:user_id] = current_user.id
  Post.create(params[:post])

  redirect '/posts'
end
