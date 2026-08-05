/**
 * The bench. One card per person.
 */

export type Person = {
	name: string;
	role: string;
	/** The short line under the name on their card. */
	note?: string;
	link?: { label: string; href: string };
};

export const people: Person[] = [
	{
		name: 'Alfred Nerstu',
		role: 'Creative Director',
		note: 'Runs the bench. Design, type and most of the code.',
		link: { label: 'alfrednerstu.com', href: 'https://alfrednerstu.com' }
	}
];
