const generateCommunityId = (): number => {
	// Generate a random number between 1 and 1000000
	const randomId = Math.floor(Math.random() * 1000000) + 1;
	return randomId;
};

export const createCommunity = async (communityName: string) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_AWS_BACKEND_API_URL}/addCommunity`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					CommunityId: generateCommunityId(),
					GroupMembers: [],
					CreatedDate: new Date(),
					CommunityImage: "/images/default.png",
					Chats: [],
					CommunityName: communityName,
				}),
			}
		);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return response;
	} catch (error) {
		console.error("There was a problem with the createCommunity API:", error);
		throw error;
	}
};

export const getCommunities = async (username: string) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_AWS_BACKEND_API_URL}/getCommunity/${username}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return response.json();
	} catch (error) {
		console.error("There was a problem with the getCommunities API:", error);
		throw error;
	}
};

export const searchCommunity = async (search: string) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_AWS_BACKEND_API_URL}/searchCommunity`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					Query: search,
				}),
			}
		);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return response.json();
	} catch (error) {
		console.error("There was a problem with the searchCommunity API:", error);
		throw error;
	}
};

// joinCommunity API
export const joinCommunity = async (communityId: string, username: string) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_AWS_BACKEND_API_URL}/joinCommunity`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					CommunityId: communityId,
					Username: username,
				}),
			}
		);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return response;
	} catch (error) {
		console.error("There was a problem with the joinCommunity API:", error);
		throw error;
	}
};

export const leaveCommunity = async (communityId: string, username: string) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_AWS_BACKEND_API_URL}/leaveCommunity`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					CommunityId: communityId,
					Username: username,
				}),
			}
		);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return response;
	} catch (error) {
		console.error("There was a problem with the joinCommunity API:", error);
		throw error;
	}
};

export const saveChatMessage = async (message: SendMessage) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_AWS_BACKEND_API_URL}/chats`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					ChatId: generateCommunityId(),
					...message,
				}),
			}
		);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return response;
	} catch (error) {
		throw error;
	}
};

export const getChats = async (communityId: string) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_AWS_BACKEND_API_URL}/chats/${communityId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return response.json();
	} catch (error) {
		throw error;
	}
};

export const saveImageToS3 = async (file: File, fileName?: String) => {
	try {
		// Read the file as base64
		const base64 = await readFileAsBase64(file);

		if (!base64) {
			throw new Error("Failed to read file as base64");
		}

		// Create the fileData object with base64 data and filename
		const fileData = {
			file_bytes: base64,
			file_name: `${fileName}.png` || file.name,
		};

		// Send a POST request to upload the file to S3
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_AWS_BACKEND_API_URL}/upload`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(fileData),
			}
		);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return response.json();
	} catch (error) {
		throw error;
	}
};

// Helper function to read file as base64
const readFileAsBase64 = (file: File) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () =>
			resolve(reader.result?.toString().replace(/^data:(.*,)?/, ""));
		reader.onerror = (error) => reject(error);
	});
};

export const setProfilePictureUser = async (
	email: string,
	profilePicture: string
) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_AWS_BACKEND_API_URL}/updateUserProfilePicture`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					Email: email,
					ProfilePicture: profilePicture,
				}),
			}
		);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return response;
	} catch (error) {
		throw error;
	}
};

export const deleteUserAccount = async (email: string) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_AWS_BACKEND_API_URL}/deleteUser`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					Email: email,
				}),
			}
		);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return response;
	} catch (error) {
		throw error;
	}
};

export const TextToAudio = async (Text: String) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_AWS_BACKEND_API_URL}/audio`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					text: Text,
				}),
			}
		);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const body = await response.body;
		// read the body stream
		const reader = body?.getReader();
		let chunks = [];
		while (true) {
			const { done, value }: any = await reader?.read();
			if (done) break;
			chunks.push(value);
		}
		const blob = new Blob(chunks, { type: "audio/mp3" });
		const url = URL.createObjectURL(blob);
		const audio = new Audio(url);
		audio.play();
		return body;
	} catch (error) {
		throw error;
	}
};

export const UpdateCommunityImage = async (
	communityId: string,
	communityImage: string
) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_AWS_BACKEND_API_URL}/updateCommunityImage`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					CommunityId: communityId,
					CommunityImage: communityImage,
				}),
			}
		);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return response;
	} catch (error) {
		throw error;
	}
};

export const TranslateChats = async (chats: any) => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_AWS_BACKEND_API_URL}/translate`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					chats: chats,
					source_lang: "auto",
					target_lang: "en",
				}),
			}
		);
		if (!res.ok) {
			throw new Error("Network response was not ok");
		}
		return res.json();
	} catch (err) {
		throw err;
	}
};
