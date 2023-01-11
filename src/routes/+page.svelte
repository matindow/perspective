<script>
	import PerspectiveForm from '$lib/Components/PerspectiveForm/PerspectiveForm.svelte';
	import { writable } from 'svelte/store';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import OpenAiForm from '$lib/Components/OpenAiForm/OpenAiForm.svelte';
	/** @type {import('./$types').ActionData} */
	const storeTab = writable('a');
	export let form;
</script>

<section class="grid grid-flow-row">
	<TabGroup selected={storeTab} justify={'justify-end'} borderWidth='0'>
		<Tab value="a">OpenAI</Tab>
		<Tab value="b">Perspective</Tab>
	</TabGroup>
	<div>
		{#if $storeTab === 'a'}<OpenAiForm {form} />{/if}
		{#if $storeTab === 'b'}<PerspectiveForm {form} />{/if}
	</div>
</section>
