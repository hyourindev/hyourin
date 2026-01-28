"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function LangSwitcher() {
	const locale = useLocale();
	const pathname = usePathname();

	const switchTo = (target: string) => {
		const stripped = pathname.replace(/^\/(en|ja)/, "");
		return `/${target}${stripped}`;
	};

	return (
		<div className="flex gap-4 text-xl font-bold tracking-widest">
			<Link
				href={switchTo("en")}
				className={locale === "en" ? "text-black" : "text-neutral-300 hover:text-neutral-500"}
			>
				EN
			</Link>
			<Link
				href={switchTo("ja")}
				className={locale === "ja" ? "text-black" : "text-neutral-300 hover:text-neutral-500"}
			>
				JP
			</Link>
		</div>
	);
}
