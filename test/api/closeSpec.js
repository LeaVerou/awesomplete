describe("awesomplete.close", function () {

	$.fixture("plain");

	subject(function () { return new Awesomplete("#plain") });

	def("events", function () { return { closed: $.noop } });

	beforeEach(function () {
		this.subject.open();
		this.subject.next();
	});

	it("closes completer", function () {
		this.subject.close();
		expect(this.subject.ul.hasAttribute("hidden")).toBe(true);
	});

	it("makes no item selected", function () {
		this.subject.close();

		expect(this.subject.selected).toBe(false);
		expect(this.subject.index).toBe(-1);
	});

	it("fires awesomplete-close event", function () {
		spyOn(this.events, "closed")
		$.on(this.subject.input, "awesomplete-close", this.events.closed);

		this.subject.close();
		expect(this.events.closed).toHaveBeenCalled();
	});
});
