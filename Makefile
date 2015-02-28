source = awesomplete.js

banner = "// Awesomplete - Lea Verou - MIT license"
minified = awesomplete.min.js

minify:
	@echo "Minifying..."
	@rm -f $(minified)
	@echo $(banner) > $(minified)
	@curl -s \
		-X POST \
		--data-urlencode 'compilation_level=SIMPLE_OPTIMIZATIONS' \
		--data-urlencode 'output_format=text' \
		--data-urlencode 'output_info=compiled_code' \
		--data-urlencode 'language=ECMASCRIPT5' \
		--data-urlencode 'js_code@$(source)' \
		http://closure-compiler.appspot.com/compile \
		>> $(minified)

.PHONY: minify