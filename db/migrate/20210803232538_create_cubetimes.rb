class CreateCubetimes < ActiveRecord::Migration[6.1]
  def change
    create_table :cubetimes do |t|
      t.float :seconds
      t.references :cube, null: false, foreign_key: true

      t.timestamps
    end
  end
end
