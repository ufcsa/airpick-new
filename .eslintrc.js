module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
		commonjs: true
	},
	extends: ['eslint:recommended', 'plugin:react/recommended'],
	parser: 'babel-eslint',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
			experimentalObjectRestSpread: true
		},
		sourceType: 'module'
	},
	settings: {
		react: {
			createClass: 'createReactClass', // Regex for Component Factory to use,
			// default to "createReactClass"
			pragma: 'React', // Pragma to use, default to "React"
			version: '16.12.0' // React version, default to the latest React stable release
		},
		propWrapperFunctions: [
			// The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
			'forbidExtraProps',
			{ property: 'freeze', object: 'Object' },
			{ property: 'myFavoriteWrapper' }
		]
	},
	rules: {
		'linebreak-style': [2, 'unix'],
		semi: [2, 'always'],
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // 打包时禁止debugger
		'no-console': process.env.NODE_ENV === 'production' ? 2 : 0, // 打包时禁止console
		'no-alert': process.env.NODE_ENV === 'production' ? 2 : 0, // 打包时禁止console
		'for-direction': 2, // 禁止for无限循环
		'no-compare-neg-zero': 2, // 禁止与-0进行比较
		'no-cond-assign': 2, // 禁止条件语句中出现赋值语句
		'no-control-regex': 2, // 在 ASCII 中，0-31 范围内的控制字符是特殊的、不可见的字符。这些字符很少被用在 JavaScript 字符串中，所以一个正则表达式如果包含这些字符的，很有可能一个错误。
		'no-dupe-args': 2, // 禁止在函数定义或表达中出现重名参数
		'no-dupe-keys': 2, // 禁止在对象字面量中出现重复的键
		'no-duplicate-case': 2, // 禁止重复 case 标签。
		'no-shadow': 2, // 禁止变量声明覆盖外层作用域的变量
		'no-undef': 2, // 禁用未声明的变量
		'react/prop-types': 0,
		'no-unused-vars': 1,
		'space-before-blocks': 2,
		'space-before-function-paren': 2,
		indent: [2, 'tab'],
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
		quotes: [2, 'single'] // 强制使用一致的单引号
	}
};