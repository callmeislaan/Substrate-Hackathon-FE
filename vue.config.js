const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
	configureWebpack: {
		module: {
			rules: [
				{
					test: /\.js$/,
					loader: require.resolve('@open-wc/webpack-import-meta-loader'),
				},
			],
		},
	},
}
