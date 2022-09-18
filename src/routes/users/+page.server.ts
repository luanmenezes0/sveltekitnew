import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	try {
		const response = await fetch('https://api.github.com/repos/sveltejs/kit/issues');

		if (response.ok) {
			return await response.json();
		}

		throw error(404, 'Not found');
	} catch {
		throw error(404, 'Not found');
	}
}
