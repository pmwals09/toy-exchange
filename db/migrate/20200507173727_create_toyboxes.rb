class CreateToyboxes < ActiveRecord::Migration[5.2]
  def change
    create_table :toyboxes do |t|
      t.belongs_to :user, null: false
      t.belongs_to :toy, null: false
      t.boolean :for_sale, default: false

      t.timestamps null: false
    end
  end
end
