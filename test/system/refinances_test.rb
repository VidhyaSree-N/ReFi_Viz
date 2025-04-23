require "application_system_test_case"

class RefinancesTest < ApplicationSystemTestCase
  setup do
    @refinance = refinances(:one)
  end

  test "visiting the index" do
    visit refinances_url
    assert_selector "h1", text: "Refinances"
  end

  test "should create refinance" do
    visit refinances_url
    click_on "New refinance"

    fill_in "Apr", with: @refinance.apr
    fill_in "New apr", with: @refinance.new_apr
    fill_in "New payment", with: @refinance.new_payment
    fill_in "Original payment", with: @refinance.original_payment
    fill_in "Savings per month", with: @refinance.savings_per_month
    fill_in "Term", with: @refinance.term
    fill_in "Total savings", with: @refinance.total_savings
    click_on "Create Refinance"

    assert_text "Refinance was successfully created"
    click_on "Back"
  end

  test "should update Refinance" do
    visit refinance_url(@refinance)
    click_on "Edit this refinance", match: :first

    fill_in "Apr", with: @refinance.apr
    fill_in "New apr", with: @refinance.new_apr
    fill_in "New payment", with: @refinance.new_payment
    fill_in "Original payment", with: @refinance.original_payment
    fill_in "Savings per month", with: @refinance.savings_per_month
    fill_in "Term", with: @refinance.term
    fill_in "Total savings", with: @refinance.total_savings
    click_on "Update Refinance"

    assert_text "Refinance was successfully updated"
    click_on "Back"
  end

  test "should destroy Refinance" do
    visit refinance_url(@refinance)
    accept_confirm { click_on "Destroy this refinance", match: :first }

    assert_text "Refinance was successfully destroyed"
  end
end
