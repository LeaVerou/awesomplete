describe("awesomplete.select", function () {

	$.fixture("plain");

	subject(function () {
		return new Awesomplete("#plain", { list: ["item1", "item2", "item3"] });
	});

	def("events", function () { return { select: $.noop, complete: $.noop} });
	def("firstIndex", function () { return 0 });
	def("lastIndex", function () { return this.subject.ul.children.length - 1 });
	def("lastLi", function () { return this.subject.ul.children[this.lastIndex] });

	beforeEach(function () {
		$.type(this.subject.input, "ite");
	});

	describe("with closed completer", itDoesNotSelectAnyItem);

	describe("with opened completer", function () {
		beforeEach(function () {
			this.subject.open();
		});

		describe("and no current item", itDoesNotSelectAnyItem);

		describe("and current item", function () {
			beforeEach(function () {
				this.subject.goto(this.firstIndex);
			});

			itSelects("item1");
		});

		describe("and item specified as argument", function () {
			def("selectArgument", function () { return this.lastLi });

			itSelects("item3");
		});
	});

	// Shared behaviors

	function itSelects(expectedTxt) {
		it("fires awesomplete-select event", function () {
			spyOn(this.events, "select");
			$.on(this.subject.input, "awesomplete-select", this.events.select);
			this.subject.select(this.selectArgument);

			expect(this.events.select).toHaveBeenCalledWith(jasmine.objectContaining({ text: expectedTxt }));
		});

		describe("and awesomplete-select event was not prevented", function () {
			beforeEach(function () {
				this.events.select = $.noop;
				$.on(this.subject.input, "awesomplete-select", this.events.select);
			});

			it("changes the input value", function () {
				this.subject.select(this.selectArgument);
				expect(this.subject.input.value).toBe(expectedTxt);
			});

			it("closes completer", function () {
				spyOn(this.subject, "close");
				this.subject.select(this.selectArgument);

				expect(this.subject.close).toHaveBeenCalled();
			});

			it("fires awesomplete-selectcomplete event", function () {
				spyOn(this.events, "complete");
				this.subject.input.addEventListener("awesomplete-selectcomplete", this.events.complete);
				this.subject.select(this.selectArgument);

				expect(this.events.complete).toHaveBeenCalled();
			});
		});

		describe("and awesomplete-select event was prevented", function () {
			beforeEach(function () {
				this.events.select = function(evt) { evt.preventDefault() };
				$.on(this.subject.input, "awesomplete-select", this.events.select);
			});

			it("does not change the input value", function () {
				this.subject.select(this.selectArgument);
				expect(this.subject.input.value).toBe("ite");
			});

			it("does not close completer", function () {
				spyOn(this.subject, "close");
				this.subject.select(this.selectArgument);

				expect(this.subject.close).not.toHaveBeenCalled();
			});

			it("does not fire awesomplete-selectcomplete event", function () {
				spyOn(this.events, "complete");
				this.subject.input.addEventListener("awesomplete-selectcomplete", this.events.complete);
				this.subject.select(this.selectArgument);

				expect(this.events.complete).not.toHaveBeenCalled();
			});
		});
	}

	function itDoesNotSelectAnyItem() {
		it("does not change the input value", function () {
			this.subject.select();
			expect(this.subject.input.value).toBe("ite");
		});

		it("does not fire awesomplete-select event", function () {
			spyOn(this.events, "select");
			$.on(this.subject.input, "awesomplete-select", this.events.select);
			this.subject.select();

			expect(this.events.select).not.toHaveBeenCalled();
		});

		it("does not fire awesomplete-selectcomplete event", function () {
			spyOn(this.events, "complete");
			this.subject.input.addEventListener("awesomplete-selectcomplete", this.events.complete);
			this.subject.select();

			expect(this.events.complete).not.toHaveBeenCalled();
		});
	}
});
