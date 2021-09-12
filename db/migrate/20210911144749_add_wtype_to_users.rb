class AddWtypeToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :wtype, :string
  end
end
