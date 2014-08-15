require 'faker'

# USERS
10.times do
  User.create(
    username: Faker::Internet.user_name,
    password: Faker::Internet.password,
    email: Faker::Internet.email,
    is_admin?: false
  )
end

# ADMIN
User.create(
  username: Faker::Internet.user_name,
  password: Faker::Internet.password,
  email: Faker::Internet.email,
  is_admin?: true
)

# POSTS
20.times do
  Post.create(
    user_id: rand(1..11)
    text: Faker::Lorem.sentence
    archive?:
    is_anonymous?: false
  )
end

# ADMIN POST
Post.create(
  user_id: 11
  text:
  archive?:
  is_anonymous?:
)

# VOTES
20.times do
  Vote.create(
    user_id: rand(1..11),
    post_id: rand(1..21),
    value: rand(-1..1)
  )
end

# COMMENTS
40.times do
  Comment.create(
    post_id: rand(1..21)
    text:
    value:
    is_anonymous?:
  )
end
