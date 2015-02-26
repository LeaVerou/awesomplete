$ = Awesomplete.$;
$$ = Awesomplete.$$;

var nav = $("nav")
$$("section > h1").forEach(function (h1) {
	if (h1.parentNode.id) {
		$.create("a", {
			href: "#" + h1.parentNode.id,
			textContent: h1.textContent.replace(/\(.+?\)/g, ""),
			inside: nav
		});
	}
});

//email example
var emailInput = $("#emailInput");
var emailAutoComplete = new Awesomplete(emailInput, {
    list: ["@aol.com", "@att.net", "@comcast.net", "@facebook.com", "@gmail.com", "@gmx.com", "@googlemail.com", "@google.com", "@hotmail.com", "@hotmail.co.uk", "@mac.com", "@me.com", "@mail.com", "@msn.com", "@live.com", "@sbcglobal.net", "@verizon.net", "@yahoo.com", "@yahoo.co.uk"],
    item: function(text, input){
        var newText = input.slice(0, input.indexOf("@")) + text;

        return Awesomplete.$.create("li", {
            innerHTML: newText.replace(RegExp(input.trim(), "gi"), "<mark>$&</mark>"),
            "aria-selected": "false"
        });
    },
    filter: function(text, input){
        var atPosition = input.indexOf("@");
        var inputIsEmail = !!~atPosition && (input.length > atPosition + 1);
        var emailPart = input.slice(input.indexOf("@"));
        var textMatchWithInput = RegExp("^" + emailPart.trim(), "i").test(text);

        return (inputIsEmail && textMatchWithInput);
    }
});
