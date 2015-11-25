describe("awesomplete.close", function () {

	$.fixture("plain");

	subject(function () { return new Awesomplete("#plain") });

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
		var handler = $.spyOnEvent(this.subject.input, "awesomplete-close");
		this.subject.close();

		expect(handler).toHaveBeenCalled();
	});
});
