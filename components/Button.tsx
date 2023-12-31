import { cva, VariantProps } from "class-variance-authority";
import { FC } from "react";
const buttonClasses = cva(
	[
		"rounded-3xl",
		"font-bold",
		"hover:scale-110",
		"active:scale-100",
		"transition",
		"duration-200",
		"ease-in-out",
	],
	{
		variants: {
			intent: {
				primary: [
					"bg-violet-500",
					"text-white",
					"border-transparent",
					"hove:bg-violet-600",
				],
				secondary: [
					"bg-white",
					"text-black",
					"border-gray-400",
					"hover:bg-gray-100",
					"border-solid",
					"border-2",
					"border-gray-800",
				],
				text: ["bg-transparent", "text-black", "hove:bg-gray-100"],
			},
			size: {
				small: ["text-md", "py-1", "px-2"],
				medium: ["text-lg", "py-2", "px-6"],
				large: ["text-xlg", "py-4", "px-8"],
			},
		},
		defaultVariants: {
			intent: "primary",
			size: "medium",
		},
	}
);

export interface ButtonProps
	extends React.HTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonClasses> {
	type: "button" | "submit" | "reset" | undefined;
}
const Button: FC<ButtonProps> = ({
	children,
	className,
	intent,
	size,
	type,
	...props
}) => {
	return (
		<button
			className={buttonClasses({ intent, size, className })}
			type={type}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
