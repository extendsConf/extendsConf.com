<?php

$devMode = (getenv('CRAFT_DEVMODE') == '1');

return [
	'showLabel' => $devMode,
];
