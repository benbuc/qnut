// This helper function imports all translations files from routes
import '../routes/translations';
import '../routes/measure/translations';
import '../routes/support/translations';
import '../routes/what-to-expect/translations';

// Function to load translations for the current route
export function loadRouteTranslations(routePath: string) {
	// Remove leading slash if exists
	const path = routePath.startsWith('/') ? routePath.substring(1) : routePath;

	// Split the path to get the route name
	const parts = path.split('/');
	const routeName = parts.length > 0 ? parts[0] : 'home';

	// Route is already loaded in the imports above
	return routeName;
}
