get '/posts'
  @posts = Post.all

  erb :'posts/index'
end

get '/posts/new'
  @user = User.find(session[:user_id])

  erb :'posts/new'
end

get '/posts/:post_id'
  @post = Post.find(params[:post_id])

  erb :'posts/show'
end

# put '/posts/:post_id'
#   @post = Post.find(params[:post_id])
#   @post.update(params[:post])

#   redirect '/posts'
# end

post '/posts'
  Post.create(params[:post])

  redirect '/posts'
end
