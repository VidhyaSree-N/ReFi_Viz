# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_04_22_132304) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "refinances", force: :cascade do |t|
    t.float "apr"
    t.float "new_apr"
    t.float "original_payment"
    t.float "new_payment"
    t.float "savings_per_month"
    t.float "total_savings"
    t.integer "term"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "amount"
  end

end
