class AddWaddressToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :waddress, :string
  end
end
