import { Counter, Registry } from 'prom-client';

// Create a Registry which registers the metrics
export const register = new Registry();

// Create a counter for measurements
export const measurementsCounter = new Counter({
	name: 'qnut_measurements_total',
	help: 'Total number of measurements started',
	registers: [register],
	labelNames: ['type']
});
