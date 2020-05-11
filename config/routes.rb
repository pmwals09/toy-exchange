Rails.application.routes.draw do
  root 'homes#index'

  devise_for :users

  get '/toys', to: 'homes#index'
  get '/toys/new', to: 'homes#index'
  get '/toys/:id', to: 'homes#index'
  get '/toys/:id/edit', to: 'homes#index'
  get '/users/:id', to: 'homes#index'
  get '/exchanges/:id', to: 'homes#index'
  # get "mailbox/inbox" => "mailbox#inbox", as: :mailbox_inbox
  # get "mailbox/sent" => "mailbox#sent", as: :mailbox_sent
  # get "mailbox/trash" => "mailbox#trash", as: :mailbox_trash

  namespace :api do
    namespace :v1 do
      resources :toys, only: [:create, :index, :show, :update] do
        resources :toyboxes, only: [:create] do
          resources :exchanges, only: [:create]
        end
      end
      resources :users, only: [:show] do
        resources :toyboxes, only: [:update, :destroy]
        resources :exchanges, only: [:index]
      end
      resources :exchanges, only: [:show]
      resources :conversations, only: [:create, :show, :reply] do
        resources :messages
      end
    end
  end


  # resources :conversations do
  #   member do
  #     post :reply
  #     post :trash
  #     post :untrash
  #   end
  # end

# from video
  # resources :conversations do
  #   resources :messages
  # end
end
