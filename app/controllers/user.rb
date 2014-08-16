get "/login" do
  if current_user
    redirect "/"
  else
    erb :"users/login"
  end
end

post "/login" do
  user = User.find_by(username: params[:username])
  user.authenticate(params[:password])
  if user
    session[:user_id] = user.id
    return user.to_json
  else
    @error = "Invalid username/password combination."
    erb :"users/login"
  end
end

get "/logout" do
  session.clear
  redirect "/"
end

# get "/signup" do
#   if current_user
#     redirect "/"
#   else
#     erb :"users/signup"
#   end
# end

post "/signup" do
  p user = User.create(params[:user])
  session[:user_id] = user.id

  p user.to_json

  # if user.save
  #   session[:user_id] = user.id
  # else
  #   erb :"post/index"
  # end

end
