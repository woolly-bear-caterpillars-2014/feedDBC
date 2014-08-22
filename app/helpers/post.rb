helpers do

  def name
    @user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def voted?(post, vote_direction)
    vote = Vote.find_by(user_id: session[:user_id], post_id: post)
    if vote && vote.value == vote_direction
      return "class='active'"
    else
      return ""
    end
  end

end
