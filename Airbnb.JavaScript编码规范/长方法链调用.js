// bad
$('#items').
	find('.selected').
		highlight().
		end().
	find('.open').
		updateCount();

// good
$('#items')
	.find('.selected')
	.highlight()
	.end()
.find('.open')
	.updateCount();

// bad
const leds = stage.selectAll('.led').data(data).enter().append('svg:svg').class('led', true)
	.attr('width', (radius + margin) * 2).append('svg:g')
	.attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
	.call(tron.led);

// good
const leds = stage.selectAll('.led')
	.data(data)
.enter().append('svg:svg')
	.classed('led', true)
	.attr('width', (radius + margin) * 2)
.append('svg:g')
	.attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
	.call(tron.led);