class RenameCubesToSessions < ActiveRecord::Migration[6.1]
  def change
    rename_table :cubes, :sessions
  end
end