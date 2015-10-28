describe("awesomplete",function(){

	var awesompleter;
	var dummyInput;

	beforeEach(function(){
		var dummyBody = document.createElement('body');
		dummyInput = document.createElement('input');
		dummyBody.appendChild(dummyInput);
		awesompleter = new Awesomplete(dummyInput);
	})

	describe("default object",function(){
		
		it("should have an empty list",function(){
			expect(awesompleter._list.length).toBe(0);
		})

		it("should have 2 min chars",function(){
			expect(awesompleter.minChars).toBe(2);
		})

		it("should have 10 max items",function(){
			expect(awesompleter.maxItems).toBe(10);
		})	
	})

	describe("custom object",function(){
		it("should have a non-empty list",function(){
			awesompleter.list = ["Prolog"];
			expect(awesompleter._list.length).toBe(1);
		})

		it("should have 3 min chars",function(){
			awesompleter = new Awesomplete(dummyInput,{minChars:3});
			expect(awesompleter.minChars).toBe(3);
		})

        // see http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.4.11
        // Chrome's native Array.prototype.sort does not perform stable sorts with arrays above 10 items.
        it("should perform a stable sort inside evaluation chain",function(){
            var origList = ["New York","Staten Island","Jamaica","Schenectady","Flushing","White Plains","Great Neck","Yonkers","Utica","Elmira","Binghamton"];

			awesompleter = new Awesomplete(dummyInput,{minChars:0, sort: function(a,b){ return 0;}});
            awesompleter.list = origList;
            awesompleter.evaluate();
            expect(awesompleter._currentEvaluation).toEqual(origList);
        })

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
