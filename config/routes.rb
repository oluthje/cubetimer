Rails.application.routes.draw do
  scope '/api/v1' do
    resources :cubes do
      resources :cubetimes
    end
  end
end
