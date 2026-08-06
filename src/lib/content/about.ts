/** The About page, in one place. */

/**
 * The headline, broken where a card should break it. Two lines at every
 * width — on a wide card it would otherwise set as one long line and stop
 * looking like the rest of the set. `title` is joined back up from this, so
 * the two cannot drift apart.
 */
export const aboutTitleLines = ['Independence', 'is infrastructure'];

export const about = {
	title: aboutTitleLines.join(' '),
	subtitle: 'Workshop Europa',
	body: [
		'Workshop Europa is a small design workshop. It exists because the two ways of making things that were on offer — the agency and the platform — both ask you to work faster than the work deserves.',
		'A workshop is the older arrangement. A bench, a few people around it, a small number of commissions taken on at a time, and an apprentice who is there long enough to learn something. The tools have changed; the arrangement still works.',
		'We design and build digital things end to end: the idea, the identity, the interface and the software underneath it. We prefer projects we can finish, clients who want to be in the room, and formats that will still open in ten years.'
	],
	facts: [
		{
			label: 'What',
			title: 'Design and build',
			note: 'Identity, interface, and the software underneath — done by the same hands.'
		},
		{
			label: 'How',
			title: 'A few at a time',
			note: 'Three or four commissions a year, shown in progress from the first week.'
		},
		{
			label: 'Who',
			title: 'A bench, not a staff',
			note: 'A permanent core, plus two apprentices a year through Bottega.'
		},
		{
			label: 'Where',
			title: 'Europe',
			note: 'Wherever the bench is. Correspondence by post, four times a year.'
		}
	]
};
