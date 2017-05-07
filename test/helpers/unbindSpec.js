describe("Awesomplete.$.unbind", function () {

	$.fixture("plain");

	subject(function () {
		return function () { Awesomplete.$.unbind(this.element, this.events) };
	});

	describe("with invalid element", function () {
		it("does nothing if element is undefined", function () {
			this.element = undefined;
			expect(this.subject).not.toThrow();
		});

		it("does nothing if element is null", function () {
			this.element = null;
			expect(this.subject).not.toThrow();
		});

		it("does nothing if element is false", function () {
			this.element = false;
			expect(this.subject).not.toThrow();
		});

		it("does nothing if element is 0", function () {
			this.element = 0;
			expect(this.subject).not.toThrow();
		});

		it("does nothing if element is empty string", function () {
			this.element = "";
			expect(this.subject).not.toThrow();
		});
	});

	describe("with valid element", function () {
		def("element", function () { return $("#plain") });

		beforeEach(function () {
			spyOn(this.element, "removeEventListener");
		});

		it("removes event listeners for all events", function () {
			this.events = { click: $.noop, input: $.noop };
			this.subject();

			expect(this.element.removeEventListener).toHaveBeenCalledWith("click", this.events.click);
			expect(this.element.removeEventListener).toHaveBeenCalledWith("input", this.events.input);
		});

		it("removes single event listener for multiple events", function () {
			this.events = { "click input": $.noop };
			this.subject();

			expect(this.element.removeEventListener).toHaveBeenCalledWith("click", this.events["click input"]);
			expect(this.element.removeEventListener).toHaveBeenCalledWith("input", this.events["click input"]);
		});
	});
});
