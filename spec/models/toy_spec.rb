require 'rails_helper'

RSpec.describe Toy, type: :model do
  it { should have_valid(:toy_name).when("Paw Patrol Anything") }
  it { should_not have_valid(:toy_name).when(nil, "", " ") }

  it { should have_valid(:manufacturer_name).when("Spin Master") }
  it { should_not have_valid(:manufacturer_name).when(nil, "", " ") }

  it { should have_valid(:min_age).when(6, 0, 12, 100, "", nil) }
  it { should_not have_valid(:min_age).when("a", "six") }

  it { should have_valid(:max_age).when(6, 0, 12, 100, "", nil) }
  it { should_not have_valid(:max_age).when("a", "six") }

  it { should have_valid(:product_image_url).when("http://www.image.com/image.jpg", "https://www.image.com/image.jpg")}
  it { should have_valid(:product_image_url).when("www.image.com/image.jpg", "image.jpg")}
end
