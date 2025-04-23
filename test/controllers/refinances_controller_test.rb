require "test_helper"

class RefinancesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @refinance = refinances(:one)
  end

  test "should get index" do
    get refinances_url
    assert_response :success
  end

  test "should get new" do
    get new_refinance_url
    assert_response :success
  end

  test "should create refinance" do
    assert_difference("Refinance.count") do
      post refinances_url, params: { refinance: { apr: @refinance.apr, new_apr: @refinance.new_apr, new_payment: @refinance.new_payment, original_payment: @refinance.original_payment, savings_per_month: @refinance.savings_per_month, term: @refinance.term, total_savings: @refinance.total_savings } }
    end

    assert_redirected_to refinance_url(Refinance.last)
  end

  test "should show refinance" do
    get refinance_url(@refinance)
    assert_response :success
  end

  test "should get edit" do
    get edit_refinance_url(@refinance)
    assert_response :success
  end

  test "should update refinance" do
    patch refinance_url(@refinance), params: { refinance: { apr: @refinance.apr, new_apr: @refinance.new_apr, new_payment: @refinance.new_payment, original_payment: @refinance.original_payment, savings_per_month: @refinance.savings_per_month, term: @refinance.term, total_savings: @refinance.total_savings } }
    assert_redirected_to refinance_url(@refinance)
  end

  test "should destroy refinance" do
    assert_difference("Refinance.count", -1) do
      delete refinance_url(@refinance)
    end

    assert_redirected_to refinances_url
  end
end
