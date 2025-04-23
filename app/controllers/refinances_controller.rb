class RefinancesController < ApplicationController
  before_action :set_refinance, only: %i[ show edit update destroy ]

  # GET /refinances or /refinances.json
  def index
    @refinances = Refinance.all
  end

  # GET /refinances/1 or /refinances/1.json
  def show
  end

  # GET /refinances/new
  def new
    @refinance = Refinance.new
  end

  # GET /refinances/1/edit
  def edit
  end

  # POST /refinances or /refinances.json
  def create
    @refinance = Refinance.new(refinance_params)

    respond_to do |format|
      if @refinance.save
        format.html { redirect_to @refinance, notice: "Refinance was successfully created." }
        format.json { render :show, status: :created, location: @refinance }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @refinance.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /refinances/1 or /refinances/1.json
  def update
    respond_to do |format|
      if @refinance.update(refinance_params)
        format.html { redirect_to @refinance, notice: "Refinance was successfully updated." }
        format.json { render :show, status: :ok, location: @refinance }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @refinance.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /refinances/1 or /refinances/1.json
  def destroy
    @refinance.destroy!

    respond_to do |format|
      format.html { redirect_to refinances_path, status: :see_other, notice: "Refinance was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_refinance
      @refinance = Refinance.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def refinance_params
      params.require(:refinance).permit(:amount, :term, :apr, :new_apr)
    end    
end
