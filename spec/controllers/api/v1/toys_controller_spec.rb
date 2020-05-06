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

      expect(api_response['toys'][1]['toy_name']).to eq toy2.toy_name
      expect(api_response['toys'][1]['manufacturer_name']).to eq toy2.manufacturer_name
      expect(api_response['toys'][1]['min_age']).to eq toy2.min_age
      expect(api_response['toys'][1]['max_age']).to eq toy2.max_age
    end
  end

  xdescribe "GET#show" do
    xit "returns successful response code and json content" do

    end

    xit "returns correct toy" do

    end
  end

  describe "POST#create" do
    let!(:good_toy_data) { { toy: {
      toy_name: "Good toy",
      manufacturer_name: "Good toy maker",
      min_age: 3,
      max_age: 15,
      toy_photo: fixture_file_upload('test-toy-image.jpg', 'image/jpeg')
    } } }
    let!(:bad_toy_data_blanks) { { toy: {
      toy_name: "",
      manufacturer_name: "Bad toy maker",
      min_age: 3,
      max_age: 15,
      toy_photo: fixture_file_upload('test-toy-image.jpg', 'image/jpeg')
    } } }
    let!(:bad_toy_data_wrong) { { toy: {
      toy_name: "Bad toy",
      manufacturer_name: "Bad toy maker",
      min_age: "three",
      max_age: 15,
      toy_photo: fixture_file_upload('test-toy-image.jpg', 'image/jpeg')
    } } }
    it "adds a new game to the db" do
      before_count = Toy.count
      post :create, params: good_toy_data, format: :json
      after_count = Toy.count

      expect(after_count).to eq(before_count + 1)
    end

    it "returns the new game as json" do
      post :create, params: good_toy_data, format: :json
      api_response = JSON.parse(response.body)

      expect(api_response["toy"].length).to eq 6
      expect(api_response["toy"]["toy_name"]).to eq good_toy_data[:toy][:toy_name]
      expect(api_response["toy"]["manufacturer_name"]).to eq good_toy_data[:toy][:manufacturer_name]
      expect(api_response["toy"]["min_age"]).to eq good_toy_data[:toy][:min_age]
      expect(api_response["toy"]["max_age"]).to eq good_toy_data[:toy][:max_age]
    end

    it "does not add incomplete info to the db" do
      before_count = Toy.count
      post :create, params: bad_toy_data_blanks, format: :json
      after_count = Toy.count

      expect(after_count).to eq before_count
    end

    it "does not add incorrect info to the db" do
      before_count = Toy.count
      post :create, params: bad_toy_data_wrong, format: :json
      after_count = Toy.count

      expect(after_count).to eq before_count
    end

    it "returns validation error json" do
      post :create, params: bad_toy_data_blanks, format: :json
      api_response = JSON.parse(response.body)

      expect(api_response["errors"]).to eq "Toy name can't be blank"
    end
  end
end
