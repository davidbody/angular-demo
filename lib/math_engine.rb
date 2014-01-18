require 'bundler'
ENV['RACK_ENV'] ||= 'development'
Bundler.require :default, ENV['RACK_ENV'].to_sym

require_relative 'math_engine/math_params'

class MathEngine
  def self.add(params)
    params.n1.to_f + params.n2.to_f
  end
end
