"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, CardBody, Input } from "@nextui-org/react";

const SignUp = () => {
	const router = useRouter();
	const signUpUrl = `/sign-up`;

	useEffect(() => {
		router.prefetch(signUpUrl);
	}, []);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<div className="flex items-center justify-center h-screen m-auto w-full">
			<Card>
				<CardBody>
					<form className="flex flex-col gap-4" onSubmit={onSubmit}>
						<Input
							type="text"
							placeholder="Email"
							aria-label="Enter your email or username"
						/>
						<Input
							type="text"
							placeholder="Username"
							aria-label="Enter unique username"
						/>
						<Input
							type="password"
							placeholder="Password"
							aria-label="Enter your Password"
						/>
						<Button type="submit" aria-label="Submit" className="bg-primary">
							Register
						</Button>
					</form>
				</CardBody>
			</Card>
		</div>
	);
};

export default SignUp;
