require "test_helper"

class CubesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get cubes_index_url
    assert_response :success
  end

  test "should get create" do
    get cubes_create_url
    assert_response :success
  end

  test "should get update" do
    get cubes_update_url
    assert_response :success
  end

  test "should get destroy" do
    get cubes_destroy_url
    assert_response :success
  end
end
