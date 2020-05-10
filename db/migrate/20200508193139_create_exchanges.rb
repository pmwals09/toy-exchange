class CreateExchanges < ActiveRecord::Migration[5.2]
  def change
    create_table :exchanges do |t|
      t.belongs_to :toybox, null: false
      t.boolean :open_status, null: false, default: true
    end
  end
end
