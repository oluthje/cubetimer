class CreateCubes < ActiveRecord::Migration[6.1]
  def change
    create_table :cubes do |t|
      t.string :name

      t.timestamps
    end
  end
end
