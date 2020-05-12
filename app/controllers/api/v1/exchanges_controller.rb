class Api::V1::ExchangesController < ApplicationController
  def create
    new_exchange = Exchange.new(buyer: current_user, toybox_id: params[:toybox_id])
    new_exchange.toybox.for_sale = false
    if new_exchange.save
      render json: new_exchange
    else
      render json: { errors: new_exchange.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
    render json: Exchange.where(buyer_id: params[:user_id]).or(Exchange.joins(Toybox.joins(user_id: params[:user_id])))
  end

  def show
    render json: {
      exchange: serialized_data(Exchange.find(params[:id]), ExchangeSerializer),
      messages: Exchange.find(params[:id]).mailbox.inbox[0].messages.order(created_at: :desc),
    }
  end

  private

  def serialized_data(data, serializer)
    ActiveModelSerializers::SerializableResource.new(data, each_serializer: serializer, scope: current_user)
  end
end
