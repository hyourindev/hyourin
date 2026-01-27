import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src/content");
const outFile = path.join(process.cwd(), "src/lib/posts-registry.json");

const slugs = fs
	.readdirSync(contentDir, { withFileTypes: true })
	.filter((d) => d.isDirectory())
	.map((d) => d.name);

const registry = {};

for (const slug of slugs) {
	const slugDir = path.join(contentDir, slug);
	const files = fs.readdirSync(slugDir).filter((f) => f.endsWith(".mdx"));

	registry[slug] = {};

	for (const file of files) {
		const locale = file.replace(".mdx", "");
		const raw = fs.readFileSync(path.join(slugDir, file), "utf-8");
		const { data, content } = matter(raw);

		registry[slug][locale] = {
			title: data.title || "",
			date: data.date || "",
			content: content.trim(),
		};
	}
}

fs.writeFileSync(outFile, JSON.stringify(registry, null, "\t"));
console.log(`Generated ${Object.keys(registry).length} post(s) → src/lib/posts-registry.json`);
