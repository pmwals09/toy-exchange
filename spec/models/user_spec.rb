require 'rails_helper'

# Acceptance Criteria:
# [x] I must specify a valid email address
# [x] I must specify a unique username

RSpec.describe User, type: :model do
  it { should have_valid(:email).when("email@email.com")}
  it { should_not have_valid(:email).when(nil, "", "email@", "email", "email.com") }

  it { should have_valid(:username).when("pmwals09", "peterrabbit")}
  it { should_not have_valid(:username).when("", " ", nil)}

  describe "#admin?" do
    it "is not an admin if the role is not admin" do
      user = FactoryBot.create(:user, role: "member")
      expect(user.admin?).to eq(false)
    end

    it "is an admin if the role is admin" do
      user = FactoryBot.create(:user, role: "admin")
      expect(user.admin?).to eq(true)
    end
  end
end
