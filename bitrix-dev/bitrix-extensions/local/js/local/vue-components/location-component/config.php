<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'js' => [
		'./dist/component.bundle.js',
	],
	'css' => [
		'./dist/component.bundle.css',
	],
	'rel' => [
		'main.polyfill.core',
		'local.vue-components.control-hint',
	],
	'skip_core' => true,
];