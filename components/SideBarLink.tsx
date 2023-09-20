"use client";
import Link from "next/link";
import { Settings, User, Grid, Calendar, Icon } from "react-feather";
import { usePathname } from "next/navigation";
import clsx from "clsx";
type Props = {
	link: {
		label: string;
		icon: string;
		link: string;
	};
};
const SideBarLink = ({ link }: Props) => {
	const icons: { [key: string]: Icon } = { Settings, User, Grid, Calendar };
	const pathName = usePathname();
	let isActive = false;
	if (pathName === link.link) {
		isActive = true;
	}
	const Icon = icons[link.icon];
	return (
		<Link href={link.link} className="w-full flex justify-center items-center">
			<Icon
				size={40}
				className={clsx(
					"stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out",
					isActive && "stroke-violet-600"
				)}
			/>
		</Link>
	);
};
export default SideBarLink;
