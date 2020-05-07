class Api::V1::ToyboxesController < ApplicationController
  def create
    new_toybox = Toybox.new(toy_id: params["toy_id"])
    new_toybox.user = current_user
    if new_toybox.save
      render json: new_toybox
    else
      render json: { errors: new_toybox.errors.full_messages}, status: :unprocessable_entity
    end
  end
end
