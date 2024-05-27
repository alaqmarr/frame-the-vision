import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { Divider } from "@nextui-org/divider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
	title: 'Frame The Vision',
	description: 'Ashara Ohbat competition brought to you by HSB Secunderabad.',
	icons: {
		icon: "/favicon.ico",
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					<div className="relative flex flex-col h-screen">
						<Toaster/>
						<Navbar />
						<main className="container mx-auto max-w-7xl mt-6 px-6 flex-grow">
							{children}
						</main>
						<Divider className="mt-6"/>
						<footer className="w-full flex flex-col items-center justify-center py-3">
							<Link
								isExternal
								className="flex flex-col items-center gap-1 text-current"
								href="https://alaqmar.tech"
								title="The Web Sensei"
							>
								<span className="text-default-600">Developed by HSB Secunderabad.</span>
								<p className="text-primary"> Powered by The Web Sensei</p>
							</Link>
						</footer>
					</div>
				</Providers>
			</body>
		</html>
	);
}
