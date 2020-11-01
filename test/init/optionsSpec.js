describe("Constructor options", function () {

	$.fixture("options");

	subject(function () { return new Awesomplete(this.element, this.options) });

	describe("with default options", function () {
		def("element", "#with-data-list");

		it("requires minimum 2 chars to open completer", function () {
			expect(this.subject.minChars).toBe(2);
		});

		it("shows 10 items in completer", function () {
			expect(this.subject.maxItems).toBe(10);
		});

		it("does not select the first ocurrence automatically" , function () {
			expect(this.subject.autoFirst).toBe(false);
		});

		it("modifies list item with DATA", function () {
			expect(this.subject.data).toBe(Awesomplete.DATA);
		});

		it("filters with FILTER_CONTAINS", function () {
			expect(this.subject.filter).toBe(Awesomplete.FILTER_CONTAINS);
		});

		it("orders with SORT_BYLENGTH", function () {
			expect(this.subject.sort).toBe(Awesomplete.SORT_BYLENGTH);
		});

		it("creates item with ITEM", function () {
			expect(this.subject.item).toEqual(Awesomplete.ITEM);
		});

		it("replaces input value with REPLACE", function () {
			expect(this.subject.replace).toEqual(Awesomplete.REPLACE);
		});

		it("creates a default Suggestion", function () {
			expect(this.subject.suggestion.toString()).toMatch(/function Suggestion\(/);
		});
	});

	describe("with custom options in constructor", function () {
		def("element", "#with-data-list");
		def("options", function () {
			return {
				minChars: 3,
				maxItems: 9,
				autoFirst: true,
				filter: $.noop,
				sort: $.noop,
				item: $.noop,
				replace: $.noop
			};
		});

		it("overrides simple default options", function () {
			expect(this.subject.minChars).toBe(3);
			expect(this.subject.maxItems).toBe(9);
			expect(this.subject.autoFirst).toBe(true);
		});

		it("overrides default functions", function () {
			expect(this.subject.filter).toBe(this.options.filter);
			expect(this.subject.sort).toBe(this.options.sort);
			expect(this.subject.item).toBe(this.options.item);
			expect(this.subject.replace).toBe(this.options.replace);
		});
	});

	describe("with custom options in data-* attributes", function () {
		def("element", "#with-custom-options");

		it("overrides simple default options", function () {
			expect(this.subject.minChars).toBe(4);
			expect(this.subject.maxItems).toBe(8);
			expect(this.subject.autoFirst).toBe(true);
		});
	});

	describe("with a custom suggestion option", function () {
		def("element", "#with-data-list");

		function CustomSuggestion1(data) {
			var o = Array.isArray(data)
			? { label: data[0], value: data[1] }
			: typeof data === "object" && "label" in data && "value" in data ? data : { label: data, value: data };

			this.label = o.label || o.value;
			this.value = o.value;
			this.custom = o.label.toUpperCase();
		}

		Object.defineProperty(CustomSuggestion1.prototype = Object.create(String.prototype), "length", {
			get: function() { return this.label.length; }
		});

		CustomSuggestion1.prototype.toString = CustomSuggestion1.prototype.valueOf = function () {
			return "" + this.label;
		};

		function CustomSuggestion2(data) {
			var o = Array.isArray(data)
			? { label: data[0], value: data[1] }
			: typeof data === "object" && "label" in data && "value" in data ? data : { label: data, value: data };

			this.label = o.label || o.value;
			this.value = o.value;
			this.custom = o.label.toLowerCase();
		}

		Object.defineProperty(CustomSuggestion2.prototype = Object.create(String.prototype), "length", {
			get: function() { return this.label.length; }
		});

		CustomSuggestion2.prototype.toString = CustomSuggestion2.prototype.valueOf = function () {
			return "" + this.label;
		};

		describe("using a class", function () {
			def("options", function () {
				return {
					minChars: 0,
					filter: function (item) { return item; },
					sort: $.noop,
					item: function (suggestion) {
						var element = document.createElement("li");
						element.textContent = suggestion.custom;

						return element;
					},
					replace: $.noop,
					suggestion: CustomSuggestion1
				};
			});

			it("overrides simple default options", function () {
				this.subject.evaluate();

				this.subject._list.forEach(function (item, index) {
					expect(this.subject.ul.children[index].textContent).toEqual(item.label.toUpperCase());
				}, this);
			});
		});

		describe("using a function to return different classes", function () {
			def("options", function () {
				return {
					minChars: 0,
					filter: function (item) { return item; },
					sort: $.noop,
					item: function (suggestion) {
						var element = document.createElement("li");
						element.textContent = suggestion.custom;

						return element;
					},
					replace: $.noop,
					suggestion: function (datum) {
						if (datum.label === "Data") {
							return new CustomSuggestion1(datum);
						} else {
							return new CustomSuggestion2(datum);
						}
					}
				};
			});

			it("overrides simple default options", function () {
				this.subject.suggestion = this.subject.suggestion.bind(this.subject);
				this.subject.evaluate();

				this.subject._list.forEach(function (item, index) {
					if (item.label === "Data") {
						expect(this.subject.ul.children[index].textContent).toEqual(item.label.toUpperCase());
					} else {
						expect(this.subject.ul.children[index].textContent).toEqual(item.label.toLowerCase());
					}
				}, this);
			});
		});
	});
});
