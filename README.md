## Awesomplete

http://leaverou.github.io/awesomplete/

Awesomplete is an ultra lightweight, customizable, simple autocomplete widget with zero dependencies, built with modern standards for modern browsers.


## Basic Usage

Before you try anything, you need to include awesomplete.css and awesomplete.js in your page, via the usual tags:

```html
<link rel="stylesheet" href="awesomplete.css" />
<script src="awesomplete.js" async></script>
```

Then you can add an Awesomplete widget by adding the following input tag:

```html
<input class="awesomplete"
       data-list="Ada, Java, JavaScript, Brainfuck, LOLCODE, Node.js, Ruby on Rails" />
```

Add `class="awesomplete"` for it to be automatically processed (you can still specify many options via HTML attributes)
Otherwise you can instantiate with a few lines of JS code, which allow for more customization.

There are many ways to link an input to a list of suggestions. 
The simple example above could have also been made with the following markup, which provides a nice native fallback in case the script doesn’t load:

```html
<input class="awesomplete" list="mylist" />
<datalist id="mylist">
	<option>Ada</option>
	<option>Java</option>
	<option>JavaScript</option>
	<option>Brainfuck</option>
	<option>LOLCODE</option>
	<option>Node.js</option>
	<option>Ruby on Rails</option>
</datalist>
```

Or the following, if you don’t want to use a `<datalist>`, or if you don’t want to use IDs (since any selector will work in data-list):

```html
<input class="awesomplete" data-list="#mylist" />
<ul id="mylist">
	<li>Ada</li>
	<li>Java</li>
	<li>JavaScript</li>
	<li>Brainfuck</li>
	<li>LOLCODE</li>
	<li>Node.js</li>
	<li>Ruby on Rails</li>
</ul>
```

There are multiple customizations and properties able to be instantiated within the JS. Libraries and definitions of the properties are available in the Links below.

##Contributing
**Adding a test**

Jasmine is the testing framework used by Awesomplete. The setup is really simple, fire the [runner](tests/jasmine/index.html) on a browser and write your tests on the [spec](tests/jasmine/spec/awesompleteSpec.js).

To write a test (or suite of tests) start by adding a `describe` function which receives a string describing what is being tested and a function containing what you expect the test to do. Inside the function use the `it` block to arrange and assert a functionality. 

A test would look like this:

```javascript
describe("A fact", function(){
    it("is always true",function(){
        var fact = true;
        expect(fact).toBe(true);
    });
});
```

More expectations and examples on how to use Jasmine can be found on the official [documentation](http://jasmine.github.io/2.2/introduction.html).

## License

Awesomplete is released under the MIT License. See [LICENSE][1] file for
details.

## Links

The official site for the library is at <http://leaverou.github.io/awesomplete/>.

Documentation for the API and other topics is at
<http://leaverou.github.io/awesomplete/#api>.

Created by Lea Verou and other fantastic contributors.

[1]: https://github.com/LeaVerou/awesomplete/blob/gh-pages/LICENSE
