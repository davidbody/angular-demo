class MathParams
  I18n.config.enforce_available_locales = true
  include ActiveModel::Validations

  attr_accessor :n1, :n2

  validates :n1, presence: true, numericality: true
  validates :n2, presence: true, numericality: true

  def initialize(params)
    self.n1 = params[:n1]
    self.n2 = params[:n2]
  end
end
