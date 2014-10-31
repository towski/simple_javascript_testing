require 'bundler/setup'
require 'minitest/autorun'
require 'action_controller'
require 'simple_javascript_testing'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

class SomeApplication < Rails::Application
end

module ApplicationHelper
end

class ApplicationController < ActionController::Base
end

Rails.application.initialize!

SharedTestRoutes = ActionDispatch::Routing::RouteSet.new
@routes = SharedTestRoutes

@routes.draw do
  get ':controller(/:action)'
end

class SimpleJavascriptTestingTest < Minitest::Test
  def test_template_with_js
    SimpleJavascriptTesting.test_template_with_js "users/index"
  end
end
