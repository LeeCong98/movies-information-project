 
const path = require('path')
const htmlWebpackplugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const cleanWebpackplugin = require('clean-webpack-plugin')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
const webpack = require('webpack')
const  UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const defaultPluins = [
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: isDev ? '"development"' : '"production"'
		}
	}),
	isDev ? 
	new htmlWebpackplugin({
				filename: 'index.html',
				template: 'src/view/index.html'
	})  : new htmlWebpackplugin({
					filename: 'index.html',
					template: 'src/view/index.html',
					minify: {
						collapseWhitespace: true,
						removeComments: true,
						removeAttributeQuotes: true
					}
				})
]


if (isDev) {
	const devServer = {
		port: 3000,
		host: '0.0.0.0',
		overlay: {
			errors: true
		},
		hot: true
	}
	config = webpackMerge(baseConfig, {
		devtool: '#cheap-module-eval-source-map',
		devServer,
		plugins: defaultPluins.concat(
			[ 
			new webpack.HotModuleReplacementPlugin(), 
			]
		),
		module: {
			rules: [
				{
	        test: /\.css$/,
	        use: [
	          'style-loader',
	          'css-loader',
	          {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
            	}
            }
	        ]
      	}
			]
		}
	})

} else {
	config = webpackMerge(baseConfig, {
		entry: {
			app: path.join(__dirname, '../src/index.js'),
			vendors: ['react', 'react-dom', 'react-router-dom']
		},
		output: {
  		filename: '[name].[chunkhash:8].js'
		},
		module: {
			rules: [
				{
	        test: /\.css$/,
	        use: [
	          miniCssExtractPlugin.loader,
	          'css-loader'
	        ]
      	}
			]
		},
		plugins: defaultPluins.concat(
			[  
				 // new ExtractPlugin('styles/[hash:8].css'),
				 new miniCssExtractPlugin({
            filename: '../dist/css/styles.css',
            options: {
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
        }),
				 new cleanWebpackplugin(),
				 new optimizeCssAssetsPlugin
			 ]
		),
		optimization: {
	      splitChunks: {
	          cacheGroups: {
	              commons: {
	                  name: "commons",
	                  chunks: "initial",
	                  minChunks: 2
	              }
	          }
	      },
	      minimizer: [
            new UglifyJSPlugin({
                uglifyOptions: {
                    output: {
                        comments: false
                    },
                    compress: {
                        warnings: false,
                        drop_debugger: true,
                        drop_console: true
                    }
                }
            }),
        ]
		 }
	})
}

module.exports = config

