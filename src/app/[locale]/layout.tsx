import type { Metadata } from "next";
import { Kode_Mono, Noto_Sans_JP } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import Script from "next/script";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import LangSwitcher from "@/components/lang-switcher";
import SocialLinks from "@/components/social-links";
import "../globals.css";

const kodeMono = Kode_Mono({
	variable: "--font-kode-mono",
	subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
	variable: "--font-noto-sans-jp",
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
	preload: false,
});

export const metadata: Metadata = {
	title: "hyourin",
	description: "hyourin.dev",
};

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = await params;

	if (!routing.locales.includes(locale as "en" | "ja")) {
		notFound();
	}

	const messages = await getMessages();

	return (
		<html lang={locale}>
			<head>
				<Script
					src="https://www.googletagmanager.com/gtag/js?id=G-NCZ7G1SW5Q"
					strategy="afterInteractive"
				/>
				<Script id="google-analytics" strategy="afterInteractive">
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-NCZ7G1SW5Q');
					`}
				</Script>
			</head>
			<body className={`${kodeMono.variable} ${notoSansJP.variable} antialiased`}>
				<NextIntlClientProvider messages={messages}>
					<nav className="flex justify-between items-center px-6 py-8">
						<SocialLinks />
						<LangSwitcher />
					</nav>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
