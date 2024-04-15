"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { createCommunity, getCommunities } from "@/api";

const CommunityHandler: React.FC = () => {
	const [communities, setCommunities] = useState<string[]>([]);
	const [newCommunityName, setNewCommunityName] = useState<string>("");
	const [selectedCommunity, setSelectedCommunity] = useState<string | null>(
		null
	);
	const [usersInSelectedCommunity, setUsersInSelectedCommunity] = useState<
		string[]
	>([]);
	const [selectedUser, setSelectedUser] = useState<string | null>(null);
	const [newUserName, setNewUserName] = useState<string>("");
	const [totalCommunities, setTotalCommunities] = useState<number>(0);

	const fetchCommunities = () => {};

	useEffect(() => {
		fetchCommunities();
	}, []);

	const handleCreateCommunity = () => {
		createCommunity(newCommunityName)
			.then((res) => {
				if (res.ok) {
					fetchCommunities();
				}
			})
			.catch((error) => {
				console.error("Error creating community:", error);
			});
	};

	const handleDeleteCommunity = () => {
		if (selectedCommunity) {
			// Call the logic to delete the selected community
			// Example: deleteCommunity(selectedCommunity).then(...)
		}
	};

	const handleSelectCommunity = (event: ChangeEvent<HTMLSelectElement>) => {
		const communityId = event.currentTarget.value;
		setSelectedCommunity(communityId);
		// Call a function to fetch users in the selected community
		// Example: fetchUsersInCommunity(communityId);
	};

	const handleRemoveUserFromCommunity = () => {
		if (selectedUser && selectedCommunity) {
			// Call the logic to remove the selected user from the selected community
			// Example: removeUserFromCommunity(selectedCommunity, selectedUser).then(...)
		}
	};

	const handleAddUserToCommunity = () => {
		if (newUserName && selectedCommunity) {
			// Call the logic to add the new user to the selected community
			// Example: addUserToCommunity(selectedCommunity, newUserName).then(...)
		}
	};

	return (
		<div className="container mt-10">
			<div className="flex flex-row m-auto items-center justify-center gap-4">
				<div className="flex-1 p-7 mx-3 bg-primary rounded-lg shadow-md h-[300px]">
					<h2 className="text-lg font-semibold mb-4 text-white">
						Total Communities
					</h2>
					<p className="text-3xl font-bold text-white">{totalCommunities}</p>
				</div>
				<div className="flex-1 p-7 mx-3 bg-primary rounded-lg shadow-md h-[300px]">
					<h2 className="text-lg font-semibold mb-4 text-white">
						Create Community
					</h2>
					<input
						type="text"
						value={newCommunityName}
						onChange={(e) => setNewCommunityName(e.target.value)}
						placeholder="New Community Name"
						aria-label="Enter community Name"
						className="px-4 py-2 rounded-md focus:outline-none focus:border-purple-500 mb-5 w-full"
					/>
					<button
						onClick={handleCreateCommunity}
						className="flex w-full bg-secondary hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 justify-center"
					>
						Create
					</button>
				</div>
				<div className="flex-1 p-7 mx-3 bg-primary rounded-lg shadow-md h-[300px]">
					<h2 className="text-lg font-semibold mb-4 text-white">
						Delete Community
					</h2>
					<select
						onChange={handleSelectCommunity}
						className="select px-4 py-2 rounded-md focus:outline-none focus:border-purple-500 mb-5 flex w-full"
					>
						<option value="" disabled selected className="opacity-20">
							Select Community{" "}
						</option>
						{communities.map((community, index) => (
							<option key={index} value={community} className="text-black">
								{community}
							</option>
						))}
					</select>
					<button
						onClick={handleDeleteCommunity}
						className="flex w-full bg-secondary hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 justify-center"
					>
						Delete
					</button>
				</div>
				<div className="flex-1 p-7 mx-3 bg-primary rounded-lg shadow-md h-[300px]">
					<h2 className="text-lg font-semibold mb-4 text-white">Add User</h2>
					<select
						onChange={handleSelectCommunity}
						className="select mb-5 p-2 flex w-full"
					>
						<option value="" disabled selected>
							Select Community
						</option>
						{communities.map((community, index) => (
							<option key={index} value={community} className="text-black">
								{community}
							</option>
						))}
					</select>
					<input
						type="text"
						value={newUserName}
						onChange={(e) => setNewUserName(e.target.value)}
						placeholder="New User Name"
						className="px-4 py-2 rounded-md focus:outline-none focus:border-purple-500 mb-5 w-full"
					/>
					<button
						onClick={handleAddUserToCommunity}
						className="flex w-full bg-secondary hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 justify-center"
					>
						Add
					</button>
				</div>
				<div className="flex-1 p-7 mx-3 bg-primary rounded-lg shadow-md h-[300px]">
					<h2 className="text-lg font-semibold mb-4 text-white">
						Manage Users
					</h2>
					<select
						onChange={handleSelectCommunity}
						className="select mb-5 p-2 flex w-full"
					>
						<option value="" disabled selected>
							Select Community
						</option>
						{communities.map((community, index) => (
							<option key={index} value={community} className="text-black">
								{community}
							</option>
						))}
					</select>
					<select
						onChange={(e) => setSelectedUser(e.currentTarget.value)}
						className="select mb-5 p-2 flex w-full"
					>
						<option value="" disabled selected>
							Select User
						</option>
						{usersInSelectedCommunity.map((user, index) => (
							<option key={index} value={user} className="text-black">
								{user}
							</option>
						))}
					</select>
					<button
						onClick={handleRemoveUserFromCommunity}
						className="flex w-full bg-secondary hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 justify-center"
					>
						Remove User
					</button>
				</div>
			</div>
		</div>
	);
};

export default CommunityHandler;
