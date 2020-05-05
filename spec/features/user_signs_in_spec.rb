require 'rails_helper'

feature 'user signs in', %Q{
  As a signed up user
  I want to sign in
  So that I can regain access to my account
} do

# Acceptance Criteria
# [x] If I enter valid credentials, I receive on-screen feedback that my account was successfully created
# [x] If I am already logged in, I do not see the link to sign-up or sign-in
# [x] I can quickly access the sign-in page from the root path if I'm not already logged in
# [x] User sees profile photo after sign in

  scenario 'getting to the sign-in page' do
    visit "/"

    expect(page).to have_content('Sign In')
  end

  scenario 'specify valid credentials' do
    user = FactoryBot.create(:user)

    visit new_user_session_path

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password

    click_button 'Log in'

    expect(page).to have_content('Signed in successfully')
    expect(page).to have_content('Sign Out')
    expect(page).to have_css("img[src*='test-user-image.jpg']")

    expect(page).to_not have_content('Sign Up')
    expect(page).to_not have_content('Sign In')
  end

  scenario 'specify invalid credentials' do
    visit new_user_session_path

    click_button 'Log in'
    expect(page).to have_content('Invalid Email or password')
    expect(page).to_not have_content('Sign Out')
  end
end
