require 'rails_helper'

feature 'user registers', %Q{
  As a visitor
  I want to register
  So that I can create an account
} do

# Acceptance Criteria:
# [x] I must specify a valid email address, username, password, and password confirmation
# [x] If I don't specify the required information, I am presented with an error message
# [x] If I enter valid credentials, I receive on-screen feedback that my account was successfully created
# [x] If I enter credentials of an existing user, I receive on-screen feedback that a user exists
# [x] I can quickly access the sign-up page from the root path if I'm not already logged in

  scenario 'getting to the sign-in page' do
    visit "/"

    expect(page).to have_content('Sign Up')
  end

  scenario 'provide valid registration information' do
    visit new_user_registration_path

    fill_in 'Email', with: 'john@example.com'
    fill_in 'Username', with: 'JohnSmith88'
    fill_in 'Password', with: 'password123'
    fill_in 'Password confirmation', with: 'password123'

    click_button 'Sign up'

    expect(page).to have_content('Welcome! You have signed up successfully.')
    expect(page).to have_content('Sign Out')
  end

  scenario 'provide invalid registration information' do
    visit new_user_registration_path

    click_button 'Sign up'
    expect(page).to have_content("can't be blank")
    expect(page).to_not have_content('Sign Out')
  end

  scenario 'provide existing registration information' do
    User.create(
      email: "john@example.com",
      password: "password",
      username: "JohnSmith88"
    )
    
    visit new_user_registration_path

    fill_in 'Email', with: 'john@example.com'
    fill_in 'Username', with: 'JohnSmith88'
    fill_in 'Password', with: 'password'
    fill_in 'Password confirmation', with: 'password'

    click_button 'Sign up'

    expect(page).to have_content('has already been taken')
  end
end
