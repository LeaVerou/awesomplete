describe("awesomplete.diacritic", function () {

    $.fixture("plain");

    subject(function () {
        return new Awesomplete("#plain", { list: ["jáváscript", "nṏde", "rŭby"] })
    });

    describe("match diacritic", function () {
        beforeEach(function () {
            this.subject.open();
        });

        it("matches javascript", function () {
            $.type(this.subject.input, "java");
            this.subject.next();
            expect(this.subject.selected).toBe(true);
        });

        it("matches node", function () {
            $.type(this.subject.input, "node");
            this.subject.next();
            expect(this.subject.selected).toBe(true);
        });

        it("matches ruby", function () {
            $.type(this.subject.input, "ruby");
            this.subject.next();
            expect(this.subject.selected).toBe(true);
        });
    });
});