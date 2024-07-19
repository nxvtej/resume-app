/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/Button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { chatSession } from "../../../service/AiModal";
import { Brain, Construction, LoaderCircle } from "lucide-react";
import { useContext, useState } from "react";
import {
	BtnBold,
	BtnBulletList,
	BtnItalic,
	BtnLink,
	BtnNumberedList,
	BtnStrikeThrough,
	BtnUnderline,
	Editor,
	EditorProvider,
	Separator,
	Toolbar,
} from "react-simple-wysiwyg";
import { toast } from "sonner";

const PROMPT =
	"position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags";

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
	const [value, setValue] = useState(defaultValue);
	const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
	const [loading, setLoading] = useState(false);
	console.log(resumeInfo);
	// const generateSummaryFromAI = async () => {
	// 	setLoading(true);
	// 	if (!resumeInfo.experience[index].title) {
	// 		toast("Please add Position title");
	// 		return;
	// 	}
	// 	console.log("resume info");
	// 	console.log(resumeInfo);
	// 	const prompt = PROMPT.replace(
	// 		"{positionTitle}",
	// 		resumeInfo.experience[index].title
	// 	);

	// 	const result = await chatSession.sendMessage(prompt);
	// 	console.log("result", result);
	// 	const response = JSON.parse(result.response.text());
	// 	// console.log("response", response[0].experience_points);
	// 	const html = await response[0].experience_points;
	// 	setValue(html.replace("[", "").replace("]", ""));

	// 	setLoading(false);
	// };

	const generateSummaryFromAI = async () => {
		if (!resumeInfo?.Experience[index]?.title) {
			toast("Please Add Position Title");
			return;
		}

		setLoading(true);

		try {
			const prompt = PROMPT.replace(
				"{positionTitle}",
				resumeInfo.Experience[index].title
			);

			console.log(prompt);

			const result = await chatSession.sendMessage(prompt);
			const responseText = await result.response.text(); // Ensure this returns the expected format

			// Inspect the response format
			console.log("Response Text:", responseText);

			setValue(responseText.replace("[", "").replace("]", ""));
		} catch (error) {
			console.error("Error generating summary from AI:", error);
			toast("An error occurred while generating the summary.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<div className='flex justify-between items-center my-4 border-b-2'>
				<label className='font-bold' size='sm'>
					Summary
				</label>
				<Button
					type='button'
					className='border-primary text-primary gap-2 my-1'
					size='sm'
					variant='outline'
					onClick={generateSummaryFromAI}
				>
					{loading ? (
						<LoaderCircle className='animate-spin' />
					) : (
						<>
							<Brain className='h-4 w-4' /> Generate from AI
						</>
					)}
				</Button>
			</div>
			<EditorProvider>
				<Editor
					value={value}
					onChange={(e) => {
						setValue(e.target.value);
						onRichTextEditorChange(e);
					}}
				>
					<Toolbar>
						<BtnBold />
						<BtnItalic />
						<BtnUnderline />
						<BtnStrikeThrough />
						<Separator />
						<BtnNumberedList />
						<BtnBulletList />
						<Separator />
						<BtnLink />
					</Toolbar>
				</Editor>
			</EditorProvider>
		</div>
	);
}

export default RichTextEditor;
