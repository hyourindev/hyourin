import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { createHighlighter } from "shiki";
import remarkGfm from "remark-gfm";
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

async function highlightCode(code: string, lang: string) {
	const highlighter = await createHighlighter({
		themes: ["one-dark-pro"],
		langs: ["c", "plaintext"],
	});
	return highlighter.codeToHtml(code, {
		lang: lang || "plaintext",
		theme: "one-dark-pro",
	});
}

function Pre({ children, ...props }: React.ComponentProps<"pre">) {
	return <pre {...props}>{children}</pre>;
}

async function Code({
	children,
	className,
	...props
}: React.ComponentProps<"code">) {
	const match = /language-(\w+)/.exec(className || "");
	if (match && typeof children === "string") {
		const html = await highlightCode(children.trim(), match[1]);
		return <div dangerouslySetInnerHTML={{ __html: html }} />;
	}
	return (
		<code className={className} {...props}>
			{children}
		</code>
	);
}

const components = {
	pre: Pre,
	code: Code,
};

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
		<div className="flex flex-col min-h-screen px-6 py-8 max-w-4xl mx-auto">
			<header>
				<Link
					href={`/${locale}`}
					className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
				>
					&larr; back
				</Link>
			</header>

			<article className="mt-12 flex flex-col gap-4">
				<h1 className="text-2xl tracking-widest">{post.title}</h1>
				<span className="text-xs text-neutral-500">{post.date}</span>
				<div className="mt-6 prose max-w-none">
					<MDXRemote
						source={post.content}
						components={components}
						options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
					/>
				</div>
			</article>
		</div>
	);
}
