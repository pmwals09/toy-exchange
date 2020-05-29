class Api::V1::UsersController < ApplicationController
  before_action :validate_user

  def show
    exchanges = Exchange.where(buyer_id: params[:id]).or(Exchange.where(toybox: Toybox.where(user_id: params[:id])))
    toyboxes = Toybox.where(user_id: params[:id])
    user = User.find(params[:id])

    render json: {
      user: serialized_data(user, UserSerializer),
      toyboxes: serialized_data(toyboxes, ToyboxSerializer),
      exchanges: serialized_data(exchanges, ExchangeSerializer)
    }
  end

  private

  def serialized_data(data, serializer)
    ActiveModelSerializers::SerializableResource.new(data, each_serializer: serializer, scope: current_user)
  end

  def validate_user
    raise ActionController::RoutingError.new("Not Found") unless current_user.id.to_s == params[:id] || current_user.admin?
  end
end
