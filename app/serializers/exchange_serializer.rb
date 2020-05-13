class ExchangeSerializer < ActiveModel::Serializer
  attributes :id, :open_status, :toybox, :scope, :lat, :lng, :location_name, :address

  belongs_to :toybox
  belongs_to :buyer
end
