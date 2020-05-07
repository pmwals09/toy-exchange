class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :username, :profile_photo

  has_many :toyboxes
  has_many :toys
end
