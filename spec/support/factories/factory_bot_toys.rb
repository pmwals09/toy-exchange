require 'factory_bot'

FactoryBot.define do
  factory :toy do
    sequence(:toy_name) { |n| "Paw Patrol #{n}"}
    sequence(:manufacturer_name) { |n| "Spin Master #{n}"}
    min_age { 0 }
    max_age { 100 }
    product_image_url { 'http://www.image.com/image.jpg' }
  end
end
