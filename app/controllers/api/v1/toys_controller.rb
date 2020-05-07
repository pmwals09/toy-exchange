class Api::V1::ToysController < ApplicationController
  def index
    render json: Toy.all
  end

  def show
    render json: Toy.find(params[:id])
  end

  def create
    new_toy = Toy.new(toy_params)
    if new_toy.save
      render json: new_toy
    else
      render json: { errors: new_toy.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end

  def update
    toy_to_update = Toy.find(params[:id])
    if toy_to_update.update!(toy_params)
      render json: toy_to_update
    else
      render json: { errors: toy_to_update.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end

  private

  def toy_params
    params.require(:toy).permit(:toy_name, :manufacturer_name, :min_age, :max_age, :toy_photo, :upc, :description)
  end
end
