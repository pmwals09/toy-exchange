class Api::V1::ConversationsController < ApplicationController
  before_action :mailbox, :conversation

  def new
  end

  def create
    recipients = User.where(id: conversation_params[:recipients])
    conversation = current_user.send_message(recipients, conversation_params[:body], conversation_params[:subject]).conversation
  end

  def show
    conversation_messages = conversation.messages.order(created_at: :desc)
    render json: conversation_messages
  end

  def reply
    binding.pry
    current_user.reply_to_conversation(conversation, conversation_params[:body])
  end

  private

  def conversation_params
    params.require(:conversation).permit(:subject, :body,recipients:[])
  end

  def message_params
    params.require(:message).permit(:body, :subject)
  end

  def mailbox
   @mailbox ||= current_user.mailbox
  end

  def conversation
   @conversation ||= mailbox.conversations.find(params[:id])
  end
end
