class ExchangeSerializer < ActiveModel::Serializer
  attributes :id, :open_status, :toybox, :scope #, :current_user

  belongs_to :toybox
  belongs_to :buyer

  # private
  #
  # def current_user
  #   # scope and don't show everything
  # end
end
