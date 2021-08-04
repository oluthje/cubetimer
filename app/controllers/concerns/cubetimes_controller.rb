class CubetimesController < ApplicationController
	def create
	  cube = Cube.find(params[:cube_id])
	  cube.cubetimes.create(comment_params)
	end

	private
		def cubetime_params
			params.require(:cubetime).permit(:seconds)
		end
end