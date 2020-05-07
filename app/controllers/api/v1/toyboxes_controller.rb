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

  def update
    toybox_to_update = Toybox.where(user: current_user, toy_id: params["id"])[0]
    toybox_to_update.for_sale = !toybox_to_update.for_sale
    if toybox_to_update.save
      render json: toybox_to_update
    else
      render json: { errors: toybox_to_update.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy

  end
end
