<script lang="ts">
	import { onMount } from 'svelte';
	let acl: any = $state(null);

	let text = $state('INIT');

	onMount(() => {
		text = 'MOUNTED';
		console.log('Get acc');
		acl = new Accelerometer({ frequency: 60 });
		text = 'Accelerometer created';
		console.log(acl);
		acl.addEventListener('reading', () => {
			console.log(`Acceleration along the X-axis ${acl.x}`);
			console.log(`Acceleration along the Y-axis ${acl.y}`);
			console.log(`Acceleration along the Z-axis ${acl.z}`);
			text = `X: ${acl.x}, Y: ${acl.y}, Z: ${acl.z}`;
		});

		text = 'STARTING';
		console.log('starting');
		acl.start();
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

{JSON.stringify(acl)}

{text}
