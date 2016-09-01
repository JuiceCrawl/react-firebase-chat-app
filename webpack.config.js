var webpack = require('webpack')
var path = require('path')

module.exports = {

	entry:{
		app: './src/app.js'
	},
	output:{
		filename: './build/bundle.js',
		sourceMapfilename: './build/bundle.map'
	},
	devtool: '#source-map',
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modues)/,
				loader: 'babel',
				query:{
					presets: ['react', 'es2015']
				}
			}
		]
	},	
}