Rails.application.routes.draw do
  scope '/api/v1' do
    resources :sessions do
      resources :cubetimes
    end
  end
end
