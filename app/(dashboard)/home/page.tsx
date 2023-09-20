import Greetings from "@/components/Greetings";
import GreetingsSkeleton from "@/components/GreetingsSkeleton";
import NewProject from "@/components/NewProject";
import ProjectCard from "@/components/ProjectCard";
import TaskCard from "@/components/TaskCard";
import { getUserFromCookies } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { delay } from "@/lib/delay";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

const getdata = async () => {
	// await delay(3000);
	const user = await getUserFromCookies(cookies());
	const projects = await prisma.project.findMany({
		where: {
			ownerId: user?.id,
		},
		include: {
			tasks: true,
		},
	});
	return projects;
};
export default async function Page() {
	const projects = await getdata();
	return (
		<div className="h-full overflow-y-auto pr-6 w-1/1">
			<div className="h-full items-stretch justify-center min-h-[content]">
				<div className="flex-1 grow flex">
					<Suspense fallback={<GreetingsSkeleton />}>
						<Greetings />
					</Suspense>
				</div>
				<div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3">
					{projects.map((project) => (
						<div className="w-1/3 p-3" key={project.id}>
							<Link href={`/project/${project.id}`}>
								<ProjectCard projects={project} />
							</Link>
						</div>
					))}
					<div className="w-1/3 p-3">
						<NewProject />
					</div>
				</div>
				<div className="mt-6 flex-2 grow w-full flex">
					<div className="w-full">
						<TaskCard />
					</div>
				</div>
			</div>
		</div>
	);
}
