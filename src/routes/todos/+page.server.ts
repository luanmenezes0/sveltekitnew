import { error } from '@sveltejs/kit';
import { api } from './api';
import type { PageServerLoad, Actions } from './$types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Todo = {
	uid: string;
	created_at: Date;
	text: string;
	done: boolean;
	pending_delete: boolean;
};

export const load: PageServerLoad = async ({ locals }) => {
	// locals.userid comes from src/hooks.js
	const response = await api('GET', `todos/${locals.userid}`);

	if (response.status === 404) {
		// user hasn't created a todo list.
		// start with an empty array
		return {
			todos: [] as Todo[]
		};
	}

	if (response.status === 200) {
		return {
			todos: (await response.json()) as Todo[]
		};
	}

	throw error(response.status);
};

export const actions: Actions = {
	add: async ({ request, locals }) => {
		const form = await request.formData();

		await prisma.todo.create({
			data: {
				created_at: new Date(),
				done: false,
				text: data.text
			}
		});
	},
	edit: async ({ request, locals }) => {
		const form = await request.formData();

		await api('PATCH', `todos/${locals.userid}/${form.get('uid')}`, {
			text: form.get('text')
		});
	},
	toggle: async ({ request, locals }) => {
		const form = await request.formData();

		await api('PATCH', `todos/${locals.userid}/${form.get('uid')}`, {
			done: !!form.get('done')
		});
	},
	delete: async ({ request, locals }) => {
		const form = await request.formData();

		await api('DELETE', `todos/${locals.userid}/${form.get('uid')}`);
	}
};
