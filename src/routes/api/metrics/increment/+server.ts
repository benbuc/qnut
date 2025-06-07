import { json } from '@sveltejs/kit';
import { measurementsCounter } from '$lib/server/metrics';

export async function POST({ request }) {
	try {
		const body = await request.json();

		if (body.metric === 'measurements') {
			// Increment the measurements counter
			measurementsCounter.inc({ type: body.type || 'unknown' });
		}

		return json({ success: true });
	} catch (error) {
		console.error('Error incrementing metric:', error);
		return json({ error: 'Error incrementing metric' }, { status: 500 });
	}
}
