var path = require('path')

module.exports = {
	mode: process.env.NODE_ENV || 'production',
	entry: path.join(__dirname, '../src/index.js'),
	output: {
			filename: 'bundle.[hash:8].js',
      path: path.join(__dirname, '../dist/'),
      publicPath: '/'
	},
	plugins: [
	],
	module: {
		rules: [
			// {
			// 	test: /\.jsx$/,
			// 	use: 'jsx-loader'
			// },
			{  
				test: /\.less$/, 
				use: ['style-loader', 'css-loader', 'less-loader?modules&localldentName=[name]_[local]-[hash:6]'] 
			},
			// 处理图片
      {
        test: /\.(png|jpeg|jpg|svg|gif|webp)$/,
        use: [{
          loader: 'url-loader',
          options: {
              limit: 1024,
              name: 'resources/[path][name].[hash:8].[ext]'
          }
        }]
      },
			{  
				test: /\.scss$/, 
				use: ['style-loader', 'css-loader', 'sass-loader?modules&localldentName=[name]_[local]-[hash:6]']
			},
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			}
		]
	}


}
