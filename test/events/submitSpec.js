describe("form submit event", function () {

	$.fixture("options");

	subject(function () {
		return new Awesomplete("#inside-form", { list: ["item1", "item2", "item3"] });
	});

	beforeEach(function () {
		spyOn(Awesomplete.prototype, "close");
		this.subject.input.focus();
		this.subject.open();
	});

	it("closes completer", function () {
		$.fire(this.subject.input.form, "submit");
		expect(Awesomplete.prototype.close).toHaveBeenCalled();
	});
});
