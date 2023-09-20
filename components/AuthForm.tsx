"use client";
import { register, signin } from "@/lib/api";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Button from "./Button";
import Card from "./Card";
import Input from "./Input";
import Link from "next/link";

const registerContent = {
	linkUrl: "/signin",
	linkText: "Already have an account",
	header: "Create a new account",
	subHeader: "Just a few things to get started",
	buttonText: "Register",
};
const signinContent = {
	linkUrl: "/register",
	linkText: "Dont have an account",
	header: "Welcome back",
	subHeader: "Enter your credentials to access your account",
	buttonText: "Sign In",
};
const initial = {
	email: "",
	password: "",
	firstName: "",
	lastName: "",
};
const AuthForm = ({ mode }: { mode: "register" | "signin" }) => {
	const [formState, setFormState] = useState(initial);
	const router = useRouter();
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (mode === "register") {
			await register(formState);
		} else {
			await signin(formState);
		}
		router.push("/home");
		setFormState(initial);
	};
	const content = mode === "register" ? registerContent : signinContent;

	return (
		<Card className="">
			<div className="w-full">
				<div className="text-center">
					<h2 className="text-3xl mb-2">{content.header}</h2>
					<p className="text-lg text-black/25">{content.subHeader}</p>
				</div>
				<form className="py-10 w-full" onSubmit={handleSubmit}>
					{mode === "register" && (
						<div className="flex mb-8 justify-between">
							<div className="pr-2">
								<div className="text-lg mb-4 ml-2 text-black/50">
									First name
								</div>
								<Input
									required
									placeholder="First name"
									value={formState.firstName}
									className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
									onChange={(e) =>
										setFormState((s) => ({
											...s,
											firstName: e.target.value,
										}))
									}
								/>
							</div>
							<div className="pl-2">
								<div className="text-lg mb-4 ml-2 text-black/50">Last name</div>
								<Input
									required
									placeholder="Last name"
									value={formState.lastName}
									className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
									onChange={(e) =>
										setFormState((s) => ({
											...s,
											lastName: e.target.value,
										}))
									}
								/>
							</div>
						</div>
					)}
					<div className="mb-8">
						<div className="pr-2">
							<div className="text-lg mb-4 ml-2 text-black/50">Email</div>
							<Input
								required
								placeholder="Email"
								value={formState.email}
								className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
								onChange={(e) =>
									setFormState((s) => ({
										...s,
										email: e.target.value,
									}))
								}
							/>
						</div>
					</div>
					<div className="mb-8">
						<div className="pr-2">
							<div className="text-lg mb-4 ml-2 text-black/50">Password</div>
							<Input
								required
								placeholder="Password"
								value={formState.password}
								className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
								onChange={(e) =>
									setFormState((s) => ({
										...s,
										password: e.target.value,
									}))
								}
							/>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<span>
									<Link
										href={content.linkUrl}
										className="text-blue-600 font-bold"
									>
										{content.linkText}
									</Link>
								</span>
							</div>
							<div>
								<Button type="submit" intent={"secondary"}>
									{content.buttonText}
								</Button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</Card>
	);
};
export default AuthForm;
