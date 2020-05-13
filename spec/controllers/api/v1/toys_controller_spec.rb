require 'rails_helper'

RSpec.describe Api::V1::ToysController, type: :controller do
  let!(:toy1) { FactoryBot.create(:toy) }
  let!(:toy2) { FactoryBot.create(:toy) }
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
  let!(:user1) { FactoryBot.create(:user) }

  describe "GET#index" do

    it "returns successful response code and json content" do
      get :index

      expect(response.status).to eq 200
      expect(response.content_type).to eq 'application/json'
    end

    it "returns all toys in the db" do
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

  describe "GET#show" do
    it "returns successful response code and json content" do
      get :show, params: { id: toy1.id }

      expect(response.status).to eq 200
      expect(response.content_type).to eq 'application/json'
    end

    it "returns correct toy" do
      get :show, params: { id: toy1.id }
      api_response = JSON.parse(response.body)

      expect(api_response['toy']['id']).to eq toy1.id
      expect(api_response['toy']['id']).to_not eq toy2.id
    end
  end

  describe "POST#create" do
    it "adds a new toy to the db" do
      sign_in user1
      before_count = Toy.count
      post :create, params: good_toy_data, format: :json
      after_count = Toy.count

      expect(after_count).to eq(before_count + 1)
    end

    it "returns the new toy as json" do
      sign_in user1
      post :create, params: good_toy_data, format: :json
      api_response = JSON.parse(response.body)

      expect(api_response["toy"].length).to eq 10
      expect(api_response["toy"]["toy_name"]).to eq good_toy_data[:toy][:toy_name]
      expect(api_response["toy"]["manufacturer_name"]).to eq good_toy_data[:toy][:manufacturer_name]
      expect(api_response["toy"]["min_age"]).to eq good_toy_data[:toy][:min_age]
      expect(api_response["toy"]["max_age"]).to eq good_toy_data[:toy][:max_age]
    end

    it "does not add incomplete info to the db" do
      sign_in user1
      before_count = Toy.count
      post :create, params: bad_toy_data_blanks, format: :json
      after_count = Toy.count

      expect(after_count).to eq before_count
    end

    it "does not add incorrect info to the db" do
      sign_in user1
      before_count = Toy.count
      post :create, params: bad_toy_data_wrong, format: :json
      after_count = Toy.count

      expect(after_count).to eq before_count
    end

    it "returns validation error json" do
      sign_in user1
      post :create, params: bad_toy_data_blanks, format: :json
      api_response = JSON.parse(response.body)

      expect(api_response["errors"]).to eq "Toy name can't be blank"
    end
  end

  describe "PATCH#update" do
    it "does not add an additional toy to the db" do
      sign_in user1
      good_toy_data = {
        id: toy1.id,
        toy: {
          toy_name: "Good toy",
          manufacturer_name: "Good toy maker",
          min_age: 3,
          max_age: 15,
          toy_photo: fixture_file_upload('test-toy-image.jpg', 'image/jpeg')
        }
      }
      before_count = Toy.count
      patch :update, params: good_toy_data
      after_count = Toy.count

      expect(after_count).to eq (before_count)
    end

    it "returns the updated toy information" do
      sign_in user1
      good_toy_data = {
        id: toy1.id,
        toy: {
          toy_name: "Good toy",
          manufacturer_name: "Good toy maker",
          min_age: 3,
          max_age: 15,
          toy_photo: fixture_file_upload('test-toy-image.jpg', 'image/jpeg')
        }
      }
      patch :update, params: good_toy_data
      api_response = JSON.parse(response.body)

      expect(api_response["toy"]["id"]).to eq(toy1.id)
      expect(api_response["toy"]["toy_name"]).to eq(good_toy_data[:toy][:toy_name])
      expect(api_response["toy"]["manufacturer_name"]).to eq(good_toy_data[:toy][:manufacturer_name])
      expect(api_response["toy"]["min_age"]).to eq(good_toy_data[:toy][:min_age])
      expect(api_response["toy"]["max_age"]).to eq(good_toy_data[:toy][:max_age])
    end

    it "returns errors with poor data" do
      sign_in user1
      bad_toy_data_wrong = {
        id: toy1.id,
        toy: {
          toy_name: "Bad toy",
          manufacturer_name: "Bad toy maker",
          min_age: "three",
          max_age: 15,
          toy_photo: fixture_file_upload('test-toy-image.jpg', 'image/jpeg')
        }
      }
      patch :update, params: bad_toy_data_wrong
      api_response = JSON.parse(response.body)

      expect(api_response["errors"]).to eq "Min age is not a number"
    end
  end
end
