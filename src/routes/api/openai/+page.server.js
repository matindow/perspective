import { fail } from '@sveltejs/kit';
import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

export const prerender = false;

const configuration = new Configuration({
	apiKey: OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

export const actions = {
	default: async ({ request }) => {
		// /**@type {Map<string, string>} */
		const formData = await request.formData();
		const data = Object.fromEntries(formData.entries());
		try {
			const response = await openai.createCompletion({
				model: 'content-filter-alpha',
				max_tokens: 1,
				temperature: 0.0,
				top_p: 0,
				logprobs: 10,
				prompt: `<|endoftext|>${data.text}\n--\nLabel:`
			});			
			return { text: data.text, response: response.data };
		} catch (err) {
			console.log(err);
			return fail(400, { error: err.message });
		}
	}
};
