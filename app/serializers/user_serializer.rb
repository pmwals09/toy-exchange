class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :username, :profile_photo
end
