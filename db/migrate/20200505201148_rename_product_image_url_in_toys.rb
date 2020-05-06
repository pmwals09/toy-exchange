class RenameProductImageUrlInToys < ActiveRecord::Migration[5.2]
  def change
    rename_column :toys, :product_image_url, :toy_photo
  end
end
