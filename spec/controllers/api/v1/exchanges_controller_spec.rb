require 'rails_helper'

RSpec.describe Api::V1::ExchangesController, type: :controller do
  let!(:user1) { FactoryBot.create(:user) }
  let!(:user2) { FactoryBot.create(:user) }
  let!(:admin_user) { FactoryBot.create(:user, role: "admin")}

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
    context "by an admin" do
      it "returns successful response code and json content" do
        sign_in admin_user
        new_toybox = Toybox.create(user: user1, toy: toy1)
        new_exchange = Exchange.create(toybox: new_toybox, buyer: user2)
        user2.send_message([new_exchange, Toybox.find(new_toybox.id).user], "Let's make a deal!", new_exchange.toybox_id)

        get :show, params: { id: new_exchange.id }, format: :json

        expect(response.status).to eq 200
        expect(response.content_type).to eq 'application/json'
      end

      it "returns correct exchange data" do
        sign_in admin_user
        new_toybox = Toybox.create(user: user1, toy: toy1)
        new_exchange = Exchange.create(toybox: new_toybox, buyer: user2)
        user2.send_message([new_exchange, Toybox.find(new_toybox.id).user], "Let's make a deal!", new_exchange.toybox_id)

        get :show, params: { id: new_exchange.id }, format: :json
        api_response = JSON.parse(response.body)

        expect(api_response["exchange"]["exchange"]["toybox"]["id"]).to eq(new_toybox["id"])
        expect(api_response["exchange"]["exchange"]["toybox"]["user"]["id"]).to eq(user1["id"])
        expect(api_response["exchange"]["exchange"]["buyer"]["id"]).to eq(user2["id"])
        expect(api_response["messages"].length).to eq 1
      end
    end

    context "by a member" do
      it "returns successful response code and json content" do
        sign_in user2
        new_toybox = Toybox.create(user: user1, toy: toy1)
        new_exchange = Exchange.create(toybox: new_toybox, buyer: user2)
        user2.send_message([new_exchange, Toybox.find(new_toybox.id).user], "Let's make a deal!", new_exchange.toybox_id)

        get :show, params: { id: new_exchange.id }, format: :json

        expect(response.status).to eq 200
        expect(response.content_type).to eq 'application/json'
      end

      it "returns correct exchange data" do
        sign_in user2
        new_toybox = Toybox.create(user: user1, toy: toy1)
        new_exchange = Exchange.create(toybox: new_toybox, buyer: user2)
        user2.send_message([new_exchange, Toybox.find(new_toybox.id).user], "Let's make a deal!", new_exchange.toybox_id)

        get :show, params: { id: new_exchange.id }, format: :json
        api_response = JSON.parse(response.body)

        expect(api_response["exchange"]["exchange"]["toybox"]["id"]).to eq(new_toybox["id"])
        expect(api_response["exchange"]["exchange"]["toybox"]["user"]["id"]).to eq(user1["id"])
        expect(api_response["exchange"]["exchange"]["buyer"]["id"]).to eq(user2["id"])
        expect(api_response["messages"].length).to eq 1
      end
    end
  end

  describe "GET#search" do
    context "by a member" do
      it "returns successful response code and json content" do
        VCR.use_cassette('library_search') do
          sign_in user2
          new_toybox = Toybox.create(user: user1, toy: toy1)
          new_exchange = Exchange.create(toybox: new_toybox, buyer: user2)
          search_params = {
            id: new_exchange.id,
            query: "Weymouth, MA library"
          }

          get :search, params: search_params, format: :json

          expect(response.status).to eq 200
          expect(response.content_type).to eq 'application/json'
        end
      end

      it "returns list of applicable locations" do
        VCR.use_cassette('library_search') do
          sign_in user2
          new_toybox = Toybox.create(user: user1, toy: toy1)
          new_exchange = Exchange.create(toybox: new_toybox, buyer: user2)
          search_params = {
            id: new_exchange.id,
            query: "Weymouth, MA library"
          }

          get :search, params: search_params, format: :json
          api_response = JSON.parse(response.body)

          expect(api_response["results"]).to be_kind_of(Array)
          expect(api_response["results"].length).to be > 0
          expect(api_response["results"][0]).to have_key("geometry")
          expect(api_response["results"][0]).to have_key("name")
          expect(api_response["results"][0]).to have_key("formatted_address")
        end
      end
    end

    context "by an admin" do
      it "returns successful response code and json content" do
        VCR.use_cassette('library_search') do
          sign_in admin_user
          new_toybox = Toybox.create(user: user1, toy: toy1)
          new_exchange = Exchange.create(toybox: new_toybox, buyer: user2)
          search_params = {
            id: new_exchange.id,
            query: "Weymouth, MA library"
          }

          get :search, params: search_params, format: :json

          expect(response.status).to eq 200
          expect(response.content_type).to eq 'application/json'
        end
      end

      it "returns list of applicable locations" do
        VCR.use_cassette('library_search') do
          sign_in admin_user
          new_toybox = Toybox.create(user: user1, toy: toy1)
          new_exchange = Exchange.create(toybox: new_toybox, buyer: user2)
          search_params = {
            id: new_exchange.id,
            query: "Weymouth, MA library"
          }

          get :search, params: search_params, format: :json
          api_response = JSON.parse(response.body)

          expect(api_response["results"]).to be_kind_of(Array)
          expect(api_response["results"].length).to be > 0
          expect(api_response["results"][0]).to have_key("geometry")
          expect(api_response["results"][0]).to have_key("name")
          expect(api_response["results"][0]).to have_key("formatted_address")
        end
      end
    end
  end

  describe "PUT#update" do
    context "by a member" do
      it "does not add an additional exchange to the db" do
        sign_in user2
        new_toybox = Toybox.create(user: user1, toy: toy1)
        new_exchange = Exchange.create(toybox: new_toybox, buyer: user2)
        user2.send_message([new_exchange, Toybox.find(new_toybox.id).user], "Let's make a deal!", new_exchange.toybox_id)
        update_params = {
          id: new_exchange.id,
          coords: {
            lat: 15.1234567,
            lng: 70.1234567
          },
          name: "Home",
          address: "123 Parts Unknown Blvd."
        }

        before_count = Exchange.count
        put :update, params: update_params, format: :json
        after_count = Exchange.count

        expect(after_count).to eq before_count
      end

      it "returns the updated exchange" do
        sign_in user2
        new_toybox = Toybox.create(user: user1, toy: toy1)
        new_exchange = Exchange.create(toybox: new_toybox, buyer: user2)
        user2.send_message([new_exchange, Toybox.find(new_toybox.id).user], "Let's make a deal!", new_exchange.toybox_id)
        update_params = {
          id: new_exchange.id,
          coords: {
            lat: 15.1234567,
            lng: 70.1234567
          },
          name: "Home",
          formatted_address: "123 Parts Unknown Blvd."
        }

        put :update, params: update_params, format: :json
        api_response = JSON.parse(response.body)

        expect(api_response["exchange"]["id"]).to eq new_exchange["id"]
        expect(api_response["exchange"]["lat"]).to eq update_params[:coords][:lat].to_s
        expect(api_response["exchange"]["lng"]).to eq update_params[:coords][:lng].to_s
        expect(api_response["exchange"]["location_name"]).to eq update_params[:name]
        expect(api_response["exchange"]["address"]).to eq update_params[:formatted_address]
      end
    end

    context "by an admin" do
      it "does not add an additional exchange to the db" do
        sign_in admin_user
        new_toybox = Toybox.create(user: user1, toy: toy1)
        new_exchange = Exchange.create(toybox: new_toybox, buyer: user2)
        user2.send_message([new_exchange, Toybox.find(new_toybox.id).user], "Let's make a deal!", new_exchange.toybox_id)
        update_params = {
          id: new_exchange.id,
          coords: {
            lat: 15.1234567,
            lng: 70.1234567
          },
          name: "Home",
          address: "123 Parts Unknown Blvd."
        }

        before_count = Exchange.count
        put :update, params: update_params, format: :json
        after_count = Exchange.count

        expect(after_count).to eq before_count
      end

      it "returns the updated exchange" do
        sign_in admin_user
        new_toybox = Toybox.create(user: user1, toy: toy1)
        new_exchange = Exchange.create(toybox: new_toybox, buyer: user2)
        user2.send_message([new_exchange, Toybox.find(new_toybox.id).user], "Let's make a deal!", new_exchange.toybox_id)
        update_params = {
          id: new_exchange.id,
          coords: {
            lat: 15.1234567,
            lng: 70.1234567
          },
          name: "Home",
          formatted_address: "123 Parts Unknown Blvd."
        }

        put :update, params: update_params, format: :json
        api_response = JSON.parse(response.body)

        expect(api_response["exchange"]["id"]).to eq new_exchange["id"]
        expect(api_response["exchange"]["lat"]).to eq update_params[:coords][:lat].to_s
        expect(api_response["exchange"]["lng"]).to eq update_params[:coords][:lng].to_s
        expect(api_response["exchange"]["location_name"]).to eq update_params[:name]
        expect(api_response["exchange"]["address"]).to eq update_params[:formatted_address]
      end
    end
  end

  describe "DELETE#destroy" do
    context "by a member" do
      it "removes an exchange from the database" do
        sign_in user2
        new_toybox = Toybox.create(user: user1, toy: toy1)
        new_exchange = Exchange.create(toybox: new_toybox, buyer: user2)
        user2.send_message([new_exchange, Toybox.find(new_toybox.id).user], "Let's make a deal!", new_exchange.toybox_id)

        before_count = Exchange.count
        delete :destroy, params: { id: new_exchange.id }, format: :json
        after_count = Exchange.count

        expect(after_count).to eq(before_count - 1)
      end

      it "returns the deleted exchange" do
        sign_in user2
        new_toybox = Toybox.create(user: user1, toy: toy1)
        new_exchange = Exchange.create(toybox: new_toybox, buyer: user2)
        user2.send_message([new_exchange, Toybox.find(new_toybox.id).user], "Let's make a deal!", new_exchange.toybox_id)

        delete :destroy, params: { id: new_exchange.id }, format: :json
        api_response = JSON.parse(response.body)

        expect(api_response["exchange"]["id"]).to eq new_exchange.id
      end
    end

    context "by an admin" do
      it "removes an exchange from the database" do
        sign_in admin_user
        new_toybox = Toybox.create(user: user1, toy: toy1)
        new_exchange = Exchange.create(toybox: new_toybox, buyer: user2)
        user2.send_message([new_exchange, Toybox.find(new_toybox.id).user], "Let's make a deal!", new_exchange.toybox_id)

        before_count = Exchange.count
        delete :destroy, params: { id: new_exchange.id }, format: :json
        after_count = Exchange.count

        expect(after_count).to eq(before_count - 1)
      end

      it "returns the deleted exchange" do
        sign_in admin_user
        new_toybox = Toybox.create(user: user1, toy: toy1)
        new_exchange = Exchange.create(toybox: new_toybox, buyer: user2)
        user2.send_message([new_exchange, Toybox.find(new_toybox.id).user], "Let's make a deal!", new_exchange.toybox_id)

        delete :destroy, params: { id: new_exchange.id }, format: :json
        api_response = JSON.parse(response.body)

        expect(api_response["exchange"]["id"]).to eq new_exchange.id
      end
    end
  end
end
