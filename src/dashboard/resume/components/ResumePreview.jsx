import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext } from "react";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import SummaryPreview from "./preview/SummaryPreview";
import ProfessionalExpreiencePreview from "./preview/ProfessionalExpreiencePreview";
import EducationalPreview from "./preview/EducationalPreview";
import SkillPreview from "./preview/SkillPreview";

const ResumePreview = () => {
	const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
	return (
		<div
			className='shadow-lg h-full p-14 border-t-[20px]'
			style={{ borderColor: resumeInfo?.themeColor }}
		>
			{/* Personal Details  */}
			<PersonalDetailPreview resumeInfo={resumeInfo} />
			{/* Summary  */}
			<SummaryPreview resumeInfo={resumeInfo} />
			{/* Professional Experince  */}
			<ProfessionalExpreiencePreview resumeInfo={resumeInfo} />
			{/* Educational  */}
			<EducationalPreview resumeInfo={resumeInfo} />
			{/* Skills  */}
			<SkillPreview resumeInfo={resumeInfo} />
		</div>
	);
};

export default ResumePreview;
