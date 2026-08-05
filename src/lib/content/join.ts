export const disciplines = [
	'Design',
	'Engineering',
	'Type and lettering',
	'Writing and editorial',
	'Film and photography',
	'Something else'
] as const;

export type Discipline = (typeof disciplines)[number];

export const join = {
	title: 'Take part',
	subtitle: 'Two places at the bench from September',
	body: [
		'Joining means two things: you get the letter four times a year, and you are in the pile we read from when a place at the bench opens.',
		'Tell us what you make. A sentence is plenty — we would rather have the link than the CV.'
	]
};
