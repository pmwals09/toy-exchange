class AddLocationDataToExchanges < ActiveRecord::Migration[5.2]
  def change
    add_column :exchanges, :lat, :decimal, precision: 10, scale: 7
    add_column :exchanges, :lng, :decimal, precision: 10, scale: 7
    add_column :exchanges, :location_name, :string
    add_column :exchanges, :address, :string
  end
end
