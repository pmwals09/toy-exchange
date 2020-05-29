class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :username, presence: true
  validates :username, length: { minimum: 4 }
  validates :username, uniqueness: true

  mount_uploader :profile_photo, ProfilePhotoUploader

  has_many :toyboxes
  has_many :toys, through: :toyboxes
  has_many :exchanges, class_name: "Exchange", foreign_key: "buyer_id"

  acts_as_messageable

  def mailboxer_name
    self.username
  end

  def mailboxer_email(object)
    self.email
  end

  def admin?
    role == "admin"
  end
end
