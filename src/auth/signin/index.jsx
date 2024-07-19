import { SignIn } from "@clerk/clerk-react";
import React from "react";

export const SigninPage = () => {
	return (
		<div className='flex flex-col justify-center h-screen'>
			<div className='flex justify-center'>
				<SignIn />
			</div>
		</div>
	);
};
