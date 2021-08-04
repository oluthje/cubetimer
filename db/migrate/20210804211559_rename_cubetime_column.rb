class RenameCubetimeColumn < ActiveRecord::Migration[6.1]
  def change
    rename_column :cubetimes, :cube_id, :session_id
  end
end
