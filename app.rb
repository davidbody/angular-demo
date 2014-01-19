require 'sinatra/base'
require 'sinatra/json'
require './lib/math_engine'

class MathService < Sinatra::Base
  set :show_exceptions, false

  get '/' do
    send_file File.join(settings.public_folder, 'index.html')
  end

  get '/calculate/?' do
    math_params = MathParams.new(params)
    if math_params.valid?
      result = MathEngine.calculate(math_params)
      json result: result
    else
      status 400
      json errors: math_params.errors.messages
    end
  end

  error do
    json errors: { "exception" => [env['sinatra.error'].message] }
  end
end
