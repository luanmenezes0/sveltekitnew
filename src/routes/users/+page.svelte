<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	console.log(Object.values(data));

	let name = 'luan';
</script>

<main>
	<div>{name}</div>
	<h1>hellooo</h1>
	<form>
		<sl-input name="name" label="What is your name?" />
		<sl-input name="age" label="What is your age?" />
		<sl-button type="submit"> Submit</sl-button>
	</form>

	{#each Object.values(data) as issue}
		<div>
			{issue.title}
		</div>
	{/each}
</main>

<style>
	form {
		display: grid;
		gap: 1rem;
	}

	form sl-button {
		justify-self: center;
	}
</style>
