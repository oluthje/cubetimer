class CubetimesController < ApplicationController
  def create
    session = Session.find(params[:session_id])
    cubetime = session.cubetimes.create(cubetime_params)
    render json: cubetime
  end

  def destroy
    session = Session.find(params[:session_id])
    cubetime = session.cubetimes.find(params[:id])
    cubetime.destroy
  end

  private
    def cubetime_params
      params.require(:cubetime).permit(:seconds)
    end
end