<script lang="ts">
	let text = $state('Awaiting motion data...');
	let x = 0,
		y = 0,
		z = 0;

	function handleMotion(event: DeviceMotionEvent) {
		if (event.accelerationIncludingGravity) {
			x = event.accelerationIncludingGravity.x ?? 0;
			y = event.accelerationIncludingGravity.y ?? 0;
			z = event.accelerationIncludingGravity.z ?? 0;
			text = `x: ${x.toFixed(2)}\ny: ${y.toFixed(2)}\nz: ${z.toFixed(2)}`;
		}
	}

	async function requestPermissionAndListen() {
		try {
			// iOS 13+ requires permission to access devicemotion
			// @ts-ignore - iOS-specific
			if (typeof DeviceMotionEvent.requestPermission === 'function') {
				// @ts-ignore - iOS-specific
				const response = await DeviceMotionEvent.requestPermission();
				if (response !== 'granted') {
					text = 'Permission denied to access motion sensors.';
					return;
				}
			}

			window.addEventListener('devicemotion', handleMotion, true);
		} catch (error) {
			text = `Error requesting motion permission: ${error}`;
		}
	}
</script>

<pre>{text}</pre>

<button onclick={requestPermissionAndListen}>Request Motion Permission</button>
