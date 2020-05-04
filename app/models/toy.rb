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
end
