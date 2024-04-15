"use client";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem,
	Link,
	Button,
} from "@nextui-org/react";
import { useState } from "react";

const navItems = [
	{
		name: "Login",
		link: "/auth",
	},
];

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<Navbar onMenuOpenChange={setIsMenuOpen} className="bg-primary shadow-md">
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="sm:hidden text-white"
				/>
				<NavbarBrand>
					<p className="font-bold text-white">TeleCord</p>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent justify="end">
				<NavbarItem className="hidden lg:flex gap-4">
					{navItems.map((item: any, index: number) => (
						<Button key={`${item.name}-${index}`} className="bg-secondary">
							<Link
								color="foreground"
								className="text-gray-300"
								href={item.link}
								size="lg"
							>
								{item.name}
							</Link>
						</Button>
					))}
				</NavbarItem>
			</NavbarContent>
			<NavbarMenu>
				{navItems.map((item: any, index: number) => (
					<NavbarMenuItem key={`${item.name}-${index}`}>
						<Link
							color={
								index === 2
									? "primary"
									: index === navItems.length - 1
									? "danger"
									: "foreground"
							}
							className="w-full"
							href={`${item.link}`}
							size="lg"
						>
							{item.name}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
};

export default Header;
