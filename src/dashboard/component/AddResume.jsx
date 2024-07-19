/* eslint-disable no-unused-vars */
import { Loader2, Plus, PlusSquare, TicketIcon } from "lucide-react";
import React, { useState } from "react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
// import GlobalApi from "../../../../service/GlobalApi";
import GlobalApi from "../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export const AddResume = () => {
	const [openDialog, setOpenDialog] = useState(false);
	const [resumeTitle, setResumeTitle] = useState();
	const { user } = useUser();
	const [loading, setLoading] = useState(false);
	const navigation = useNavigate();
	const onCreate = () => {
		setLoading(true);
		const uuid = uuidv4();
		const data = {
			data: {
				title: resumeTitle,
				resumeId: uuid,
				userEmail: user?.primaryEmailAddress?.emailAddress,
				userName: user?.fullName,
			},
		};
		GlobalApi.CreateNewResume(data).then(
			(res) => {
				console.log(res.data.data.documentId);
				if (res) {
					setLoading(false);
					navigation("/dashboard/resume/" + res.data.data.documentId + "/edit");
				}
			},
			(error) => {
				setLoading(false);
			}
		);
		// console.log(resumeTitle, uuid);
	};

	return (
		<div>
			<div
				className='-14 py-24 border 
            items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all shadow-md cursor-pointer border-dashed'
				onClick={() => setOpenDialog(true)}
			>
				<PlusSquare />
			</div>

			<Dialog open={openDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create New Resume</DialogTitle>
						<DialogDescription>
							<p>Add title for your new resume</p>
							<Input
								className='mt-2 my-2'
								placeholder='Ex. Full Stack Resume'
								onChange={(e) => {
									setResumeTitle(e.target.value);
								}}
							/>
						</DialogDescription>
						<div className='flex justify-end gap-5'>
							<Button onClick={() => setOpenDialog(false)} variant='ghost'>
								Cancel
							</Button>
							<Button
								disabled={!resumeTitle || loading}
								onClick={() => onCreate()}
							>
								{loading ? <Loader2 className='animate-spin' /> : "Create"}
							</Button>
						</div>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default AddResume;
