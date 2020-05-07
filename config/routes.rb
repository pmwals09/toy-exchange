Rails.application.routes.draw do
  root 'homes#index'
  get '/toys', to: 'homes#index'
  get '/toys/new', to: 'homes#index'
  get '/toys/:id', to: 'homes#index'
  get '/toys/:id/edit', to: 'homes#index'

  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :toys, only: [:create, :index, :show, :update]
    end
  end
end
