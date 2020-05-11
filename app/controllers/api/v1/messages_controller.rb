class Api::V1::MessagesController < ApplicationController
  before_action :get_mailbox, :get_box
end
