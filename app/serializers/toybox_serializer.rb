class ToyboxSerializer < ActiveModel::Serializer
  attributes :id, :toy, :for_sale

  belongs_to :toy
  belongs_to :user
end
