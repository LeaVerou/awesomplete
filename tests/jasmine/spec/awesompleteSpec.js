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