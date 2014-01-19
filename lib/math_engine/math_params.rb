class MathParams
  I18n.config.enforce_available_locales = true
  include ActiveModel::Validations

  attr_accessor :n1, :n2, :op

  validates :n1, presence: true, numericality: true
  validates :n2, presence: true, numericality: true
  validates :op, presence: true, inclusion: {in: ['+', '-', '*', '/']}

  def initialize(params)
    self.n1 = params[:n1]
    self.n2 = params[:n2]
    self.op = params[:op]
  end
end
