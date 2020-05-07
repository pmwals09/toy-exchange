class AddUpcToToys < ActiveRecord::Migration[5.2]
  def change
    add_column :toys, :upc, :bigint
  end
end
