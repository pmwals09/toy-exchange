require 'rails_helper'

RSpec.describe Api::V1::ConversationsController, type: :controller do
  let!(:user1) { FactoryBot.create(:user) }
  let!(:user2) { FactoryBot.create(:user) }
  let!(:toy1) { FactoryBot.create(:toy) }
  describe "POST#reply" do
    it "adds a message to the conversation" do
      sign_in user1
      new_toybox = Toybox.create(user: user1, toy: toy1)
      new_exchange = Exchange.create(toybox: new_toybox, buyer: user2)
      user2.send_message([new_exchange, Toybox.find(new_toybox.id).user], "Let's make a deal!", new_exchange.toybox_id)
      conversation = new_exchange.mailbox.conversations[0]
      conversation_params = {
        id: conversation.id,
        conversation: {
          body: "A conversation body"
        }
      }

      before_count = conversation.messages.count
      post :reply, params: conversation_params, format: :json
      after_count = conversation.messages.count

      expect(after_count).to eq(before_count + 1)
      expect(conversation.messages.last.body).to eq(conversation_params[:conversation][:body])
    end

    it "returns the latest message as json" do
      sign_in user1
      new_toybox = Toybox.create(user: user1, toy: toy1)
      new_exchange = Exchange.create(toybox: new_toybox, buyer: user2)
      user2.send_message([new_exchange, Toybox.find(new_toybox.id).user], "Let's make a deal!", new_exchange.toybox_id)
      conversation = new_exchange.mailbox.conversations[0]
      conversation_params = {
        id: conversation.id,
        conversation: {
          body: "A conversation body"
        }
      }

      post :reply, params: conversation_params, format: :json
      api_response = JSON.parse(response.body)

      expect(api_response["conversation_id"]).to eq(conversation.id)
      expect(api_response["body"]).to eq(conversation_params[:conversation][:body])
      expect(api_response["sender_id"]).to eq(user1.id)
    end

  end
end
