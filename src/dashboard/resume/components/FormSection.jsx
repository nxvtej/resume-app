/* eslint-disable no-unused-vars */
import React, { act, useState } from "react";
import PersonalDetail from "./forms/PersonalDetail";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from "lucide-react";
import Summary from "./forms/Summary";
import Experience from "./forms/Experience";
import Educations from "./forms/Educations";
import Skills from "./forms/Skills";
import { Link, Navigate, useParams } from "react-router-dom";
import ViewResume from "@/my-resume/[resumeId]/view";
import ThemeColor from "./ThemeColor";

const FormSection = () => {
	const [activeFormIndex, setActiveFormIndex] = useState(1);
	const [enableNext, setEnableNext] = useState(true);
	const { resumeId } = useParams(); 
	return (
		<div>
			

			
			<div className='flex items-center justify-between'>
			<div className="flex gap-2">
				<Link to={'/dashboard'}>
				
				<Button  size='sm' className='flex gap-2'> <Home /> </Button>
				</Link>
				
					
					<ThemeColor />
		
				</div>
				<div className='flex gap-2'>
					{activeFormIndex > 1 && (
						<Button
							size='sm'
							className='flex
						gap-2 hover:scale-110 transition-all hover:shadow-md 2'
							onClick={() => setActiveFormIndex(activeFormIndex - 1)}
						>
							<ArrowLeft />
						</Button>
					)}
					<Button
						disabled={!enableNext}
						onClick={() => setActiveFormIndex(activeFormIndex + 1)}
						className='flex gap-2 hover:scale-110 transition-all hover:shadow-md '
						size='sm'
					>
						Next <ArrowRight />
					</Button>
				</div>
			</div>
			{/* Perfosnal details */}
			{activeFormIndex == 1 ? (
				<PersonalDetail enableNext={(v) => setEnableNext(v)} />
			) : null}

			{/* summary */}

			{activeFormIndex == 2 ? (
				<Summary enableNext={(v) => setEnableNext(v)} />
			) : null}
			{/* Experienc */}

			{activeFormIndex == 3 ? (
				<Experience enableNext={(v) => setEnableNext(v)} />
			) : null}

			{/* Educational Details */}
			{activeFormIndex == 4 ? (
				<Educations enableNext={(v) => setEnableNext(v)} />
			) : null}
			{/* skills */}

			{activeFormIndex == 5 ? (
				<Skills enableNext={(v) => setEnableNext(v)} />
			) : null}

			{activeFormIndex == 6 ? (
				<Navigate to={'/my-resume/'+resumeId+'/view'} />

) : null}
		</div>
	);
};

export default FormSection;
