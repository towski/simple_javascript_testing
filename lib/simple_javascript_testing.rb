require 'fileutils'
require 'render_anywhere'

class AnyClass
  include RenderAnywhere

  class << self
    attr_accessor :prefix
  end

  def build_html(template)
    html = render :template => template,
                  :layout => 'application'
    html
  end
  # Include an additional helper
  # If being used in a rake task, you may need to require the file(s)
  # Ex: require Rails.root.join('app', 'helpers', 'blog_pages_helper')
  def include_helper(helper_name)
    set_render_anywhere_helpers(helper_name)
  end

  # Apply an instance variable to the controller
  # If you need to use instance variables instead of locals, just call this method as many times as you need.
  def set_instance_variable_to(var, value)
    set_instance_variable(var, value)
  end

  class RenderingController < RenderAnywhere::RenderingController
    # include custom modules here, define accessors, etc. For example:
    attr_accessor :current_user
    helper_method :current_user
  end
end

module SimpleJavascriptTesting
  def self.test_template_with_js(template, &block)
    data = AnyClass.new
    if block_given?
      yield data
    end
    FileUtils.mkdir_p("test/html/#{File.dirname template}")
    FileUtils.mkdir_p("test/javascript/#{File.dirname template}")
    html = data.build_html(template)
    html.gsub!("<head>", "<head><script src='#{File.expand_path('node_modules')}/simple_javascript_testing/lib/stub_ajax.js'></script>")
    html.gsub!("<script src='#{AnyClass.prefix}", "<script src='#{File.expand_path('public')}")
    File.write("test/html/#{template}.html", html)
    thing = "#{File.expand_path('html', 'test')}/#{template}"
    thing2 = "#{File.expand_path('javascript', 'test')}/#{template}"
    system "phantomjs #{thing2}.js #{thing}.html"
  end
end
