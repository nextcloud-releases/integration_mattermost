const path = require('path')
const webpackConfig = require('@nextcloud/webpack-vue-config')
const ESLintPlugin = require('eslint-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

const buildMode = process.env.NODE_ENV
const isDev = buildMode === 'development'
webpackConfig.devtool = isDev ? 'cheap-source-map' : 'source-map'

webpackConfig.stats = {
	colors: true,
	modules: false,
}

const appId = 'integration_mattermost'
webpackConfig.entry = {
	personalSettings: { import: path.join(__dirname, 'src', 'personalSettings.js'), filename: appId + '-personalSettings.js' },
	adminSettings: { import: path.join(__dirname, 'src', 'adminSettings.js'), filename: appId + '-adminSettings.js' },
	dashboard: { import: path.join(__dirname, 'src', 'dashboard.js'), filename: appId + '-dashboard.js' },
	filesplugin: { import: path.join(__dirname, 'src', 'filesplugin.js'), filename: appId + '-filesplugin.js' },
	popupSuccess: { import: path.join(__dirname, 'src', 'popupSuccess.js'), filename: appId + '-popupSuccess.js' },
}

webpackConfig.plugins.push(
	new ESLintPlugin({
		extensions: ['js', 'vue'],
		files: 'src',
		failOnError: !isDev,
	})
)
webpackConfig.plugins.push(
	new StyleLintPlugin({
		files: 'src/**/*.{css,scss,vue}',
		failOnError: !isDev,
	}),
)

webpackConfig.module.rules.push({
	resourceQuery: /raw/,
	type: 'asset/source',
})

module.exports = webpackConfig
