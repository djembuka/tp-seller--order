<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'js' => [
		'./dist/component.bundle.js',
	],
	'rel' => [
		'main.polyfill.core',
		'local.vue-components.control-text',
		'local.vue-components.control-textarea',
		'local.vue-components.control-hint',
		'local.vue-components.control-select-dropdown',
		'local.vue-components.control-select-radio',
		'local.vue-components.control-datepicker',
		'local.vue-components.control-date-single',
		'local.vue-components.control-date-range',
	],
	'skip_core' => true,
];