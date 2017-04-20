import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';


export default {
	debug: true,
	devtool: 'cheap-module-eval-source-map',
	noInfo: true,
	entry: {
		'index': [
			'whatwg-fetch',
			'./webpack-public-path',
			'webpack-hot-middleware/client?reload=true',
			'./../web/'
		],
	},
	target: 'web',
	output: {
		path: `${__dirname}/src`,
		publicPath: '/',
		filename: '[name]-bundle.js'
	},
	plugins: [
		new webpack.DefinePlugin(GLOBALS),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),

		new HtmlWebpackPlugin({
			template: 'index.ejs',
			filename: 'index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true
			},
			inject: true
		})

	],
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loaders: ['babel']
		}, {
			test: /\.eot(\?v=\d+.\d+.\d+)?$/,
			loader: 'file'
		}, {
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: "url?limit=10000&mimetype=application/font-woff"
		}, {
			test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url?limit=10000&mimetype=application/octet-stream'
		}, {
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url?limit=10000&mimetype=image/svg+xml'
		}, {
			test: /\.(jpe?g|png|gif)$/i,
			loader: 'file?name=[name].[ext]'
		}, {
			test: /\.ico$/,
			loader: 'file?name=[name].[ext]'
		}, {
			test: /\.css$/,
			loader: 'style!css?modules',
			include: /flexboxgrid/
		}, {
			test: /(\.css|\.scss)$/,
			loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap'],
			exclude: /flexboxgrid/
		}]
	},
	postcss: () => [autoprefixer]
};
