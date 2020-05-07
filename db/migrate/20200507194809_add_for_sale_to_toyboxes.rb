class AddForSaleToToyboxes < ActiveRecord::Migration[5.2]
  def change
    add_column :toyboxes, :for_sale, :boolean, default: false
  end
end
