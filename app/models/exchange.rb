class Exchange < ApplicationRecord
  validates :open_status, presence: true

  acts_as_messageable

  belongs_to :toybox
  belongs_to :buyer, class_name: "User"
end
