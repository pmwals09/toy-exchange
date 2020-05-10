class ExchangeSerializer < ActiveModel::Serializer
  attributes :id, :open_status, :toybox

  belongs_to :toybox
  belongs_to :buyer
end
