describe("input event", function () {

	$.fixture("plain");

	subject(function () {
		return new Awesomplete("#plain", { list: ["item1", "item2", "item3"] });
	});

	it("rebuilds the list", function () {
		spyOn(Awesomplete.prototype, "evaluate");
		this.subject.input.focus();
		this.subject.open();

		$.type(this.subject.input, "ite");
		expect(Awesomplete.prototype.evaluate).toHaveBeenCalled();
	});
});
