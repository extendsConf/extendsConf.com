const settings = require('./project.settings.js');
const project = require('./project.helpers.js');

/**
 * Custom PurgeCSS extractor for Tailwind that allows special characters in class names.
 *
 * @see https://github.com/FullHuman/purgecss#extractor
 */
class TailwindExtractor {
	static extract(content) {
		return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
	}
}

module.exports = {
	plugins: [
		require('postcss-import')(),
		require('tailwindcss')({
			theme: settings.tailwindConfig.theme,
			corePlugins: {},
			plugins: [],
			// variants: settings.tailwindConfig.variants,
		}),
		require('postcss-nested')(),
		...(project.inProduction() ? [
			require('@fullhuman/postcss-purgecss')({
				content: [
					project.getSourcePath('craft_templates') + '/**/*.{twig,html}',
					project.getSourcePath('vue') + '/**/*.{vue,html}',
					project.getProjectPath('web') + '/*.html',
					project.getProjectPath('web') + '/**/*.html',
				],
				extractors: [
					{
						extractor: TailwindExtractor,
						extensions: settings.purgeCssConfig.extensions
					}
				],
				whitelist: [],
				whitelistPatterns: [],
			}),
			require("stylelint")({
				extends: "stylelint-config-recommended",
				ignore: settings.stylelintConfig.ignore,
				rules: {
					'at-rule-no-unknown': [ true, {
						'ignoreAtRules': [
							'screen',
							'extends',
							'responsive',
							'tailwind',
						]
					}],
					'block-no-empty': true,
					'comment-empty-line-before': 'always',
					'function-comma-space-after': 'always',
					'function-parentheses-space-inside': 'never',
				}
			}),
		] : []),
		require('postcss-preset-env')({
			autoprefixer: { grid: true },
			features: {
				'nesting-rules': true
			}
		}),
		...(project.inProduction() ? [require('cssnano')] : []),
	]
};
