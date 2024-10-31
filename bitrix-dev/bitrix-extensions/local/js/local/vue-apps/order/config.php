<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'js' => [
		'./dist/application.bundle.js',
	],
	'css' => [
		'./dist/application.bundle.css',
	],
	'rel' => [
		'main.polyfill.core',
		'ui.vue3',
		'local.vue-components.location-component',
		'local.vue-components.control-component',
		'local.vue-components.loader-circle',
		'local.vue-components.button-component',
		'ui.vue3.pinia',
	],
	'skip_core' => true,
];