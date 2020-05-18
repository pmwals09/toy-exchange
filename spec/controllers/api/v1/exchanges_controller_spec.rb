require 'rails_helper'

RSpec.describe Api::V1::ExchangesController, type: :controller do
  let!(:user1) { FactoryBot.create(:user) }
  let!(:user2) { FactoryBot.create(:user) }

  let!(:toy1) { FactoryBot.create(:toy) }
  describe "POST#create" do
    it "adds a new open exchange to the db" do
      sign_in user1
      new_toybox = Toybox.create(user: user1, toy: toy1)
      new_exchange_params = {
        toy_id: toy1.id,
        toybox_id: new_toybox.id
      }

      before_count = Exchange.count
      post :create, params: new_exchange_params, format: :json
      after_count = Exchange.count

      expect(after_count).to eq(before_count + 1)
    end

    it "returns the new exchange as json" do
      sign_in user2
      new_toybox = Toybox.create(user: user1, toy: toy1)
      new_exchange_params = {
        toy_id: toy1.id,
        toybox_id: new_toybox.id
      }

      post :create, params: new_exchange_params, format: :json
      api_response = JSON.parse(response.body)

      expect(api_response["exchange"].length).to eq 9
      expect(api_response["exchange"]["toybox"]["id"]).to eq new_toybox.id
      expect(api_response["exchange"]["buyer"]["id"]).to eq user2.id
      expect(api_response["exchange"]["toybox"]["user"]["id"]).to eq user1.id
    end

    it "creates a new conversation for the exchange" do
      sign_in user2
      new_toybox = Toybox.create(user: user1, toy: toy1)
      new_exchange_params = {
        toy_id: toy1.id,
        toybox_id: new_toybox.id
      }

      before_count = Mailboxer::Conversation.count
      post :create, params: new_exchange_params, format: :json
      after_count = Mailboxer::Conversation.count

      expect(after_count).to eq(before_count + 1)
    end
  end

  describe "GET#show" do
    xit "returns successful response code and json content" do
      sign_in user1

    end

    xit "returns correct exchange data" do
    end
  end

  describe "GET#search" do
    xit "returns successful response code and json content" do

    end

    # How to deal w places API - VCR?
  end

  describe "PUT#update" do

  end

  describer "DELETE#destroy" do
    
  end
end
