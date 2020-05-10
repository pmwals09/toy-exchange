class AddBuyerToExchanges < ActiveRecord::Migration[5.2]
  def change
    add_reference :exchanges, :buyer, index: true, null: false
  end
end
