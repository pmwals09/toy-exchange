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
    if !toybox_to_update.nil?
      toybox_to_update.for_sale = !toybox_to_update.for_sale
      if toybox_to_update.save
        render json: toybox_to_update
      end
    elsif toybox_to_update.nil?
      render json: { errors: "Unable to find record to update" }, status: :unprocessable_entity
    else
      render json: { errors: toybox_to_update.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    toybox_to_delete = Toybox.where(user: current_user, toy_id: params["id"])[0]
    if toybox_to_delete.delete
      render json: toybox_to_delete
    else
      render json: { errors: toybox_to_delete.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
