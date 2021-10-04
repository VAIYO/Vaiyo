class CreateRoadmaps < ActiveRecord::Migration[5.2]
  def change
    create_table :roadmaps do |t|
      t.text :milestone
      t.string :year
      t.string :week
      t.integer :step
      t.text :description
      t.integer :status
      t.boolean :is_enable

      t.timestamps
    end
  end
end
