import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, getPosts } from "@/lib/posts";

export function generateStaticParams() {
	const enPosts = getPosts("en");
	const jaPosts = getPosts("ja");

	const params: { locale: string; slug: string }[] = [];
	for (const post of enPosts) {
		params.push({ locale: "en", slug: post.slug });
	}
	for (const post of jaPosts) {
		params.push({ locale: "ja", slug: post.slug });
	}

	return params;
}

export default async function BlogPost({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>;
}) {
	const { locale, slug } = await params;
	const post = getPost(slug, locale);

	if (!post) {
		notFound();
	}

	return (
		<div className="flex flex-col min-h-screen px-6 py-8 max-w-xl mx-auto">
			<header>
				<Link
					href={`/${locale}`}
					className="text-sm text-neutral-400 hover:text-neutral-600 transition-colors"
				>
					&larr; back
				</Link>
			</header>

			<article className="mt-12 flex flex-col gap-4">
				<h1 className="text-2xl tracking-widest">{post.title}</h1>
				<span className="text-xs text-neutral-300">{post.date}</span>
				<div className="mt-4 text-sm leading-relaxed whitespace-pre-wrap">
					{post.content}
				</div>
			</article>
		</div>
	);
}
