import registry from "./posts-registry.json";

export type Post = {
	slug: string;
	title: string;
	date: string;
	html: string;
};

type PostData = { title: string; date: string; html: string };

const posts = registry as Record<string, Record<string, PostData>>;

export function getPosts(locale: string): Post[] {
	return Object.entries(posts)
		.filter(([, entry]) => locale in entry)
		.map(([slug, entry]) => ({ slug, ...entry[locale] }))
		.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPost(slug: string, locale: string): Post | null {
	const entry = posts[slug];
	if (!entry || !(locale in entry)) return null;
	return { slug, ...entry[locale] };
}
