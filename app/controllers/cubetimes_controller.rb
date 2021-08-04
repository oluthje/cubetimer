class CubetimesController < ApplicationController
	def create
	  cube = Cube.find(params[:cube_id])
	  cubetime = cube.cubetimes.create(cubetime_params)
	  render json: cubetime
	end

	private
		def cubetime_params
			params.require(:cubetime).permit(:seconds)
		end
end