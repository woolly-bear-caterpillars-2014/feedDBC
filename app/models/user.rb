class User < ActiveRecord::Base
  has_many :posts
  has_many :comments
  has_many :votes
  has_secure_password

  validates :username, length: { minimum: 3, message: "Username is too short" }
  validates :email, uniqueness: true, format: { with: /.+@.+\..+/, message: "Email is invalid." }
  validates :password, length: { minimum: 5, message: "Password is too short" }
end
