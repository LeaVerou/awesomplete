fixture.setBase("test/fixtures");

// finds DOM elements in tests
function $ (str, context) {
	return (context || fixture.el).querySelector(str);
}

// bundled fixture load/cleanup
$.fixture = function (fixtureName) {
	beforeEach(function () {
		// Awesomplete probably needs to cleanup this by itself
		try { Awesomplete.all = []; } catch(e) {};
		fixture.load(fixtureName + ".html");
	});

	afterEach(function () {
		fixture.cleanup();
	});
}

// $.noop returns a new empty function each time it's being called
Object.defineProperty($, "noop", {
	get: function () {
		return function noop () {}
	}
});
