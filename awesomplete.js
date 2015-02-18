/**
 * Simple, leightweight, usable local autocomplete library for modern browsers
 * Because there weren’t enough autocomplete scripts in the world? Because I’m completely insane and have NIH syndrome? Probably both. :P
 * @author Lea Verou
 * MIT license
 */
 
(function () {

function $(expr, con) {
	if (!expr) return null;
	return typeof expr === 'string'? (con || document).querySelector(expr) : expr;
}

function $$(expr, con) {
	return Array.prototype.slice.call((con || document).querySelectorAll(expr));
}

$.create = function(tag, o) {
	if (arguments.length == 1) {
		o = tag;
		tag = o.tag;
		delete o.tag;
	}
	
	var element = o.element || document.createElement(tag);
	delete o.element;
	
	for (var i in o) {
		var val = o[i];
		
		if (i == "inside") {
			$(val).appendChild(element);
		}
		else if (i == "around") {
			var ref = $(val);
			ref.parentNode.insertBefore(element, ref);
			element.appendChild(ref);
		}
		else if (i in element) {
			element[i] = val;
		}
		else {
			element.setAttribute(i, val);
		}
	}
	
	return element;
}

$.bind = function(element, o) {
	if (element) {
		for (var event in o) {
			var callback = o[event];
			
			event.split(/\s+/).forEach(function (event) {
				element.addEventListener(event, callback);
			});
		}
	}
}

var _ = self.Awesomplete = function (input, o) {
	var me = this;
	
	// Setup environment
	o = o || {};
	
	this.input = input;
	input.setAttribute("aria-autocomplete", "list");
	
	this.minChars = +input.getAttribute("data-minchars") || o.minChars || 2;
	this.maxItems = +input.getAttribute("data-maxitems") || o.maxItems || 20;
	
	var list = input.getAttribute("data-list") || o.list || [];
	
	if (Array.isArray(list)) {
		this.list = list;
	}
	else {
		if (typeof list == "string" && list.indexOf(",") > -1) {
			this.list = list.split(/\s*,\s*/);
		}
		else {
			list = $(list);
			
			if (list && list.children) {
				list.setAttribute("hidden", "");
				
				this.list = [].slice.apply(list.children).map(function (el) {
					return el.innerHTML.trim();
				});
			}
		}
	}
	
	this.filter = o.filter || _.FILTER_CONTAINS;
	this.item = o.item || function (text, input) {
		return $.create("li", {
			innerHTML: text.replace(RegExp(regEscape(input.trim()), "gi"), "<mark>$&</mark>"),
			"aria-selected": "false"
		});	
	}
	
	this.index = -1;
	
	this.container = $.create("div", {
		className: "awesomplete",
		around: input
	});
	
	this.ul = $.create("ul", {
		hidden: "",
		inside: this.container
	});
	
	// Bind events
	
	$.bind(this.input, {
		"input focus": checkInput,
		"blur": function () {
			if (document.activeElement != this && document.activeElement != document.body) {
				me.close();
			}
		},
		"keydown": function(evt) {
			switch (evt.keyCode) {
				case 13: // Enter
					if (me.index > -1) {
						evt.preventDefault();
						me.select();
					}
					
					break;
				case 27: // Esc
					me.close();
					break;
				case 40: // up arrow
					me.next();
					evt.preventDefault();
					break;
				case 38: // down arrow
					me.previous();
					evt.preventDefault();
					break;
			}
		}
	});
	
	$.bind(this.input.form, {"submit": function(event) {
		me.close();
	}});
	
	$.bind(this.ul, {"click": function(evt) {
		var li = evt.target;
		
		if (li != this) {
			
			while (li && !/li/i.test(li.nodeName)) {
				li = li.parentNode;
			}
			
			if (li) {
				me.select(li);	
			}
		}
	}});
	
	// Private functions
	
	function checkInput() {
		var value = me.input.value;
				
		if (value.length >= me.minChars && me.list.length > 0) {
			// Populate list with options that match
			me.ul.innerHTML = "";

			me.list.filter(function(item) {
				return me.filter(item, value);
			}).every(function(text, i) {
				me.ul.appendChild(me.item(text, value));
				
				return i < me.maxItems - 1;
			});
			
			me.open();
		}
		else {
			me.close();
		}
	}
};

_.prototype = {
	close: function () {
		this.ul.setAttribute("hidden", "");
		this.index = -1;
	},
	
	open: function () {
		this.ul.removeAttribute("hidden");
		
		var me = this;
		
		document.addEventListener("click", function(evt) {
			if (!me.container.contains(evt.target)) {
				document.removeEventListener(arguments.callee);
				me.close();
			}
		});
	},
	
	next: function () {
		var count = this.ul.children.length;

		this.goto(this.index < count - 1? this.index + 1 : -1);
	},
	
	previous: function () {
		var count = this.ul.children.length;
		
		this.goto(this.index > -1? this.index - 1 : count - 1);
	},
	
	// Should not be used, highlights specific item without any checks!
	goto: function (i) {
		var lis = this.ul.children;
		
		if (this.index > -1) {
			lis[this.index].setAttribute("aria-selected", "false");
		}
		
		this.index = i;
		
		if (i > -1) {
			lis[i].setAttribute("aria-selected", "true");
		}
	},
	
	select: function (selected) {
		selected = selected || this.ul.children[this.index];

		if (selected) {
			this.input.value = selected.textContent;
			this.close();
		}
	}
};

_.FILTER_CONTAINS = function (text, input) {
	return RegExp(regEscape(input.trim()), "i").test(text);
};

_.FILTER_STARTSWITH = function (text, input) {
	return RegExp("^" + regEscape(input.trim()), "i").test(text);
};

function regEscape(s) { return s.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&"); }

$$("input.awesomplete").forEach(function (input) {
	new Awesomplete(input);
});

_.$ = $;
_.$$ = $$;

})();