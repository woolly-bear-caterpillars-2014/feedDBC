class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.belongs_to :user
      t.string :text
      t.boolean :archive?
      t.boolean :is_anonymous?
    end
  end
end
