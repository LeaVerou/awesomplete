describe("awesomplete.goto", function () {

	$.fixture("plain");

	subject(function () {
		return new Awesomplete("#plain", { list: ["item1", "item2", "item3"] });
	});

	def("firstIndex", function () { return 0 });
	def("lastIndex", function () { return this.subject.ul.children.length - 1 });

	beforeEach(function () {
		$.type(this.subject.input, "ite");
	});

	it("clears previous aria-selected", function () {
		this.subject.goto(this.firstIndex);
		this.subject.goto(this.lastIndex);

		expect(this.subject.ul.children[this.firstIndex].getAttribute("aria-selected")).toBe("false");
	});

	it("goes to first item", function () {
		this.subject.goto(this.firstIndex);
		expect(this.subject.index).toBe(this.firstIndex);
	});

	it("goes to last item", function () {
		this.subject.goto(this.lastIndex);
		expect(this.subject.index).toBe(this.lastIndex);
	});

	it("fires awesomplete-highlight event", function () {
		var handler = $.spyOnEvent(this.subject.input, "awesomplete-highlight");
		this.subject.goto(1);

		expect(handler).toHaveBeenCalled();
	});

	describe("with item index > -1", function () {
		beforeEach(function () {
			this.subject.goto(this.firstIndex);
		});

		it("sets aria-selected", function () {
			expect(this.subject.ul.children[this.firstIndex].getAttribute("aria-selected")).toBe("true");
		});

		it("updates status", function () {
			expect(this.subject.status.textContent).toBe("item1");
		});
	});

	describe("with item index = -1", function () {
		beforeEach(function () {
			this.subject.goto(this.firstIndex);
			this.subject.goto(-1);
		});

		it("does not update status", function () {
			expect(this.subject.status.textContent).toBe("item1");
		});
	});
});
