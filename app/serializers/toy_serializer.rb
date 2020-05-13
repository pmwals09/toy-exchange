class ToySerializer < ActiveModel::Serializer
  attributes :id, :toy_name, :manufacturer_name, :min_age, :max_age, :toy_photo, :upc, :description, :current_user
  has_many :toyboxes

  def current_user
    scope
  end
end
