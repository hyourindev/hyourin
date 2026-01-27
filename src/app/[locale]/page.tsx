import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { getPosts } from "@/lib/posts";

export default function Home() {
	const t = useTranslations();
	const locale = useLocale();
	const posts = getPosts(locale);

	return (
		<div className="flex flex-col min-h-screen px-6 py-8 max-w-xl mx-auto">
			<main className="flex-1 flex flex-col items-center justify-center gap-2">
				<h1 className="text-3xl tracking-widest">{t("title")}</h1>
				<p className="text-sm text-neutral-400">{t("role")}</p>
				<p className="text-sm text-neutral-400">{t("location")}</p>

				{posts.length > 0 && (
					<ul className="mt-12 w-full flex flex-col gap-4">
						{posts.map((post) => (
							<li key={post.slug}>
								<Link
									href={`/${locale}/blog/${post.slug}`}
									className="flex justify-between items-baseline hover:text-neutral-500 transition-colors"
								>
									<span>{post.title}</span>
									<span className="text-xs text-neutral-300">{post.date}</span>
								</Link>
							</li>
						))}
					</ul>
				)}
			</main>
		</div>
	);
}
