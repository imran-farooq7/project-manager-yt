"use client";
import { createProject } from "@/lib/api";
import { ChangeEvent, useState } from "react";
import Modal from "react-modal";
import Button from "./Button";
import Input from "./Input";
import { useRouter } from "next/navigation";
Modal.setAppElement("#modal");
const NewProject = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const openModal = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);
	const [name, setName] = useState("");
	const router = useRouter();
	const handleSubmit = async (e: any) => {
		e.preventDefault();

		await createProject(name);
		closeModal();
		router.refresh();
	};
	return (
		<div className="px-6 py-8 hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center">
			<Button type="button" onClick={() => openModal()}>
				New Project
			</Button>
			<Modal
				isOpen={modalOpen}
				onRequestClose={closeModal}
				overlayClassName={
					"bg-[rgba(0,0,0..4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
				}
				className="w-3/4 bg-white rounded-xl p-8"
			>
				<h1 className="text-3xl mb-6">New Project</h1>
				<form onSubmit={handleSubmit} className="flex items-center">
					<Input
						placeholder="Project name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className=""
					/>
					<Button type="submit">Create</Button>
				</form>
			</Modal>
		</div>
	);
};
export default NewProject;
