class User < ActiveRecord::Base
  has_many :posts
  has_many :comments
  has_many :votes
  has_secure_password

  validate :username, length: { minimum: 3, message: "Username is too short" }
  validate :email, uniqueness: true, format: { with: /.+@.+\..+/, message: "Email is invalid." }
  validate :password, length: { minimum: 5, message: "Password is too short" }
end
