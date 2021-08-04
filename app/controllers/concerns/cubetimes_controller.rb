class CubetimesController < ApplicationController
	def create
	  session = Session.find(params[:session_id])
	  session.cubetimes.create(comment_params)
	end

	private
		def cubetime_params
			params.require(:cubetime).permit(:seconds)
		end
end