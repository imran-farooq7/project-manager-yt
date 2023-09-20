import { prisma } from "@/lib/db";
import { TASK_STATUS } from "@prisma/client";

const getRandomTaskStatus = () => {
	const statuses = [
		TASK_STATUS.not_started,
		TASK_STATUS.started,
		TASK_STATUS.completed,
	];
	return statuses[Math.floor(Math.random() * statuses.length)];
};

async function main() {
	const user = await prisma.user.upsert({
		where: { email: "user@email.com" },
		update: {},
		create: {
			email: "user@email.com",
			firstName: "User",
			lastName: "Person",
			password: "password",
			projects: {
				create: new Array(5).fill(1).map((_, i) => ({
					name: `Project ${i}`,
					due: new Date(2022, 11, 25),
				})),
			},
		},
		include: {
			projects: true,
		},
	});

	const tasks = await Promise.all(
		user.projects.map((project) =>
			prisma.task.createMany({
				data: new Array(10).fill(1).map((_, i) => {
					return {
						name: `Task ${i}`,
						ownerId: user.id,
						projectId: project.id,
						description: `Everything that describes Task ${i}`,
						status: getRandomTaskStatus(),
					};
				}),
			})
		)
	);

	// console.log({ user, tasks });
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
