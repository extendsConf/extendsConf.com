// node modules
require('dotenv').config();

const asBoolean = function(val) { return val === 'Y' || val === 'y' || parseInt(val) === 1; };


const settings = {
	name: "extendsConf.com",
	copyright: "Michael Rog",
};

settings.paths = {
	source: {
		base: "./source/",
		css: "./source/css/",
		js: "./source/js/",
		svg: "./source/svg/",
		templates: "./source/craft_templates/",
	},
	dist: {
		base: "./web/dist/",
		publicPath: process.env.PUBLIC_PATH || "/dist/",
	}
};

settings.urls = {
	base: process.env.BUILD_BASE_URL,
};

settings.svgSprites = {
	'icons': 'icons/*.svg',
	'logos': 'logos/*.svg',
};

settings.entries = {
	default: {
		'site': [
			settings.paths.source.js + 'site.js',
			settings.paths.source.css + 'site.pcss',
		],
	},
	modern: {
		'site': settings.paths.source.js + 'site.js',
	},
};

settings.webpack = {
	includeFilenameHashes: asBoolean(process.env.WEBPACK_INCLUDE_FILENAME_HASHES),
	clean: true,
};

settings.babelLoaderConfig = {
	exclude: [
		/(node_modules|bower_components)/
	],
};

settings.criticalCss = {
	destPath: "critical",
	suffix: ".critical.min.css",
	baseUrl: settings.urls.base,
	dimensions: [
		{
			height: 1200,
			width: 1200,
		}
	],
	entries: {
		// 'index': '',
	},
	ampDimensions: [
		{
			height: 19200,
			width: 600,
		}
	],
	ampEntries: {
		// 'amp-index': '',
	}
};

settings.tailwindConfig = {
	theme: {
		fontFamily: {
			'mono': '"JetBrains Mono", "Plex Mono", monospace',
			'sans': '"Nunito Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
		},
		extend: {
			colors: {
				'black': {
					'default': '#000',
					'op-1': 'rgba(0, 0, 0, .1)',
					'op-3': 'rgba(0, 0, 0, .3)',
					'op-7': 'rgba(0, 0, 0, .7)',
					'op-9': 'rgba(0, 0, 0, .9)',
				},
				'white': {
					'default': '#e1efff',
					'op-1': 'rgba(225, 239, 255, .1)',
					'op-3': 'rgba(225, 239, 255, .3)',
					'op-7': 'rgba(225, 239, 255, .7)',
					'op-9': 'rgba(225, 239, 255, .9)',
				},
				'teal': {
					'default': '#2b4c65',
					'dark': 'rgb(31, 53, 72)', // #1f3548
					'dark-op-3': 'rgba(31, 53, 72, .3)',
					'dark-op-7': 'rgba(31, 53, 72, .7)',
				},
				'gold': {
					'default': '#ffc700',
				},
				'cyan': {
					'default': '#72bdff',
				},
				'green' : {
					'default': 'rgb(98, 151, 98)',
					'op-7': 'rgba(98, 151, 98, 0.7)',
				},
				'slate': {
					'default': 'rgb(82, 121, 161)', // #5279a1
					'op-1': 'rgba(82, 121, 161, .1)',
					'op-3': 'rgba(82, 121, 161, .3)',
					'op-7': 'rgba(82, 121, 161, .7)',
					'op-9': 'rgba(82, 121, 161, .9)',
				}
			},
			margin: {
				'default': '1.25rem',
				'lg': '2.5rem',
				'xl': '5rem',
			},
			lineHeight: {
				'default': '2.5em'
			}
		},
	},
};

settings.stylelintConfig = {
	ignore: [
		'tailwindcss/**'
	],
};

settings.purgeCssConfig = {
	paths: [
		"./web/**/*.{php,html}",
		"./source/craft_templates/**/*.{twig,html}",
		"./source/vue/**/*.{vue,html}"
	],
	whitelist: [
		"./source/css/components/**/*.{css}"
	],
	whitelistPatterns: [],
	extensions: [
		'html',
		'js',
		'twig',
		'vue',
	],
};

settings.saveRemoteFileConfig = [
	{
		url: "https://www.google-analytics.com/analytics.js",
		filepath: "google-analytics.js",
	}
];

settings.copyPluginConfig = [
	{
		from: settings.paths.source.base + 'fonts',
		to: 'fonts',
	},
];

settings.devServerConfig = {
	public: process.env.DEVSERVER_PUBLIC || null,
	https: asBoolean(process.env.DEVSERVER_HTTPS) || true,
	poll: asBoolean(process.env.DEVSERVER_POLL) || false,
	proxy: {
		'*': {
			target: process.env.DEVSERVER_PROXY_HOST || null,
			changeOrigin: true,
			secure: false,
		}
	},
	contentBase: settings.paths.source.templates,
};


// Webpack project settings exports
// noinspection WebpackConfigHighlighting
module.exports = settings;
