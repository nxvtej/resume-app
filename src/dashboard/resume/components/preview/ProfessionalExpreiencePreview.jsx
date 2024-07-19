/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

function ProfessionalExpreiencePreview({ resumeInfo }) {
	return (
		<div className='my-6'>
			<h2
				className='text-center font-bold text-sm mb-2'
				style={{
					color: resumeInfo?.themeColor,
				}}
			>
				Professioinal Experiene
			</h2>

			<hr
				style={{
					borderColor: resumeInfo?.themeColor,
				}}
			/>


		{	console.log(resumeInfo?.Experienc)}
			{resumeInfo?.Experience?.map((experience, index) => (
				<div key={index} className='my-5'>
					<h2
						className='text-sm font-bold'
						style={{
							color: resumeInfo?.themeColor,
						}}
					>
						{experience?.title}
					</h2>
					<h2 className='text-xs flex justify-between'>
						{experience?.companyName},{experience?.city},{experience?.state}
						<span>
							{experience?.startDate}{" "}
							{experience?.currentlyWorking ? "Present" : experience?.endDate}
						</span>
					</h2>
					{/* <p className='text-xs my-2'>{experience?.workSummary}</p> */}
					<div
						className='text-xs my-2'
						dangerouslySetInnerHTML={{ __html: experience?.workSummary }}
					/>
				</div>
			))}
		</div>
	);
}

export default ProfessionalExpreiencePreview;
