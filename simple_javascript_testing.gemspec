Gem::Specification.new do |s|
  s.name        = 'simple_javascript_testing'
  s.version     = '0.0.1'
  s.date        = '2014-10-31'
  s.summary     = "Simple Javascript Testing"
  s.description = "simple javascript testing for rails with phantomjs"
  s.authors     = ["towski"]
  s.email       = 'towski@gmail.com'
  s.homepage    = 'http://rubygems.org/gems/simple_javascript_testing'
  s.license     = 'MIT'
  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]

  s.add_dependency('rails', '>= 3.0.7')
end
