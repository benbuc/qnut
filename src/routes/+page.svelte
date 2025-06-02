<script lang="ts">
	import { onMount } from 'svelte';

	let text = $state('');

	let x = 0,
		y = 0,
		z = 0;
	let sensor: Accelerometer;

	onMount(() => {
		try {
			if ('Accelerometer' in window) {
				sensor = new Accelerometer({ frequency: 60 });

				sensor.addEventListener('reading', () => {
					x = sensor.x ?? 0;
					y = sensor.y ?? 0;
					z = sensor.z ?? 0;
					text = `x: ${x.toFixed(2)}\ny: ${y.toFixed(2)}\nz: ${z.toFixed(2)}`;
				});

				sensor.addEventListener('error', (event) => {
					if (event.error.name === 'NotAllowedError') {
						text = 'Permission to access sensor was denied.';
					} else if (event.error.name === 'NotReadableError') {
						text = 'Cannot connect to the sensor.';
					} else {
						text = `Sensor error: ${event.error.name}`;
					}
				});

				sensor.start();
			} else {
				text = 'Accelerometer not supported on this device.';
			}
		} catch (error) {
			text = `Error initializing sensor: ${error}`;
		}
	});
</script>

<pre>{text}</pre>
