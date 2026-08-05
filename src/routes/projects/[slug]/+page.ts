import { error } from '@sveltejs/kit';
import { getProject, projects } from '$lib/content/projects';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const project = getProject(params.slug);
	if (!project) throw error(404, 'No such project');

	const index = projects.findIndex((p) => p.slug === project.slug);
	const next = projects[(index + 1) % projects.length];
	const previous = projects[(index - 1 + projects.length) % projects.length];

	return { project, next, previous };
};
