require 'rails_helper'

# Acceptance Criteria:
# [x] I must specify a valid email address
# [x] I must specify a unique username

RSpec.describe User, type: :model do
  it { should have_valid(:email).when("email@email.com")}
  it { should_not have_valid(:email).when(nil, "", "email@", "email", "email.com") }

  it { should have_valid(:username).when("pmwals09", "peterrabbit")}
  it { should_not have_valid(:username).when("", " ", nil)}
end
