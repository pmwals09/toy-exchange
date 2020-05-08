class Api::V1::ExchangesController < ApplicationController
  def create
    toy_to_update = Toy.find(params[:id])
    new_exchange = Exchange.new(buyer: current_user, toybox: )
    # make a new exchange record
    # update the toybox record that it is not available for sale
  end

  def index
    # render json: Exchange.where()
  end

  def show
    render json: Exchange.find(params[:id])
  end

end
