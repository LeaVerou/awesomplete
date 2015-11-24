var shared = {
  expectMinCharsToBe: function(num){
    return function(){
      expect(shared.awesompleter.minChars).toBe(num);
    }
  },
  expectMaxItemsToBe: function(num){
    return function(){
      expect(shared.awesompleter.maxItems).toBe(num);
    }
  },
  expectNumSuggestionsWith: function(num, val){
    return function(){
      shared.awesompleter.input.value = val;
      shared.awesompleter.evaluate();
      expect(shared.awesompleter.ul.children.length).toBe(num);
    }
  },
  expectListLengthToBe: function(num){
    return function(){
      expect(shared.awesompleter._list.length).toBe(num);
    }
  },
  expectSelectingFirstSuggestionToWorkWith: function(val){
    return function(){
			var li;
			shared.awesompleter.input.value = val;
			shared.awesompleter.evaluate();
			li = shared.awesompleter.ul.children[0];
			shared.awesompleter.select(li);
			expect(shared.awesompleter.input.value).toBe(li.textContent);
		}
  },
  expectAutoFirstToWorkWith: function(val){
    return function(){
			var li;
			shared.awesompleter.input.value = val;
			shared.awesompleter.evaluate();
      shared.awesompleter.open();
			li = shared.awesompleter.ul.children[0];
			expect(li.getAttribute('aria-selected')).toBe('true');
      expect(shared.awesompleter.status.textContent).toBe(li.textContent);
		}
  }
};
