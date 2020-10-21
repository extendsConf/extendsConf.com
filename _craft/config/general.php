<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 */


/*
 * Helper variables
 */
$protocol = ($_SERVER['HTTPS'] ?? '' == 'on') ? 'https://' : 'http://';
$host = rtrim(getenv('ENV_HOSTNAME'), '/');
$baseUrl = $protocol . $host;

$devMode = (getenv('CRAFT_DEVMODE') == '1');

return [

    '*' => [

		'siteUrl' => [
			CRAFT_SITE => $baseUrl,
		],

		'allowUpdates' => $devMode,
		'autoLoginAfterAccountActivation' => true,
    	'backupOnUpdate' => false,
		'cacheElementQueries' => false,
		'convertFilenamesToAscii' => true,
		'cpTrigger' => 'admin',
		'defaultTokenDuration' => 'P2W',
    	'defaultWeekStartDay' => 0,
		'devMode' => $devMode,
		'elevatedSessionDuration' => 'P2W',
        'enableCsrfProtection' => true,
		'enableTemplateCaching' => false,
		'errorTemplatePrefix' => '_errors/',
		'maxUploadFileSize' => '42M',
        'omitScriptNameInUrls' => true,
		'rememberedUserSessionDuration' => 'P4W',
        'securityKey' => getenv('SECURITY_KEY'),
		'useEmailAsUsername' => true,

		'postCpLoginRedirect' => 'entries',

    ],

];
