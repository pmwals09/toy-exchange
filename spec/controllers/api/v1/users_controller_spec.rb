require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  let!(:user1) { FactoryBot.create(:user) }
  let!(:admin_user) { FactoryBot.create(:user, role: "admin") }
  describe "GET#show" do
    context "by a member" do
      it "returns successful response code and json content" do
        sign_in user1
        get :show, params: { id: user1.id }

        expect(response.status).to eq 200
        expect(response.content_type).to eq 'application/json'
      end

      it "returns correct user" do
        sign_in user1
        get :show, params: { id: user1.id }
        api_response = JSON.parse(response.body)

        expect(api_response["user"]["user"]["id"]).to eq user1.id
        expect(api_response["user"]["user"]["email"]).to eq user1.email
        expect(api_response["user"]["user"]["username"]).to eq user1.username
      end

      context "by an admin" do
        it "returns successful response code and json content" do
          sign_in admin_user
          get :show, params: { id: user1.id }

          expect(response.status).to eq 200
          expect(response.content_type).to eq 'application/json'
        end

        it "returns correct user" do
          sign_in admin_user
          get :show, params: { id: user1.id }
          api_response = JSON.parse(response.body)

          expect(api_response["user"]["user"]["id"]).to eq user1.id
          expect(api_response["user"]["user"]["email"]).to eq user1.email
          expect(api_response["user"]["user"]["username"]).to eq user1.username
        end
      end
    end
  end
end
