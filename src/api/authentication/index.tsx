export const SignUpAPI = async (
	email: string,
	password: string,
	username: string
) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_AWS_BACKEND_API_URL}/sign-up`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					Email: email,
					Password: password,
					Username: username,
					Role: "Member",
				}),
			}
		);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return response;
	} catch (error) {
		console.error("There was a problem with the signUp API:", error);
		throw error;
	}
};

export const LoginAPI: (
	email: string,
	password: string
) => Promise<Response> = async (email, password) => {
	try {
		const response: any = await fetch(
			`${process.env.NEXT_PUBLIC_AWS_BACKEND_API_URL}/login`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					Email: email,
					Password: password,
				}),
			}
		);
		const res = await response.json();

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return res.user;
	} catch (error) {
		console.error("There was a problem with the login API:", error);
		throw error;
	}
};

export const GetUserAPI: (email: string) => Promise<Response> = async (
	email
) => {
	try {
		const response: any = await fetch(
			`${process.env.NEXT_PUBLIC_AWS_BACKEND_API_URL}/getUser`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					Email: email,
				}),
			}
		);
		const res = await response.json();

		if (!response.ok) {
			return null;
		}

		return res.user;
	} catch (error) {
		console.error("There was a problem with the get user API:", error);
		throw error;
	}
};
