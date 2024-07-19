import React, { useEffect, useState } from "react";
import AddResume from "./component/AddResume";
import { useUser } from "@clerk/clerk-react";
// import GlobalApi from "../../../../service/GlobalApi";
import GlobalApi from "../service/GlobalApi";
import ResumeCardItem from "./component/ResumeCardItem";

export const DashboardPage = () => {
	const { user } = useUser();
	const [resumeList, setResumeList] = useState([]);

	useEffect(() => {
		user && GetResumeList();
	}, [user]);

	/**
	 * use to get resume list
	 */
	const GetResumeList = () => {
		GlobalApi.GetUserResume(user?.primaryEmailAddress?.emailAddress).then(
			(res) => {
				// console.log(res.data);
				setResumeList(res.data.data);
			}
		);
	};
	return (
		<div className='p-10 md:px-20lg:px-32'>
			<h2 className='font-bold text-3xl'>My resume</h2>
			<p>Start creating resume for your next job</p>
			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10'>
				<AddResume />
				{resumeList.length > 0 &&
					resumeList.map((resume, index) => (
						<ResumeCardItem resume={resume} key={index}  refreshData={GetResumeList}/>
					))}
			</div>
		</div>
	);
};

export default DashboardPage;
