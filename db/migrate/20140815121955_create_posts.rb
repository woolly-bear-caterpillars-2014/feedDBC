class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.belongs_to :user
      t.string :text
      t.boolean :archive?
      t.boolean :is_anonymous?
      t.integer :vote_sum, default: 0
    end
  end
end
