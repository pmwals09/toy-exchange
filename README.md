# README

[![Codeship Status for pmwals09/toy-exchange](https://app.codeship.com/projects/37c49de0-7061-0138-1c46-1a5854f10ed2/status?branch=master)](https://app.codeship.com/projects/395239)

ThrifToy can be used by parents everywhere to exchange their gently-used, outgrown toys with other parents. It is built on a Rails backend supporting a React frontend, and makes use of [Devise](https://github.com/heartcombo/devise) for user authentication, [Mailboxer](https://github.com/mailboxer/mailboxer) for communication, and [react-google-maps](https://github.com/tomchentw/react-google-maps) as a React wrapper for the Google Maps api. This project also utilizes the Google Places API for location selection of an exchange.

The project is currently hosted [on Heroku](https://thriftoy.herokuapp.com/). To get this up an running on your own machine will require the following:

1. Clone the repo into your local filesystem. It is presumed that your machine has [Ruby v2.6+](https://www.ruby-lang.org/en/), [Node v11+](https://nodejs.org/en/), and [PostgreSQL v12+](https://www.postgresql.org/) already, but links have been provided to these various technologies to install.
2. Run ```yarn install && bundle install``` to install the required JS packages and ruby gems.
3. Run ``` bundle exec rake db:migrate``` to prepare the database with the required tables.
4. Open two terminal windows: in the first, run ```rails server```, and in the other run ```yarn run start```. This will start the required rails and webpacker servers.
5. In your browser of choice, visit localhost:3000.
