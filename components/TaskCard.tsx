import { getUserFromCookies } from "@/lib/auth";
import Button from "./Button";
import Card from "./Card";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { TASK_STATUS } from "@prisma/client";
type Props = {
	title?: string;
	tasks?: any;
};
const getData = async () => {
	const user = await getUserFromCookies(cookies());
	const tasks = await prisma.task.findMany({
		where: {
			ownerId: user?.id,
			NOT: {
				status: TASK_STATUS.completed,
				deleted: false,
			},
		},
		orderBy: {
			due: "asc",
		},
		take: 5,
	});
	return tasks;
};
const TaskCard = async ({ title, tasks }: Props) => {
	const data = tasks || (await getData());
	return (
		<Card className="">
			<div className="flex justify-between items-center">
				<div>
					<span className="text-3xl text-gray-600">{title}</span>
				</div>
				<div>
					<Button type="button" intent={"text"} className="text-violet-600">
						+ Create New
					</Button>
				</div>
			</div>
			<div>
				{data && data.length ? (
					<div>
						{data.map((task: any) => (
							<>
								<div className="py-2">
									<div>
										<span className="text-gray-600">{task.name}</span>
									</div>
								</div>
								<div>
									<span className="text-gray-400 text-sm">
										{task.description}
									</span>
								</div>
							</>
						))}
					</div>
				) : (
					<div>no tasks found</div>
				)}
			</div>
		</Card>
	);
};
export default TaskCard;
