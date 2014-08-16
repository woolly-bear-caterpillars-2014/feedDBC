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
10.times do
  Post.create(
    user_id: rand(1..11),
    text: Faker::Lorem.sentence,
    archive?: false,
    is_anonymous?: false
  )
end

# ANONYMOUS POSTS
10.times do
  Post.create(
    user_id: rand(1..11),
    text: Faker::Lorem.sentence,
    archive?: false,
    is_anonymous?: true
  )
end

# ADMIN POST
Post.create(
  user_id: 11,
  text: Faker::Lorem.sentence,
  archive?: false,
  is_anonymous?: false
)

# VOTES
50.times do
  v = rand(-1..1)
  p = rand(1..21)
  q = rand(15..45)
  Vote.create(
    user_id: rand(1..11),
    post_id: p,
    value: v
  )
  po = Post.find(p)
  vote_sum = po.vote_sum += q
  po.update(vote_sum: vote_sum)
end

# COMMENTS
20.times do
  Comment.create(
    post_id: rand(1..21),
    user_id: rand(1..11),
    text: Faker::Lorem.sentence,
    is_anonymous?: false
  )
end

# ANONYMOUS COMMENTS
20.times do
  Comment.create(
    post_id: rand(1..21),
    user_id: rand(1..11),
    text: Faker::Lorem.sentence,
    is_anonymous?: true
  )
end
