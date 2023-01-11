<script>	
	import OpenAiForm from '$lib/Components/OpenAiForm/OpenAiForm.svelte';
	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<section class="grid grid-flow-row">
	<h1 class="font-bold flex justify-end">
		<a href="https://openai.com/">OpenAI API</a>
	</h1>
	<div>		
		<OpenAiForm {form} />
	</div>
</section>
