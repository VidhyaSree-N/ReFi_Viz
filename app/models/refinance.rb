class Refinance < ApplicationRecord
    # Calculates monthly payment using amortization formula
    validates :amount, :term, :apr, :new_apr, presence: true
    
    def monthly_payment(principal, apr, term)
      rate = apr / 100.0 / 12
      (principal * rate / (1 - (1 + rate) ** -term)).round(2)
    end
  
    def original_payment
      monthly_payment(amount, apr, term)
    end
  
    def new_payment
      monthly_payment(amount, new_apr, term)
    end
  
    def savings_per_month
      (original_payment - new_payment).round(2)
    end
  
    def total_savings
      (savings_per_month * term).round(2)
    end
    
    def yearly_savings
        (savings_per_month * 12).round(2)
    end 
    
    def total_cost_original
        (original_payment * term).round(2)
    end
      
    def total_cost_new
       (new_payment * term).round(2)
    end
      
  end
  
