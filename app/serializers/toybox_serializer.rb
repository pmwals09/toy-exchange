class ToyboxSerializer < ActiveModel::Serializer
  attributes :id, :for_sale, :toy, :user

  belongs_to :toy
  belongs_to :user
end
