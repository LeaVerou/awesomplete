describe("Scroll event", function () {
  $.fixture("plain");

  subject(function () {
    return new Awesomplete("#plain", {
      list: ["item1", "item2", "item3"],
      listContainer: document.body,
    });
  });

  beforeEach(function () {
    $.type(this.subject.input, "ite");
  });

  it("closes completer", function () {
    spyOn(this.subject, "select");
    spyOn(this.subject, "close");
    spyOn(this.subject, "next");
    spyOn(this.subject, "previous");
    $.fire(window, "scroll");
    expect(this.subject.select).not.toHaveBeenCalled();
    expect(this.subject.close).not.toHaveBeenCalled();
    expect(this.subject.next).not.toHaveBeenCalled();
    expect(this.subject.previous).not.toHaveBeenCalled();
  });
});
