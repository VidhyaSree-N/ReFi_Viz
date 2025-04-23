class AddAmountToRefinances < ActiveRecord::Migration[7.1]
  def change
    add_column :refinances, :amount, :decimal
  end
end
