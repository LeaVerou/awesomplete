/**
 * Simple, lightweight, usable local autocomplete library for modern browsers
 * Because there weren’t enough autocomplete scripts in the world? Because I’m completely insane and have NIH syndrome? Probably both. :P
 * @author Lea Verou http://leaverou.github.io/awesomplete
 * MIT license
 */
 
(function () {

var _ = self.Awesomplete = function (input, o) {
	var me = this;
	
	// Setup environment
	o = o || {};
	
	this.input = input;
	input.setAttribute("aria-autocomplete", "list");
	
	this.minChars = +input.getAttribute("data-minchars") || o.minChars || 2;
	this.maxItems = +input.getAttribute("data-maxitems") || o.maxItems || 10;
	this.autoFirst = input.hasAttribute("data-autofirst") || o.autoFirst || false;
	this.filter = o.filter || _.FILTER_CONTAINS;
	this.sort = o.sort || _.SORT_BYLENGTH;
	
	this.item = o.item || function (text, input) {
		return $.create("li", {
			innerHTML: text.replace(RegExp($.regExpEscape(input.trim()), "gi"), "<mark>$&</mark>"),
			"aria-selected": "false"
		});	
	};
	
	this.replace = o.replace || function (text) {
		this.input.value = text;
	};
	
	this.index = -1;
	
	// Create necessary elements
	
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
		"input": this.evaluate.bind(this),
		"blur": this.close.bind(this),
		"keydown": function(evt) {
			var c = evt.keyCode;
			
			if (c === 13 && me.selected) { // Enter
				evt.preventDefault();
				me.select();
			}
			else if (c === 27) { // Esc
				me.close();
			}
			else if (c === 38 || c === 40) { // Down/Up arrow
				evt.preventDefault();
				me[c === 38? "previous" : "next"]();
			}
		}
	});
	
	$.bind(this.input.form, {"submit": me.close.bind(me)});
	
	$.bind(this.ul, {"mousedown": function(evt) {
		var li = evt.target;
		
		if (li !== this) {
			
			while (li && !/li/i.test(li.nodeName)) {
				li = li.parentNode;
			}
			
			if (li) {
				me.select(li);	
			}
		}
	}});
	
	if (input.hasAttribute("list")) {
		this.list = "#" + input.getAttribute("list");
		input.removeAttribute("list");
	}
	else {
		this.list = input.getAttribute("data-list") || o.list || [];
	}
	
	_.all.push(this);
};

_.prototype = {
	set list(list) {
		if (Array.isArray(list)) {
			this._list = list;
		}
		else if (typeof list === "string" && list.indexOf(",") > -1) {
				this._list = list.split(/\s*,\s*/);
		}
		else { // Element or CSS selector
			list = $(list);
			
			if (list && list.children) {
				this._list = slice.apply(list.children).map(function (el) {
					return el.innerHTML.trim();
				});
			}
		}
		
		if (document.activeElement === this.input) {
			this.evaluate();
		}
	},
	
	get selected() {
		return this.index > -1;
	},
	
	close: function () {
		this.ul.setAttribute("hidden", "");
		this.index = -1;
		
		$.fire(this.input, "awesomplete-close");
	},
	
	open: function () {
		this.ul.removeAttribute("hidden");
		
		if (this.autoFirst && this.index === -1) {
			this.goto(0);
		}
		
		$.fire(this.input, "awesomplete-open");
	},
	
	next: function () {
		var count = this.ul.children.length;

		this.goto(this.index < count - 1? this.index + 1 : -1);
	},
	
	previous: function () {
		var count = this.ul.children.length;
		
		this.goto(this.selected? this.index - 1 : count - 1);
	},
	
	// Should not be used, highlights specific item without any checks!
	goto: function (i) {
		var lis = this.ul.children;
		
		if (this.selected) {
			lis[this.index].setAttribute("aria-selected", "false");
		}
		
		this.index = i;
		
		if (i > -1 && lis.length > 0) {
			lis[i].setAttribute("aria-selected", "true");
		}
	},
	
	select: function (selected) {
		selected = selected || this.ul.children[this.index];

		if (selected) {
			var prevented;
			
			$.fire(this.input, "awesomplete-select", {
				text: selected.textContent,
				preventDefault: function () {
					prevented = true;
				}
			});
			
			if (!prevented) {
				this.replace(selected.textContent);
				this.close();
				$.fire(this.input, "awesomplete-selectcomplete");
			}
		}
	},
	
	evaluate: function() {
		var me = this;
		var value = this.input.value;
				
		if (value.length >= this.minChars && this._list.length > 0) {
			this.index = -1;
			// Populate list with options that match
			this.ul.innerHTML = "";

			this._list
				.filter(function(item) {
					return me.filter(item, value);
				})
				.sort(this.sort)
				.every(function(text, i) {
					me.ul.appendChild(me.item(text, value));
					
					return i < me.maxItems - 1;
				});
			
			this.open();
		}
		else {
			this.close();
		}
	}
};

// Static methods/properties

_.all = [];

_.FILTER_CONTAINS = function (text, input) {
	return RegExp($.regExpEscape(input.trim()), "i").test(text);
};

_.FILTER_STARTSWITH = function (text, input) {
	return RegExp("^" + $.regExpEscape(input.trim()), "i").test(text);
};

_.SORT_BYLENGTH = function (a, b) {
	if (a.length !== b.length) {
		return a.length - b.length;
	}
	
	return a < b? -1 : 1;
};

// Helpers

var slice = Array.prototype.slice;

function $(expr, con) {
	return typeof expr === "string"? (con || document).querySelector(expr) : expr || null;
}

function $$(expr, con) {
	return slice.call((con || document).querySelectorAll(expr));
}

$.create = function(tag, o) {
	var element = document.createElement(tag);
	
	for (var i in o) {
		var val = o[i];
		
		if (i === "inside") {
			$(val).appendChild(element);
		}
		else if (i === "around") {
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
};

$.bind = function(element, o) {
	if (element) {
		for (var event in o) {
			var callback = o[event];
			
			event.split(/\s+/).forEach(function (event) {
				element.addEventListener(event, callback);
			});
		}
	}
};

$.fire = function(target, type, properties) {
	var evt = document.createEvent("HTMLEvents");
			
	evt.initEvent(type, true, true );

	for (var j in properties) {
		evt[j] = properties[j];
	}

	target.dispatchEvent(evt);
};

$.regExpEscape = function (s) {
	return s.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
}



function init() {
	$$("input.awesomplete").forEach(function (input) {
		new Awesomplete(input);
	});
}

// DOM already loaded?
if (document.readyState !== "loading") {
	init();
}
else {
	// Wait for it
	document.addEventListener("DOMContentLoaded", init);
}

_.$ = $;
_.$$ = $$;

})();
