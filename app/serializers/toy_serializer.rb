class ToySerializer < ActiveModel::Serializer
  attributes :id, :toy_name, :manufacturer_name, :min_age, :max_age, :toy_photo, :upc, :description
end
