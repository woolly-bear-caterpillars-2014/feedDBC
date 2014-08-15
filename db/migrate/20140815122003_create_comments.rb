class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.belongs_to :post
      t.belongs_to :user
      t.string :text
      t.boolean :is_anonymous?
    end
  end
end
