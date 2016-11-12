describe("mousedown event", function () {

	$.fixture("plain");

	subject(function () {
		return new Awesomplete("#plain", { list: ["item1", "item2", "item3"] });
	});

	def("li", function () { return this.subject.ul.children[1] });

	beforeEach(function () {
		$.type(this.subject.input, "ite");
		spyOn(this.subject, "select");
	});

	describe("with ul target", function () {
		def("target", function () { return this.subject.ul });

		it("does not select item and keeps the input focussed", function () {
			$.fire(this.target, "mousedown", { button: 0 });
			expect(this.subject.select).not.toHaveBeenCalled();
			expect(this.subject.input).toBe(document.activeElement);
		});
	});

	describe("with li target", function () {
		def("target", function () { return this.li });

		describe("on left click", function () {
			it("does not select item and keeps the input focussed", function () {
				var event = $.fire(this.target, "mousedown", { button: 0 });
				expect(this.subject.select).not.toHaveBeenCalled();
				expect(event.defaultPrevented).toBe(true);
				expect(this.subject.input).toBe(document.activeElement);
			});
		});

		describe("on right click", function () {
			it("does not select item and keeps the input focussed", function () {
				var event = $.fire(this.target, "mousedown", { button: 2 });
				expect(this.subject.select).not.toHaveBeenCalled();
				expect(event.defaultPrevented).toBe(true);
				expect(this.subject.input).toBe(document.activeElement);
			});
		});
	});

	describe("with child of li target", function () {
		def("target", function () { return $("mark", this.li) });

		describe("on left click", function () {
			it("does not select item and keeps the input focussed", function () {
				var event = $.fire(this.target, "mousedown", { button: 0 });
				expect(this.subject.select).not.toHaveBeenCalled();
				expect(event.defaultPrevented).toBe(true);
				expect(this.subject.input).toBe(document.activeElement);
			});
		});

		describe("on right click", function () {
			it("does not select item and keeps the input focussed", function () {
				var event = $.fire(this.target, "mousedown", { button: 2 });
				expect(this.subject.select).not.toHaveBeenCalled();
				expect(event.defaultPrevented).toBe(true);
				expect(this.subject.input).toBe(document.activeElement);
			});
		});
	});
});
