class Toybox < ApplicationRecord
  validates :user_id, presence: true
  validates :toy_id, presence: true
  validates :toy_id, uniqueness: { scope: :user }

  belongs_to :user
  belongs_to :toy
end
