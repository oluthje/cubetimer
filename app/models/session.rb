class Session < ApplicationRecord
  has_many :cubetimes, dependent: :delete_all
end
