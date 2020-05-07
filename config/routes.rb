Rails.application.routes.draw do
  root 'homes#index'

  devise_for :users

  get '/toys', to: 'homes#index'
  get '/toys/new', to: 'homes#index'
  get '/toys/:id', to: 'homes#index'
  get '/toys/:id/edit', to: 'homes#index'
  get '/users/:id', to: 'homes#index'

  namespace :api do
    namespace :v1 do
      resources :toys, only: [:create, :index, :show, :update]
      resources :users, only: [:show]
    end
  end
end
