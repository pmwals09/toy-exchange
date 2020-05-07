class Toy < ApplicationRecord
  validates :toy_name, presence: true
  validates :manufacturer_name, presence: true
  validates :min_age, numericality: {
    only_integer: true,
    allow_nil: true,
    greater_than_or_equal_to: 0
  }
  validates :max_age, numericality: {
    only_integer: true,
    allow_nil: true,
    greater_than_or_equal_to: 0
  }
  validates :upc, numericality: {
    only_integer: true,
    allow_nil: true,
    greater_than: 99999999999,
    less_than: 1000000000000
  }

  mount_uploader :toy_photo, ToyPhotoUploader
  
  has_many :toyboxes
  has_many :users, through: :toyboxes
end
