<script>
	import PerspectiveForm from '$lib/Components/PerspectiveForm/PerspectiveForm.svelte';
	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<section class="grid grid-flow-row">
	<h1 class="font-bold flex justify-end">
		<a href="https://www.perspectiveapi.com/">Perspective API</a>
	</h1>
	<div>
		<PerspectiveForm {form} />
	</div>
</section>
