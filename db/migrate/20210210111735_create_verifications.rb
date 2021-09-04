class CreateVerifications < ActiveRecord::Migration[5.2]
  def change
    create_table :verifications do |t|
      t.belongs_to :user, index: true
      t.string :name
      t.string :email
      t.string :language
      t.string :image
      t.string :token

      t.timestamps
    end
  end
end
