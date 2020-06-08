class Api::V1::ToysController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :validate_user, except: [:index, :show]

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
    norm_nulls
    toy_to_update = Toy.find(params[:id])
    params_to_update = params["toy"]["toy_photo"] == "[object Object]" ? edit_params : toy_params

    if toy_to_update.update(params_to_update)
      render json: toy_to_update
    else
      render json: { errors: toy_to_update.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end

  private

  def toy_params
    params.require(:toy).permit(:toy_name, :manufacturer_name, :min_age, :max_age, :toy_photo, :upc, :description)
  end

  def edit_params
    params.require(:toy).permit(:toy_name, :manufacturer_name, :min_age, :max_age, :upc, :description)
  end

  def validate_user
    raise ActionController::RoutingError.new("Not Found") unless user_signed_in? || current_user.admin?
  end

  def norm_nulls
    params["toy"].each do |k, v|
      if v == "null"
        params["toy"][k] = ""
      end
    end
  end
end
