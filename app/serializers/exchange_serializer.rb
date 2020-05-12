class ExchangeSerializer < ActiveModel::Serializer
  attributes :id, :open_status, :toybox, :scope

  belongs_to :toybox
  belongs_to :buyer
end
