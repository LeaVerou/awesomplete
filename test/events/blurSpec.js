describe("blur event", function () {

	$.fixture("plain");

	subject(function () {
		return new Awesomplete("#plain", { list: ["item1", "item2", "item3"] });
	});

	it("closes completer", function () {
		spyOn(Awesomplete.prototype, "close");
		this.subject.input.focus();
		this.subject.open();

		$.fire(this.subject.input, "blur");
		expect(Awesomplete.prototype.close).toHaveBeenCalled();
	});
});
