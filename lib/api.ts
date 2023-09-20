export const register = async (user: {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}) => {
	const res = await fetch("/api/register", {
		method: "POST",
		body: JSON.stringify(user),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	const data = await res.json();
	return data;
};

export const signin = async (user: { email: string; password: string }) => {
	const res = await fetch("/api/signin", {
		method: "POST",
		body: JSON.stringify(user),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await res.json();
	return data;
};
export const createProject = async (name: string) => {
	const res = await fetch("/api/project", {
		method: "POST",
		body: JSON.stringify(name),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await res.json();
	return data;
};
