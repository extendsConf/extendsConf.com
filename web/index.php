<?php
/**
 * Craft web bootstrap file
 */

// Set path constants
use Dotenv\Dotenv;

define('CRAFT_BASE_PATH', dirname(__DIR__));
define('CRAFT_VENDOR_PATH', CRAFT_BASE_PATH.'/vendor');

// Load Composer's autoloader
require_once CRAFT_VENDOR_PATH.'/autoload.php';

// Load dotenv
if (file_exists(CRAFT_BASE_PATH.'/.env')) {
	\Dotenv\Dotenv::create(CRAFT_BASE_PATH)->load();
}

// Our custom constants
define('CRAFT_LICENSE_KEY', getenv('CRAFT_LICENSE_KEY'));
define('CRAFT_SITE', getenv('CRAFT_SITE'));
define('CRAFT_CONFIG_PATH', CRAFT_BASE_PATH.'/_craft/config');
define('CRAFT_CONTENT_MIGRATIONS_PATH', CRAFT_BASE_PATH.'/_craft/migrations');
define('CRAFT_TRANSLATIONS_PATH', CRAFT_BASE_PATH.'/_craft/translations');
define('CRAFT_TEMPLATES_PATH', CRAFT_BASE_PATH.'/source/craft_templates');

// Load and run Craft
define('CRAFT_ENVIRONMENT', getenv('ENVIRONMENT') ?: 'production');
$app = require CRAFT_VENDOR_PATH.'/craftcms/cms/bootstrap/web.php';
$app->run();
