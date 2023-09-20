import clsx from "clsx";
type Props = {
	children: React.ReactNode;
	className?: string;
};
const Card = ({ children, className }: Props) => {
	return (
		<div
			className={clsx(
				"rounded-3xl px-10 py-4 drop-shadow-xl bg-white",
				className
			)}
		>
			{children}
		</div>
	);
};
export default Card;
