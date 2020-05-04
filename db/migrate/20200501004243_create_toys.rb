class CreateToys < ActiveRecord::Migration[5.2]
  def change
    create_table :toys do |t|
      t.string :toy_name, null: false
      t.string :manufacturer_name, null: false
      t.integer :min_age
      t.integer :max_age
      t.string :product_image_url

      t.timestamps null: false
    end
  end
end
