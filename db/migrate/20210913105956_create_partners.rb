class CreatePartners < ActiveRecord::Migration[5.2]
  def change
    create_table :partners do |t|
      t.string :name
      t.text :logo
      t.text :replacement_logo
      t.integer :status

      t.timestamps
    end
  end
end
