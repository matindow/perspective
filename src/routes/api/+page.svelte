<script>
	import PerspectiveForm from '$lib/Components/PerspectiveForm/PerspectiveForm.svelte';
	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<section class="flex flex-col">
	<h1 class="font-bold text-right">Perspective API</h1>
	<div>
		<PerspectiveForm {form} />
	</div>
</section>
