/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../service/GlobalApi";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Brain, LoaderCircle } from "lucide-react";
import { chatSession } from "../../../../service/AiModal";

const prompt =
	"Job Title: {jobTitle},  Depends on job title give me summary for my resume within 4-5 lines in JSON format with field experience_level and Summary with Experience level for Fresher, Mid-Level, Experience";
const Summary = ({ enableNext }) => {
	const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
	const [summary, setSummary] = useState();
	const [loading, setLoading] = useState(false);
	const params = useParams();
	const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState();
	useEffect(() => {
		summary &&
			setResumeInfo({
				...resumeInfo,
				summary: summary,
			});
	}, [summary]);

	/*
	const generateSummaryWithAi = async () => {
		setLoading(true);
		const PROMPT = prompt.replace("{JobTitle}", resumeInfo?.jobTitle);
		const result = await chatSession.sendMessage(PROMPT);

		const value = result.response.text();
		console.log(value);
		setAiGeneratedSummaryList(result.response.text());
		setLoading(false);
	};
	*/
	const GenerateSummaryFromAI = async () => {
		setLoading(true);
		const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);

		const result = await chatSession.sendMessage(PROMPT);
		console.log(result);
		console.log(JSON.parse(result.response.text()));
		const parsedResponse = JSON.parse(result.response.text());
		const summaries = parsedResponse.experience_levels;
		console.log(summaries);
		setAiGeneratedSummaryList(summaries);
		setLoading(false);
	};

	const onSave = (e) => {
		e.preventDefault();
		setLoading(true);
		// Add validation logic here before enabling "Next"
		const data = {
			data: {
				summary: summary,
			

			},
		};
		console.log(params?.resumeId);
		GlobalApi.UpdateResumeDetails(params?.resumeId, data).then(
			(res) => {
				console.log(res);
				setLoading(false);
				toast("Details updated!");
				enableNext(true);
			},
			(error) => {
				console.log("req error");
				setLoading(false);
			}
		);
	};
	return (
		<div>
			<div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
				<h2 className='font-bold text-lg'>Summary</h2>
				<p>Add Summary for your job Title</p>

				<form className='mt-7' onSubmit={onSave}>
					<div className='flex justify-between items-end'>
						<label>Add summary</label>
						<Button
							type='button'
							className='border-primary text-primary gap-2'
							size='sm'
							variant='outline'
							onClick={GenerateSummaryFromAI}
						>
							<Brain />
							Generate from AI
						</Button>
					</div>
					<Textarea
						required
						className='mt-5'
						value={summary}
						defaultValue={summary ? summary : resumeInfo?.summary}
						onChange={(e) => setSummary(e.target.value)}
					/>
					<div className='mt-3 flex justify-end'>
						<Button type='submit' disabled={loading}>
							{loading ? <LoaderCircle className='animate-spin' /> : "Save"}
						</Button>
					</div>
				</form>
			</div>
			{aiGeneratedSummaryList && (
				<div className='my-5'>
					<h2 className='font-bold text-lg'>Suggestions</h2>

					{aiGeneratedSummaryList?.map((item, index) => (
						<div
							key={index}
							onClick={() => setSummary(item?.Summary)}
							className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'
						>
							<h2 className='font-bold my-1 text-primary'>
								Level: {item.experience_level}
							</h2>
							<p>{item.Summary}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
export default Summary;
