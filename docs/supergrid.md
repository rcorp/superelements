### `super-grid` Attributes
Attribute Name | Value | Description
-------------- | ------| -----------
tree | true | Creates a Tree grid with heirarchial data. The `render-expando` attribute for `super-column` shows the caret symbol, which when clicked expands the row.
selector | single |  Makes a single row selectable. This becomes the `value` attribute of the grid.
	| multiple | Makes multiple row selectable. Again this becomes the `value` property of the grid.
keyboard-navigation |
pagination |
cell-selection |


### `super-column` Attributes
Attribute Name | Value | Description
-------------- | ------| -----------
render-expando | true | Creates the caret icon which when clicked,
field|
label|
class|
sortable|





#SuperGrid!

##API

Use Super grid as follows:

```html
<super-grid tree="true" selector="true">
	<super-column label="First Name" field="" >
	</super-column>
	<super-column label="Last Name" field="">	</super-column>
	<super-column label="Age">	</super-grid-column>
</super-grid>
```

You can use "Editors" within columns as follows:

```html
<super-grid tree="true" >
	<super-column>
		<paper-button label="Click ME" > </paper-button>
	</super-column>

	<super-column>	</super-column>
	<super-column>	</super-column>
</super-grid>
```

An extremely important customisation of `super-grid` are `customRenderers`. You can take a normal `Handlebars` template and pass it on to the super column as its content via a `<template>` tag.

```html
<super-grid tree="true" >
	<template>
		<div class="card">
			<h1> {{title}} <h2>
			<p> {{snippet}} </p>
			<ul>
				{{#each lists}}
					<li> {{name}} </li>
				{{/each}}
			</ul>
		</div>
	</template>
</super-grid>

```

##Supergrid Attributes
