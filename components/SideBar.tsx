import Card from "@/components/Card";
import SideBarLink from "./SideBarLink";
const links = [
	{
		label: "Home",
		icon: "Grid",
		link: "/home",
	},
	{
		label: "Calendar",
		icon: "Calendar",
		link: "/calendar",
	},
	{
		label: "Settings",
		icon: "Settings",
		link: "/settings",
	},
	{
		label: "Profile",
		icon: "User",
		link: "/profile",
	},
];
const Sidebar = () => {
	return (
		<Card className="h-full w-40 flex items-center justify-between flex-wrap">
			<div className="w-full flex justify-center items-center">
				Project Management
			</div>
			{links.map((link) => (
				<SideBarLink link={link} />
			))}
		</Card>
	);
};
export default Sidebar;
