<script>
	import { enhance, applyAction } from '$app/forms';
	import { slide } from 'svelte/transition';
	import { Circle } from 'svelte-loading-spinners';
	/** @type {import('./$types').ActionData} */
	export let form;
	let response;
	let loading;
</script>

<form
	class="w-full flex flex-col my-4"
	method="POST"
	action="/api"
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
	<ul class="border-solid">
		{#each Object.entries(response?.data?.response?.attributeScores)?.sort() as [name, data]}
			<li class="contents">
				<div class="score name">
					<p>{name}:</p>
				</div>
				<div transition:slide class="score number">
					<p style:color={`hsl(${100 - data?.summaryScore?.value * 100},100%,50%)`}>
						{data?.summaryScore?.value}
					</p>
				</div>
			</li>
		{/each}
		<li class="contents text-right">
			<div class="score col-span-2">
				<p>
					"{response?.data?.text}"
				</p>
			</div>
		</li>
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
