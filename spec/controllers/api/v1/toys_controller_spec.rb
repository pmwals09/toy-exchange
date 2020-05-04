require 'rails_helper'

RSpec.describe Api::V1::ToysController, type: :controller do
  describe "GET#index" do
    let!(:toy1) { FactoryBot.create(:toy)}
    let!(:toy2) { FactoryBot.create(:toy)}

    it "returns successful response code and json content" do
      get :index

      expect(response.status).to eq 200
      expect(response.content_type).to eq 'application/json'
    end

    it "returns all games in the db" do
      get :index
      api_response = JSON.parse(response.body)

      expect(api_response['toys'].length).to eq 2

      expect(api_response['toys'][0]['toy_name']).to eq toy1.toy_name
      expect(api_response['toys'][0]['manufacturer_name']).to eq toy1.manufacturer_name
      expect(api_response['toys'][0]['min_age']).to eq toy1.min_age
      expect(api_response['toys'][0]['max_age']).to eq toy1.max_age
      expect(api_response['toys'][0]['product_image_url']).to eq toy1.product_image_url

      expect(api_response['toys'][1]['toy_name']).to eq toy2.toy_name
      expect(api_response['toys'][1]['manufacturer_name']).to eq toy2.manufacturer_name
      expect(api_response['toys'][1]['min_age']).to eq toy2.min_age
      expect(api_response['toys'][1]['max_age']).to eq toy2.max_age
      expect(api_response['toys'][1]['product_image_url']).to eq toy2.product_image_url

    end
  end
end
