class Api::V1::ConversationsController < ApplicationController
  before_action :mailbox, :conversation
  # before_action :check_current_user_in_conversation, :only => [:show, :update, :destroy]

  def new
  end

  def create
    recipients = User.where(id: conversation_params[:recipients])
    conversation = current_user.send_message(recipients, conversation_params[:body], conversation_params[:subject]).conversation
    # flash[:success] = "Your message was successfully sent!"
    # redirect_to conversation_path(conversation)
  end

  def show
    # receipts = conversation.receipts_for(current_user)
    conversation_messages = conversation.messages.order(created_at: :desc)
    # render json: receipts
    render json: conversation_messages

    # mark conversation as read
    # conversation.mark_as_read(current_user)
  end

  def reply
    current_user.reply_to_conversation(conversation, message_params[:body])
    # flash[:notice] = "Your reply message was successfully sent!"
    # redirect_to conversation_path(conversation)
  end

  # def trash
  #   conversation.move_to_trash(current_user)
  #   redirect_to mailbox_inbox_path
  # end
  #
  # def untrash
  #   conversation.untrash(current_user)
  #   redirect_to mailbox_inbox_path
  # end

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
