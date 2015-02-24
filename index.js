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
