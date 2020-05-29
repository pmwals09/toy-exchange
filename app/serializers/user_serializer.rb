class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :username, :profile_photo, :role

  has_many :toyboxes
  has_many :exchanges
end
