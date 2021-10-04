class CreateSliders < ActiveRecord::Migration[5.2]
  def change
    create_table :sliders do |t|
      t.string :title
      t.text :content
      t.text :link
      t.integer :status

      t.timestamps
    end
  end
end
