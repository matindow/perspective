<script>
	import { enhance, applyAction } from '$app/forms';	
	import { Circle } from 'svelte-loading-spinners';
	import { JsonView } from '@zerodevx/svelte-json-view';
	/** @type {import('./$types').ActionData} */
	export let form;
	let response;
	let loading;
</script>

<form
	class="w-full flex flex-col my-4"
	method="POST"
	action="/api/openai"
	use:enhance={() => {
		response = null;
		loading = true;
		return async ({ result }) => {
			await applyAction(result);
			response = result;
			loading = false;
		};
	}}
>
	<div class="input-group">
		<input autofocus required name="text" class="input input-bordered w-full" />
		<button class="btn btn-square" type="submit" disabled={loading}>
			{#if loading}
				<Circle size="25" color="rgba(128, 128, 128, 0.2)" />
			{:else}
				GO
			{/if}
		</button>
	</div>
</form>
{#if form?.error}
	<p class="text-red-600">Error: {form?.error}</p>
{/if}
{#if response}
	<div class="flex flex-row justify-center">
		<p class="!text-9xl">
			{#if response?.data?.response?.choices?.[0]?.text == 2}
				❌
			{:else if response?.data?.response?.choices?.[0]?.text == 1}
				🙅‍♂️
			{:else if response?.data?.response?.choices?.[0]?.text == 0}
				✅
			{:else}
				<JsonView json={response} />
			{/if}
		</p>
	</div>
{/if}
