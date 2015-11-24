fixture.setBase("test/fixtures");

// finds DOM elements in tests
function $ (str, context) {
	return (context || fixture.el).querySelector(str);
}

function $$ (str, context) {
	return (context || fixture.el).querySelectorAll(str);
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
};

$.on = function (element, event, callback) {
	element.addEventListener(event, callback);
};

$.fire = function (target, type, properties) {
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent(type, true, true );
	for (var j in properties) {
		evt[j] = properties[j];
	}
	target.dispatchEvent(evt);
};

// simulates text input (very simple, only "input" event is fired)
$.type = function (input, text) {
	input.focus();
	input.value = text;
	$.fire(input, "input");
}

// $.noop returns a new empty function each time it's being called
Object.defineProperty($, "noop", {
	get: function () {
		return function noop () {}
	}
});
