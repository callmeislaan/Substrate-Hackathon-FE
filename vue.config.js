const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
	transpileDependencies: ['vuetify'],
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
