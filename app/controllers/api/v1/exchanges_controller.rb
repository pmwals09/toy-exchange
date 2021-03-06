require 'faraday'

class Api::V1::ExchangesController < ApplicationController
  before_action :validate_user, except: [:create]

  def create
    new_exchange = Exchange.new(buyer: current_user, toybox_id: params[:toybox_id])
    new_exchange.toybox.for_sale = false
    if new_exchange.save
      current_user.send_message(
        [new_exchange, Toybox.find(params[:toybox_id]).user],
        "Let's make a deal!",
        new_exchange.toybox_id
      )
      render json: new_exchange
    else
      render json: { errors: new_exchange.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    render json: {
      exchange: serialized_data(Exchange.find(params[:id]), ExchangeSerializer),
      messages: Exchange.find(params[:id]).mailbox.inbox[0].messages.order(created_at: :desc)
    }
  end

  def search
    places_query = params[:query].gsub(' ','%20')
    g_key = "AIzaSyAx4lk-3qP0pWqzMmE-91Mhx5jOD9c0Coc"
    response = Faraday.get "https://maps.googleapis.com/maps/api/place/textsearch/json?query=#{places_query}&key=#{g_key}"
    parsed_response = JSON.parse(response.body)
    places_results = parsed_response["results"]

    render json: {results: places_results}
  end

  def update
    exchange_to_update = Exchange.find(params[:id])
    if exchange_to_update.update(
      lat: params[:coords][:lat],
      lng: params[:coords][:lng],
      location_name: params[:name],
      address: params[:formatted_address]
    )
      render json: exchange_to_update
    else
      render json: { errors: exchange_to_update.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end

  def destroy
    exchange_to_remove = Exchange.find(params[:id])
    if exchange_to_remove.delete
      render json: exchange_to_remove
    else
      render json: { errors: exchange_to_remove.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def serialized_data(data, serializer)
    ActiveModelSerializers::SerializableResource.new(data, each_serializer: serializer, scope: current_user)
  end

  def validate_user
    exchange = Exchange.find(params[:id])
    raise ActionController::RoutingError.new("Not Found") unless current_user == exchange.buyer || current_user == exchange.toybox.user || current_user.admin?
  end
end
