import GlassPane from "@/components/GlassPane";
import "@/app/globals.css";

type Props = {
	children: React.ReactNode;
};
export default function AuthRootLayout({ children }: Props) {
	return (
		<html lang="en">
			{/* <head /> */}
			<body className="h-screen w-full rainbow-mesh p-6">
				<GlassPane className="w-full h-full flex items-center justify-center">
					{children}
				</GlassPane>
			</body>
		</html>
	);
}
