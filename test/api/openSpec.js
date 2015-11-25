describe("awesomplete.open", function () {

	$.fixture("plain");

	subject(function () { return new Awesomplete("#plain", this.options) });

	it("opens completer", function () {
		this.subject.open();
		expect(this.subject.ul.hasAttribute("hidden")).toBe(false);
	});

	// Exposes this bug https://github.com/LeaVerou/awesomplete/pull/16740
	// FIXME better fix is probably required as discussed in PR above
	xit("fills in the list on creation", function () {
		$("#plain").value = "ite";
		this.options = { list: "item1, item2" };
		this.subject.open();

		expect(this.subject.ul.children.length).toBe(2);
	});

	it("fires awesomplete-open event", function () {
		var handler = $.spyOnEvent(this.subject.input, "awesomplete-open");
		this.subject.open();

		expect(handler).toHaveBeenCalled();
	});

	describe("with autoFirst: true", function () {
		def("options", function () { return { autoFirst: true } });

		it("automatically selects first item", function () {
			spyOn(this.subject, "goto");
			this.subject.open();

			expect(this.subject.goto).toHaveBeenCalledWith(0);
		});
	});

	describe("with autoFirst: false", function () {
		def("options", function () { return { autoFirst: false } });

		it("does not select any item", function () {
			this.subject.open();

			expect(this.subject.selected).toBe(false);
			expect(this.subject.index).toBe(-1);
		});
	});
});
