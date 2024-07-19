import React from "react";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

const Header = () => {
	const { user, isSignedIn } = useUser();
	return (
		<div className='flex justify-between p-3 px-5 shadow-md'>
			<img src='/logo.svg' alt='L' width={100} height={100} />
			{isSignedIn ? (
				<div className='flex gap-2 justify-center'>
					<Link to={"/dashboard"}>
						<Button variant='outline'>Dashboard</Button>
					</Link>
					<UserButton />
				</div>
			) : (
				<Link to={"/auth/sign-in"}>
					<Button>Get Started</Button>
				</Link>
			)}
		</div>
	);
};

export default Header;
