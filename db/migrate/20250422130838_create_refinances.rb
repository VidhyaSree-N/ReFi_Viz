class CreateRefinances < ActiveRecord::Migration[7.1]
  def change
    create_table :refinances do |t|
      t.float :apr
      t.float :new_apr
      t.float :original_payment
      t.float :new_payment
      t.float :savings_per_month
      t.float :total_savings
      t.integer :term

      t.timestamps
    end
  end
end
