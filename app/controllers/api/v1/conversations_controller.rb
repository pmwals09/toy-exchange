class Api::V1::ConversationsController < ApplicationController
  before_action :mailbox, :conversation

  def reply
    current_user.reply_to_conversation(conversation, conversation_params[:body])
    render json: conversation.messages.last
  end

  private

  def conversation_params
    params.require(:conversation).permit(:subject, :body, recipients:[])
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
