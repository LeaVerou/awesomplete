describe("keydown event", function () {

	$.fixture("plain");

	subject(function () {
		return new Awesomplete("#plain", { list: ["item1", "item2", "item3"] });
	});

	beforeEach(function () {
		this.subject.open();
		this.subject.input.focus();
		$.type(this.subject.input, "ite");
	});

	it("supports enter", function () {
		this.subject.next();

		spyOn(this.subject, "select");
		$.keydown(this.subject.input, $.k.ENTER);

		expect(this.subject.select).toHaveBeenCalled();
	});

	it("supports escape", function () {
		spyOn(this.subject, "close");
		$.keydown(this.subject.input, $.k.ESC);

		expect(this.subject.close).toHaveBeenCalled();
	});

	it("supports down arrow", function () {
		spyOn(this.subject, "next");
		$.keydown(this.subject.input, $.k.DOWN);

		expect(this.subject.next).toHaveBeenCalled();
	});

	it("supports up arrow", function () {
		spyOn(this.subject, "previous");
		$.keydown(this.subject.input, $.k.UP);

		expect(this.subject.previous).toHaveBeenCalled();
	});

	it("does nothing if not opened", function () {
		this.subject.close();

		spyOn(this.subject, "next");
		$.keydown(this.subject.input, $.k.DOWN);

		expect(this.subject.next).not.toHaveBeenCalled();
	});
});
