helpers do

  def name
    @user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def voted?(post, vote_direction)
    vote = Vote.find_by(user_id: session[:user_id], post_id: post)
    if vote && vote.value == vote_direction
      p "TRUE"
      return "class='active'"
    else
      p "FALSE"
      return ""
    end
    #   return "class='active'" if voted?(@post.id) && voted?(@post.id).value == 1
    # elsif vote && vote.value == -1
    #   return ""
    # end
  end

end
