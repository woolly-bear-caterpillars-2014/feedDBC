helpers do

  def name
    @user ||= User.find(session[:user_id]) if session[:user_id]
  end

end
