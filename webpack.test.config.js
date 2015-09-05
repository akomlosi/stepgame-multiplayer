var webpack = require('webpack');

/**
 * This is the Webpack configuration file for production.
 */
module.exports = {
	entry: "./tests/bootstrap",

	output: {
		path: __dirname + "/tests/",
		filename: "tests.js"
	},

	module: {
		loaders: [
			{ test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader?stage=0" }
		]
	},

	resolve: {
		extensions: ['', '.js', '.jsx']
	}
}
