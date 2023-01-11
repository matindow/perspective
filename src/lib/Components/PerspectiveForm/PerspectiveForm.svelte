<script>
	import { enhance, applyAction } from '$app/forms';	
	/** @type {import('./$types').ActionData} */
	export let form;
	let response = null;
	let text = null;
	let loading;
</script>

<form
	class="w-full flex flex-col mt-4"
	method="POST"
	action="/api"
	use:enhance={() => {
		return async ({ result }) => {
			loading = true;
			text = null;
			response = null;			
			await applyAction(result);			
			response = result?.data?.response;
			text = result?.data?.text;
			loading = false;			
		};
	}}
>
	<input autofocus required name="text" class="form-input" />
	<button class="btn" type="submit">Submit</button>
</form>
{#if form?.error}	
	<p class="text-red-600">Error: {form?.error}</p>
{/if}
{#if loading}
<p>loading...</p>
{/if}
{#if response}
	{#if text}
		<p>"{text}"</p>
	{/if}
	<ul>
		{#each Object.entries(response?.attributeScores) as [name, data]}
			<li class="contents">
				<div class="score name">
					<p>{name}:</p>
				</div>
				<div class="score number">
					<p style={`color:hsl(${100 - data?.summaryScore?.value * 100},100%,50%)`}>
						{data?.summaryScore?.value}
					</p>
				</div>
			</li>
		{/each}
	</ul>
{/if}

<style>
	ul {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: auto 1fr;
		justify-content: start;
		gap: 1px 1px;
		border-radius: 1rem;
		overflow: hidden;
	}
	.score {
		padding: 1rem;
	}
	li:nth-of-type(odd) .score {
		background-color: rgba(128, 128, 128, 0.2);
	}
</style>
