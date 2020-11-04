# Awesomplete
[![npm version](https://img.shields.io/npm/v/awesomplete.svg)](https://www.npmjs.com/package/awesomplete)
[![Build Status](https://img.shields.io/travis/LeaVerou/awesomplete/gh-pages.svg)](https://travis-ci.org/LeaVerou/awesomplete)
[![Code Climate](https://img.shields.io/codeclimate/github/LeaVerou/awesomplete.svg)](https://codeclimate.com/github/LeaVerou/awesomplete)
[![Test Coverage](https://img.shields.io/codeclimate/coverage/github/LeaVerou/awesomplete.svg)](https://codeclimate.com/github/LeaVerou/awesomplete/coverage)

https://leaverou.github.io/awesomplete/

Awesomplete is an ultra lightweight, customizable, simple autocomplete widget with zero dependencies, built with modern standards for modern browsers.

## Installation
There are a few ways to obtain the needed files.
Here are 2 of them:
1. CDN server

```sh
https://cdnjs.com/libraries/awesomplete
```

2. Another way to get up and running is by using `yarn` or `npm`:

```sh
yarn add awesomplete
```

```sh
npm install awesomplete --save
```

More information about the npm package can be found [here](https://www.npmjs.com/package/awesomplete).

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

## Options

| JS Property | HTML Attribute | Description                                                                     | Value   | Default      |
| ----------- | -------------- | ------------------------------------------------------------------------------- | ------- | ------------ |
| list        | data-list      | Where to find the list of suggestions.                                          | Array of strings, HTML element, CSS selector (no groups, i.e. no commas), String containing a comma-separated list of items | N/A |
| minChars    | data-minchars  | Minimum characters the user has to type before the autocomplete popup shows up. | Number  | 2            |
| maxItems    | data-maxitems  | Maximum number of suggestions to display.                                       | Number  | 10           |
| autoFirst   | data-autofirst | Should the first element be automatically                                       | Boolean | false        |
<<<<<<< HEAD
<<<<<<< HEAD
| listLabel   | data-listlabel | Denotes a label to be used as aria-label on the generated autocomplete list.    | String  | Results List |
=======
| listLabel   | data-listLabel | Denotes a label to be used as aria-label on the generated autocomplete list.    | String  | Results List |
>>>>>>> 5f1f9c7... Add ability to add custom aria-label to the autocomplete listbox and default verbiage to fix issue #17200, add documentation to readme regarding options
=======
| listLabel   | data-listlabel | Denotes a label to be used as aria-label on the generated autocomplete list.    | String  | Results List |
>>>>>>> a7de3d1... Add listLabel documentation to the website, fix casing of data-listlabel in documentation

## License

Awesomplete is released under the MIT License. See [LICENSE][1] file for
details.

## Links

The official site for the library is at <https://leaverou.github.io/awesomplete/>.

Documentation for the API and other topics is at
<https://leaverou.github.io/awesomplete/#api>.

Created by Lea Verou and other fantastic contributors.

[1]: https://github.com/LeaVerou/awesomplete/blob/gh-pages/LICENSE
