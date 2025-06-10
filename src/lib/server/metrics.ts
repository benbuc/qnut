import { Counter, Registry } from 'prom-client';

export const register = new Registry();

export const measurementsCounter = new Counter({
	name: 'qnut_measurements_total',
	help: 'Total number of measurements started',
	registers: [register],
	labelNames: ['type']
});
