"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Input,
	Link,
} from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import { SignUpAPI } from "@/api/authentication";

type FormValues = {
	email: string;
	password: string;
	username: string;
};

const Auth = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>();
	const signUpUrl = `/auth`;
	const [authType, setAuthType] = useState<"signup" | "login">("login");

	useEffect(() => {
		router.prefetch(signUpUrl);
	}, []);

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		if (authType === "signup") {
			SignUpAPI(data.email, data.password, data.username)
				.then((res) => {
					if (res.ok) {
						Swal.fire({
							title: "Success!",
							text: "Account created successfully",
							icon: "success",
							confirmButtonText: "Login",
						}).then((result) => {
							if (result.isConfirmed) {
								router.push("/auth");
							}
						});
					}
				})
				.catch((err) => {
					console.error("There was a problem with the sign up:", err);
					Swal.fire({
						title: "Error!",
						text: "There was a problem creating your account",
						icon: "error",
						confirmButtonText: "Try again",
					});
				});
		} else {
			const res = await signIn("credentials", {
				email: data.email,
				password: data.password,
				redirect: false,
			});

			if (res && res.ok) {
				router.push("/chat");
			} else if (res && res.error) {
				Swal.fire({
					title: "Error",
					text: res.error,
					icon: "error",
					confirmButtonText: "Ok",
				});
			} else {
				Swal.fire({
					title: "Error",
					text: "An error occurred while trying to log in",
					icon: "error",
					confirmButtonText: "Ok",
				});
			}
		}
	};

	return (
		<div className="flex justify-center items-center h-screen bg-purple-100">
			<Card className="w-full max-w-md p-8 rounded-lg shadow-lg bg-primary text-gray-300">
				<CardHeader className="text-3xl font-bold text-center mb-8">
					{authType === "signup" ? "Sign Up" : "Login"}
				</CardHeader>
				<CardBody>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-6">
							<Input
								type="text"
								placeholder="Email"
								aria-label="Enter your email"
								className="w-full px-4 py-2 rounded-md focus:outline-none focus:border-purple-500"
								{...register("email", { required: true })}
							/>
							{errors.email && (
								<span className="text-red-500">Email is required</span>
							)}
						</div>
						<div className="mb-6">
							{authType === "signup" && (
								<Input
									type="text"
									placeholder="Username"
									aria-label="Enter your username"
									className="w-full px-4 py-2 rounded-md focus:outline-none focus:border-purple-500"
									{...register("username", { required: true })}
								/>
							)}
							{errors.username && (
								<span className="text-red-500">Username is required</span>
							)}
						</div>
						<div className="mb-6">
							<Input
								type="password"
								placeholder="Password"
								aria-label="Enter your password"
								className="w-full px-4 py-2 rounded-md focus:outline-none focus:border-purple-500"
								{...register("password", { required: true })}
							/>
							{errors.password && (
								<span className="text-red-500">Password is required</span>
							)}
						</div>
						<Button
							type="submit"
							aria-label="Submit"
							className="m-auto flex w-[90%] bg-secondary hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
						>
							{authType === "signup" ? "Sign Up" : "Login"}
						</Button>
					</form>
				</CardBody>
				<CardFooter className="mt-4 text-center">
					<p className="text-sm text-gray-300">
						{authType === "signup"
							? "Already have an account?"
							: "Don't have an account?"}{" "}
						{
							<Button
								onClick={() =>
									setAuthType(authType === "signup" ? "login" : "signup")
								}
								className="text-purple-500 bg-transparent p-0 m-0"
							>
								{authType === "signup" ? "Login" : "Sign Up"}
							</Button>
						}
					</p>
				</CardFooter>
			</Card>
		</div>
	);
};

export default Auth;
