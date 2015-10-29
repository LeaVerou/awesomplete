describe("awesomplete",function(){

	var awesompleter;
	var dummyInput;

	beforeEach(function(){
		var dummyBody = document.createElement('body');
		dummyInput = document.createElement('input');
		dummyBody.appendChild(dummyInput);
		awesompleter = new Awesomplete(dummyInput);
		shared.awesompleter = awesompleter;
	})

	describe("default object",function(){
		it("should have an empty list", shared.expectListLengthToBe(0));

		it("should have 2 min chars", shared.expectMinCharsToBe(2));

		it("should have 10 max items", shared.expectMaxItemsToBe(10));
	})

	describe("data-list", function(){
		beforeEach(function(){
			var dummyBody = document.createElement('body');
			dummyInput = document.createElement('input');
			dummyBody.appendChild(dummyInput);
			dummyInput.setAttribute('data-list', 'test1, test2, test3, test4, test5, test6, testtest1, testtest2, testtest3, testtest4, testtest5, testtest6');
			awesompleter = new Awesomplete(dummyInput);
			shared.awesompleter = awesompleter;
		})

		it("should have a non-empty list", shared.expectListLengthToBe(12));

		it("should have 2 min chars", shared.expectMinCharsToBe(2));

		it("should have 10 max items", shared.expectMaxItemsToBe(10));

		it("should not show any suggestions if input length is below min chars", shared.expectNumSuggestionsWith(0, 't'));

		it("should not show any suggestions if none match", shared.expectNumSuggestionsWith(0, 'nomatch'));

		it("should show up to max items of suggestions if more are available", shared.expectNumSuggestionsWith(10, 'test'));

		it("should show all matching suggestions if more are not available", shared.expectNumSuggestionsWith(6, 'testtest'));

		it("should autocomplete when a suggestion is selected", shared.expectSelectingFirstSuggestionToWorkWith('test'));
	})

	describe("custom object",function(){
		beforeEach(function(){
			var dummyBody = document.createElement('body');
			dummyInput = document.createElement('input');
			dummyBody.appendChild(dummyInput);
			awesompleter = new Awesomplete(dummyInput,{
				minChars:3,
				maxItems:8,
				list: ['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'testtest1', 'testtest2', 'testtest3', 'testtest4', 'testtest5', 'testtest6'],
				autoFirst: true
			})
			shared.awesompleter = awesompleter;
		})

		it("should have a non-empty list", shared.expectListLengthToBe(12));

		it("should have 3 min chars", shared.expectMinCharsToBe(3));

		it("should have 8 max items", shared.expectMaxItemsToBe(8));

		it("should not show any suggestions if input length is below min chars", shared.expectNumSuggestionsWith(0, 'te'));

		it("should not show any suggestions if none match", shared.expectNumSuggestionsWith(0, 'nomatch'));

		it("should show matching suggestions if input length is above min chars", shared.expectNumSuggestionsWith(8, 'tes'));

		it("should show up to max items of suggestions if more are available", shared.expectNumSuggestionsWith(8, 'test'));

		it("should show all matching suggestions if more are not available", shared.expectNumSuggestionsWith(6, 'testtest'));

		it("should autocomplete when a suggestion is selected", shared.expectSelectingFirstSuggestionToWorkWith('test'));

		it("should autocomplete the first suggestion when autoFirst is true", shared.expectAutoFirstToWorkWith('test'));
	})
});

describe("awesomplete helpers",function(){

	describe("$ function",function(){

		it("should return null when is called without input",function(){
			var null_selector = Awesomplete.$();
			expect(null_selector).toBe(null);
		})


		it("should escape regular expression tokens",function(){
			var string_with_tokens = "[^j(a)v?a-sc|ri\\p+t*]";
			var escape_string = Awesomplete.$.regExpEscape(string_with_tokens);
			expect(escape_string).toBe("\\[\\^j\\(a\\)v\\?a\\-sc\\|ri\\\\p\\+t\\*\\]");
		})
	})

	describe("$ function spy",function(){
		beforeEach(function(){
			spyOn(Awesomplete,'$');
			Awesomplete.$(null);
		})

		it("should call the query selector function",function(){
			expect(Awesomplete.$).toHaveBeenCalled();
		})

		it("should have been called with null when called with no args",function(){
			expect(Awesomplete.$).toHaveBeenCalledWith(null);
		})
	})

});
