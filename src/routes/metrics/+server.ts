import { json } from '@sveltejs/kit';
import { register } from '$lib/server/metrics';

// This route is hidden from the public through the Traefik configuration
export async function GET() {
	try {
		// Return metrics in Prometheus format
		const metrics = await register.metrics();

		return new Response(metrics, {
			headers: {
				'Content-Type': register.contentType
			}
		});
	} catch (error) {
		console.error('Error generating metrics:', error);
		return json({ error: 'Error generating metrics' }, { status: 500 });
	}
}
