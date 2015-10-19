'use strict';
var $ = require('jquery');
Parse.initialize(
	"WMjsWldX3Wi5LUuDW3HvUDXPz6UkloCBkgG70OIA",
	"fUtJRfCYpd4BWcecDPz06X1Y9wJ8p03PxSpfwfjY"
);

/*
 * Create Record on Tiny Pizza Server
 */

// $.post(
// 	'http://tiyfe.herokuapp.com/collections/parse-review',
// 	{
// 		name: 'Sunglasses',
// 		price: 20.58,
// 		category: 'eyewear'
// 	}
// );

/*
 * Create Record on Parse
 */

// var ProductModel = Parse.Object.extend('Products');

// var sunglesses = new ProductModel({
// 	name: 'Sunglasses',
// 	price: 20.58,
// 	category: 'eyewear'
// });

// sunglesses.save();

/*
 * Delete Record on Parse
 */
 
// var ProductModel = Parse.Object.extend('Products');

// var sunglesses = new ProductModel({
// 	objectId: 'qgEG26q13E'
// });

// sunglesses.destroy();

/*
 * Update Record on Parse
 */
 
var ProductModel = Parse.Object.extend('Products');

var sunglesses = new ProductModel({
	objectId: 'ag42ijD31z',
	name: 'Oakley Sunglasses'
});

sunglesses.save();