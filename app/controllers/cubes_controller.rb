class CubesController < ApplicationController
  def index
    cubes = Cube.order("created_at DESC")
    render json: cubes
  end

  def create
    cube = Cube.create(cube_param)
    render json: cube
  end

  def show
    cube = Cube.find(params[:id])
    render json: cube
  end

  def update
  end

  def destroy
    cube = Cube.find(params[:id])
    cube.destroy
    head :no_content, status: :ok
  end

  private
    def cube_param
      params.require(:cube).permit(:name)
    end
end
