class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.belongs_to :post
      t.string :text
      t.integer :value
      t.boolean :is_anonymous?
    end
  end
end
