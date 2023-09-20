import GlassPane from "@/components/GlassPane";
import Sidebar from "@/components/SideBar";
import "@/app/globals.css";

type Props = {
	children: React.ReactNode;
};
export default function DashboardRootLayout({ children }: Props) {
	return (
		<html lang="en">
			{/* <head /> */}
			<body className="h-screen w-full candy-mesh p-6">
				<GlassPane className="w-full flex h-full p-6 align-center container mx-auto">
					<Sidebar />

					<main className="w-full h-full pl-6">{children}</main>
				</GlassPane>
				<div id="modal"></div>
			</body>
		</html>
	);
}
