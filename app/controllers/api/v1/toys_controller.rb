class Api::V1::ToysController < ApplicationController
  def index
    render json: Toy.all
  end
end
