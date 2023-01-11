import { fail } from '@sveltejs/kit';
import Perspective from 'perspective-api-client';
import { PERSPECTIVE_API_KEY } from '$env/static/private';

export const prerender = false;

const perspective = new Perspective({ apiKey: PERSPECTIVE_API_KEY });

export const actions = {
	default: async ({ request }) => {
		// /**@type {Map<string, string>} */
		const formData = await request.formData();
		const data = Object.fromEntries(formData.entries());
		try {
			// console.log(data)
			let response = await perspective.analyze({
				comment: { text: data.text },
				requestedAttributes: {
					TOXICITY: {},
					IDENTITY_ATTACK: {},
					INSULT: {},
					PROFANITY: {},
					THREAT: {},
					SEXUALLY_EXPLICIT: {}
				},
				languages: ['en']
			});
			return {text: data.text, response };
		} catch (err) {
			return fail(400, { error: err.message });
		}
	}
};
