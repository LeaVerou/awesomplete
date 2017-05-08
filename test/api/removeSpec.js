describe("awesomplete.destroy", function () {

	$.fixture("plain");

	subject(function () { return new Awesomplete("#plain", { list: ["item1", "item2", "item3"] }) });

	beforeEach(function () {
		$.type(this.subject.input, "ite");
		this.subject.open();
		this.subject.next();
	});

	it("removes its elements from the DOM", function () {
		var instance = this.subject;
		var inputParentBefore = this.subject.input.parentNode;

		instance.destroy();

		expect(instance.input.parentNode).not.toBe(inputParentBefore);
		expect(document.body.contains(instance.container)).toBeFalsy();
		expect(document.body.contains(instance.ul)).toBeFalsy()
	});

	it("removes the autocomplete and aria-autocomplete attributes", function() {
		var instance = this.subject;

		instance.destroy();

		expect(instance.input.getAttribute("autocomplete")).toBeNull();
		expect(instance.input.getAttribute("aria-autocomplete")).toBeNull();
	});

	it("removes event listeners from form and input", function () {
		var instance = this.subject;
		var events = instance._events;

		spyOn(events.input, "blur");

		instance.destroy();

		Awesomplete.$.fire(instance.input, "blur");

		expect(events.input.blur).not.toHaveBeenCalledTimes(1);
	});

	it("removes itself from the global list of instances", function() {
		var countBefore = Awesomplete.all.length;

		this.subject.destroy();

		var countAfter = Awesomplete.all.length;

		expect(countAfter).toBeLessThan(countBefore);
	});
});
