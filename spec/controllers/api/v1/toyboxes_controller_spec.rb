require 'rails_helper'

RSpec.describe Api::V1::ToyboxesController, type: :controller do
  let!(:user1) { FactoryBot.create(:user) }
  let!(:toy1) { FactoryBot.create(:toy) }
  describe "POST#create" do
    it "adds a new toybox to the db" do
      new_toybox_params = { toy_id: toy1.id }
      sign_in user1

      before_count = Toybox.count
      post :create, params: new_toybox_params, format: :json
      after_count = Toybox.count

      expect(after_count).to eq(before_count + 1)
    end

    it "returns the new toybox as json" do
      sign_in user1
      new_toybox_params = { toy_id: toy1.id }
      post :create, params: new_toybox_params, format: :json
      api_response = JSON.parse(response.body)

      expect(api_response["toybox"]["toy"]["id"]).to eq toy1.id
      expect(api_response["toybox"]["user"]["id"]).to eq user1.id
      expect(api_response["toybox"]["for_sale"]).to eq false
    end

    it "does not add incomplete/bad data to the db" do
      sign_in user1
      bad_toybox_params = { toy_id: "" }
      before_count = Toybox.count
      post :create, params: bad_toybox_params
      after_count = Toybox.count

      expect(after_count).to eq before_count
    end

    it "returns validation error json" do
      sign_in user1
      bad_toybox_params = { toy_id: "" }
      post :create, params: bad_toybox_params
      api_response = JSON.parse(response.body)

      expect(api_response["errors"][0]).to eq "Toy can't be blank"
      expect(api_response["errors"][1]).to eq "Toy must exist"
    end
  end

  describe "PATCH#update" do
    let!(:existing_toybox) { Toybox.create(user: user1, toy: toy1) }
    it "does not add an additional toybox to the db" do
      sign_in user1
      toybox_params = {
        id: toy1.id,
        user_id: user1.id
      }
      before_count = Toybox.count
      patch :update, params: toybox_params
      after_count = Toybox.count

      expect(after_count).to eq(before_count)
    end

    it "returns the updated toybox" do
      sign_in user1
      toybox_params = {
        id: toy1.id,
        user_id: user1.id
      }
      patch :update, params: toybox_params
      api_response = JSON.parse(response.body)

      expect(api_response["toybox"]["id"]).to eq existing_toybox[:id]
      expect(api_response["toybox"]["toy"]["id"]).to eq toy1.id
      expect(api_response["toybox"]["user"]["id"]).to eq user1.id
    end

    it "returns errors with poor data" do
      sign_in user1
      bad_toybox_params = {
        id: "",
        user_id: user1.id
      }
      patch :update, params: bad_toybox_params
      api_response = JSON.parse(response.body)

      expect(api_response["errors"]).to eq "Unable to find record to update"
    end
  end

  describe "DELETE#destroy" do
    let!(:existing_toybox) { Toybox.create(user: user1, toy: toy1) }
    it "removes a toybox association from the db" do
      sign_in user1
      toybox_params = {
        id: toy1.id,
        user_id: user1.id
      }
      before_count = Toybox.count
      delete :destroy, params: toybox_params
      after_count = Toybox.count

      expect(after_count).to eq(before_count - 1)
    end

    it "does not remove the toy or the user from the db" do
      sign_in user1
      toybox_params = {
        id: toy1.id,
        user_id: user1.id
      }
      toy_before_count = Toy.count
      user_before_count = User.count
      delete :destroy, params: toybox_params
      toy_after_count = Toy.count
      user_after_count = User.count

      expect(toy_after_count).to eq toy_before_count
      expect(user_after_count).to eq user_before_count
    end
  end
end
