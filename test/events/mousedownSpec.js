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
	});

	describe("with ul target", function () {
		it("does not select item", function () {
			spyOn(this.subject, "select");
			$.fire(this.subject.ul, "mousedown");

			expect(this.subject.select).not.toHaveBeenCalled();
		});
	});

	describe("with li target", function () {
		it("selects item", function () {
			var li = this.subject.ul.children[1];
			spyOn(this.subject, "select");
			$.fire(li, "mousedown");

			expect(this.subject.select).toHaveBeenCalledWith(li);
		});
	});

	describe("with child of li target", function () {
		it("selects item", function () {
			var li = this.subject.ul.children[1];
			spyOn(this.subject, "select");
			$.fire($("mark", li), "mousedown");

			expect(this.subject.select).toHaveBeenCalledWith(li);
		});
	});
});
