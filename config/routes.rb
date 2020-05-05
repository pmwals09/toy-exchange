Rails.application.routes.draw do
  root 'homes#index'
  get '/toys', to: 'homes#index'
  get '/toys/new', to: 'homes#index'

  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :toys, only: [:index, :create, :show]
    end
  end
end
