import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import {
	TwitterIcon,
	GithubIcon,
	DiscordIcon,
	HeartFilledIcon,
	SearchIcon,
} from "@/components/icons";
import Image from "next/image";
import logo from "@/app/hsb-removebg-preview.png";
import { Info, InfoIcon, PlusCircleIcon, Users, UsersIcon, VoteIcon } from "lucide-react";


export const Navbar = () => {

	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Image src={logo} width={50} height={50} alt="HSB Secunderabad" />
						<p className="font-bold text-inherit text-sm">Frame The Vision</p>
					</NextLink>
				</NavbarBrand>
				<ul className="hidden lg:flex gap-4 justify-start ml-2">
					<NavbarItem>
						<NextLink
							className={clsx(
								linkStyles({ color: "foreground" }),
								"data-[active=true]:text-primary data-[active=true]:font-medium"
							)}
							color="foreground"
							href='/new-post'
						>
							<Button
								className="text-sm font-normal text-default-600"
								startContent={<PlusCircleIcon className="text-danger" />}
								variant="flat"
								color="primary"
							>
								New Post
							</Button>
						</NextLink>
					</NavbarItem>

					<NavbarItem>
						<NextLink
							className={clsx(
								linkStyles({ color: "foreground" }),
								"data-[active=true]:text-primary data-[active=true]:font-medium"
							)}
							color="foreground"
							href='/guide'
						>
							<Button
								className="text-sm font-normal text-default-600"
								startContent={<InfoIcon className="text-danger" />}
								variant="flat"
								color="warning"
							>
								Guide
							</Button>
						</NextLink>
					</NavbarItem>
				</ul>
			</NavbarContent>

			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="hidden sm:flex gap-2">
					<ThemeSwitch />
				</NavbarItem>
				<NavbarItem className="hidden md:flex">
					<Button
						isExternal
						as={Link}
						className="text-sm font-normal text-default-600 bg-default-100"
						href='https://wa.me/919346763253'
						startContent={<HeartFilledIcon className="text-danger" />}
						variant="flat"
					>
						The Web Sensei
					</Button>
				</NavbarItem>
			</NavbarContent>

			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
				<ThemeSwitch />
				<Link href="/new-post">
					<Button isIconOnly color='primary' aria-label="New Post">
						<PlusCircleIcon />
					</Button>
				</Link>
				<Link href="/guide">
					<Button isIconOnly color="warning" aria-label="Team">
						<InfoIcon />
					</Button>
				</Link>
			</NavbarContent>

			<NavbarMenu>
				<div className="mx-4 mt-2 flex flex-col gap-2">
					<NavbarItem>
						<NextLink
							className={clsx(
								linkStyles({ color: "foreground" }),
								"data-[active=true]:text-primary data-[active=true]:font-medium"
							)}
							color="foreground"
							href='/new-post'
						>
							New Post
						</NextLink>
					</NavbarItem>
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};
