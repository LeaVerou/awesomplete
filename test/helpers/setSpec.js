describe("Awesomplete.$.set", function () {

	$.fixture("options");

	subject(function () { return Awesomplete.$.set(this.tag, this.options || {}) });

	def("tag", document.createElement("div"));

	it("sets DOM element", function () {
		expect(this.subject instanceof HTMLElement).toBe(true);
	});

	describe("with various tag names", function () {
		it("sets <ul> element", function () {
			this.tag = document.createElement("ul");
			expect(this.subject.tagName).toEqual("UL");
		});

		it("sets <li> element", function () {
			this.tag = document.createElement("li");
			expect(this.subject.tagName).toEqual("LI");
		});
	});

	describe("without options", function () {
		it("sets element without any attributes", function () {
			expect(this.subject.attributes.length).toEqual(0);
		});
	});

	describe("with simple options", function () {
		it("assigns properties", function () {
			this.options = { id: "id1", className: "class-name" };

			expect(this.subject.id).toEqual("id1");
			expect(this.subject.className).toEqual("class-name");
		});

		it("assigns attributes", function () {
			this.options = { attr1: "val1", attr2: "val2" };

			expect(this.subject.getAttribute("attr1")).toEqual("val1");
			expect(this.subject.getAttribute("attr2")).toEqual("val2");
		});
	});

	describe("with option for boolean attribute/property", function () {
		it("assigns from true value", function () {
			this.options = { hidden: true };
			expect(this.subject.hasAttribute("hidden")).toBe(true);
		});

		it("assigns from truthy value", function () {
			this.options = { hidden: "hidden" };
			expect(this.subject.hasAttribute("hidden")).toBe(true);
		});

		it("assigns from false value", function () {
			this.options = { hidden: false };
			expect(this.subject.hasAttribute("hidden")).toBe(false);
		});

		it("assigns from falsy value", function () {
			this.options = { hidden: "" };
			expect(this.subject.hasAttribute("hidden")).toBe(false);
		});
	});

	describe("with inside: option", function () {
		it("appends to container by element", function () {
			this.options = { inside: $("#data-list") };

			expect(this.subject).toEqual(this.options.inside.lastChild);
		});

		it("appends to container by selector", function () {
			this.options = { inside: "#data-list" };

			expect(this.subject).toEqual($(this.options.inside).lastChild);
		});
	});

	describe("with around: option", function () {
		it("wraps specified element", function () {
			this.options = { around: $("#no-options") };

			var originalParent = this.options.around.parentNode;
			expect(this.subject.parentNode).toEqual(originalParent);

			expect(this.subject.firstChild).toEqual(this.options.around);
		});

		it("wraps element specified by selector", function () {
			this.options = { around: "#no-options" };

			var originalParent = $(this.options.around).parentNode;
			expect(this.subject.parentNode).toEqual(originalParent);

			expect(this.subject.firstChild).toEqual($(this.options.around));
		});
	});
});
