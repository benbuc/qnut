<script lang="ts">
	import { onMount } from 'svelte';
	let motionGranted = $state(false);
	let geoGranted = $state(false);
	let isMeasuring = $state(false);
	let accelerationData: { x: number; y: number; z: number; timestamp: number }[] = $state([]);
	let speedData: { speed: number | null; timestamp: number }[] = $state([]);
	let currentSpeed: number | null = $state(null);

	let motionHandler: (event: DeviceMotionEvent) => void;
	let geoWatchId: number | null = null;

	async function requestMotionAccess() {
		if (typeof DeviceMotionEvent?.requestPermission === 'function') {
			const res = await DeviceMotionEvent.requestPermission();
			motionGranted = res === 'granted';
		} else {
			motionGranted = true; // Assume granted on non-iOS
		}
	}

	async function requestGeoAccess() {
		return new Promise<void>((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(
				() => {
					geoGranted = true;
					resolve();
				},
				(err) => reject(err)
			);
		});
	}

	function startMeasurement() {
		isMeasuring = true;
		accelerationData = [];
		speedData = [];

		motionHandler = (event: DeviceMotionEvent) => {
			if (event.acceleration && event.timeStamp) {
				accelerationData.push({
					x: event.acceleration.x ?? 0,
					y: event.acceleration.y ?? 0,
					z: event.acceleration.z ?? 0,
					timestamp: Date.now()
				});
			}
		};

		window.addEventListener('devicemotion', motionHandler);

		geoWatchId = navigator.geolocation.watchPosition(
			(pos) => {
				currentSpeed = pos.coords.speed ?? -1;
				speedData.push({
					speed: currentSpeed,
					timestamp: Date.now()
				});
			},
			(err) => {
				alert('Geolocation error:', err);
				currentSpeed = null;
			},
			{
				enableHighAccuracy: true,
				maximumAge: 0,
				timeout: 5000
			}
		);
	}

	async function stopMeasurement() {
		isMeasuring = false;
		window.removeEventListener('devicemotion', motionHandler);
		if (geoWatchId !== null) navigator.geolocation.clearWatch(geoWatchId);

		const now = new Date().toISOString();

		await fetch('/api/upload_log', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				timestamp: now,
				acceleration: accelerationData,
				speed: speedData
			})
		});
	}
</script>

<div>
	{#if !motionGranted}
		<button on:click={requestMotionAccess}>Request Motion Access</button>
	{/if}
	{#if !geoGranted}
		<button on:click={() => requestGeoAccess()}>Request Location Access</button>
	{/if}

	{#if motionGranted && geoGranted && !isMeasuring}
		<button on:click={startMeasurement}>Start</button>
	{/if}

	{#if isMeasuring}
		<p>Current Speed: {currentSpeed?.toFixed(2) ?? '0'} m/s</p>
		<p>Acceleration points: {accelerationData.length}</p>
		<p>Speed points: {speedData.length}</p>
		<button on:click={stopMeasurement}>Stop</button>
	{/if}
</div>
