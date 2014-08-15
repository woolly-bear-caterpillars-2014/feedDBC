class Post < ActiveRecord::Base
  has_many :comments
  belongs_to :user
  has_many :votes



  def name_type
    if is_anonymous?
      "Anon"
    else
      user.username
    end
  end
end
