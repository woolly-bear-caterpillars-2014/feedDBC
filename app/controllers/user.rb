get "/login" do
  erb :"users/login"
end

post "/login" do
  user = User.find_by(username: params[:username])
  user.authenticate(params[:password])
  if user
    session[:user_id] = user.id
    redirect "/"
  else
    @error = "Invalid username/password combination."
    erb :"users/login"
  end
end

delete "/logout" do
  session.clear
  redirect "/"
end

get "/signup" do
  erb :"users/signup"
end

post "/signup" do
  @user = User.new(params[:user])
  if @user.save
    session[:user_id] = @user.id
    redirect "/"
  else
    erb :"users/sign_up"
  end
end



