describe("mousedown event", function () {

	$.fixture("plain");

	subject(function () {
		return new Awesomplete("#plain", { list: ["item1", "item2", "item3"] });
	});

	beforeEach(function () {
		this.subject.input.focus();
		this.subject.open();
		$.type(this.subject.input, "ite");
		this.subject.next();

		spyOn(this.subject, "select");
	});

	def("li", function () { return this.subject.ul.children[1] });

	describe("with ul target", function () {
		def("target", function () { return this.subject.ul });

		it("does not select item", function () {
			$.fire(this.target, "mousedown", { button: 0 });
			expect(this.subject.select).not.toHaveBeenCalled();
		});
	});

	describe("with li target", function () {
		def("target", function () { return this.li });

		describe("on left click", function () {
			it("selects item", function () {
				$.fire(this.target, "mousedown", { button: 0 });
				expect(this.subject.select).toHaveBeenCalledWith(this.li);
			});
		});

		describe("on right click", function () {
			it("does not select item", function () {
				$.fire(this.target, "mousedown", { button: 2 });
				expect(this.subject.select).not.toHaveBeenCalled();
			});
		});
	});

	describe("with child of li target", function () {
		def("target", function () { return $("mark", this.li) });

		it("selects item", function () {
			$.fire(this.target, "mousedown", { button: 0 });
			expect(this.subject.select).toHaveBeenCalledWith(this.li);
		});
	});
});
