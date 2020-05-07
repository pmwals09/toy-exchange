class AddDescriptionToToys < ActiveRecord::Migration[5.2]
  def change
    add_column :toys, :description, :text
  end
end
