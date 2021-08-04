class SessionsController < ApplicationController
  def index
    sessions = Session.order("created_at DESC")
    render json: sessions
  end

  def create
    session = Session.create(session_param)
    render json: session
  end

  def show
    session = Session.find(params[:id])
    render json: session.cubetimes
  end

  def update
  end

  def destroy
    session = Session.find(params[:id])
    session.destroy
    head :no_content, status: :ok
  end

  private
    def session_param
      params.require(:session).permit(:name)
    end
end
