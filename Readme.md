***external-loader***

**webpack 3.0/4.0 plugin**

* Inlines the contents of '@import url("http://")' into the CSS.
* Downloads the contents of the remote url() rules into the "tmp" folder and replaces the path to the new absolute location


Should be used before css-loader loader like so:

	{
		test: /\.(scss|css)$/,
		use: extractSass.extract({
			use:[
				{
					loader:"css-loader",
					options: {
						minimize: true,
						importLoaders: 3,
						sourceMap: env.build != "production" ? true: false
					}
				},
				{
					loader: 'external-loader'
				},
				{
					loader: 'postcss-loader',
					options: {
						plugins: [
							autoprefixer({

								browsers:['Android >= 4', 'iOS >=4']
							}),
							cssnano({})
						],
					}
				},
				{
					loader: 'sass-loader',
					options: {
						sourceMap: env.build != "production" ? true: false
					}
				},							
				
			]
		})
	},

This

	@import url('https://fonts.googleapis.com/css?family=Open+Sans');

Turns into this:

	/* latin-ext */
	@font-face {
		font-family: 'Open Sans';
		font-style: normal;
		font-weight: 400;
		src: local('Open Sans Regular'), local('OpenSans-Regular'), url([absolutepath]/mem8YaGs126MiZpBA-UFW50bbck.woff2) format('woff2');
		unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
	}
