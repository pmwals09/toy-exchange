# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_05_08_195531) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "exchanges", force: :cascade do |t|
    t.bigint "toybox_id", null: false
    t.boolean "open_status", default: true, null: false
    t.bigint "buyer_id", null: false
    t.index ["buyer_id"], name: "index_exchanges_on_buyer_id"
    t.index ["toybox_id"], name: "index_exchanges_on_toybox_id"
  end

  create_table "toyboxes", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "toy_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "for_sale", default: false
    t.index ["toy_id"], name: "index_toyboxes_on_toy_id"
    t.index ["user_id"], name: "index_toyboxes_on_user_id"
  end

  create_table "toys", force: :cascade do |t|
    t.string "toy_name", null: false
    t.string "manufacturer_name", null: false
    t.integer "min_age"
    t.integer "max_age"
    t.string "toy_photo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "description"
    t.bigint "upc"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username", null: false
    t.string "profile_photo"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
